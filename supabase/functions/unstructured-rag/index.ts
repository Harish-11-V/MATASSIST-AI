// Supabase Edge Function for RAG Processing with Unstructured.io
// To deploy: supabase functions deploy unstructured-rag

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileUrl, fileName, userId, application } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Step 1: Extract text and structure from PDF using Unstructured.io
    console.log('Starting extraction with Unstructured.io...')
    const unstructuredApiKey = Deno.env.get('UNSTRUCTURED_API_KEY')
    
    // Download file from Supabase Storage
    const fileResponse = await fetch(fileUrl)
    const fileBlob = await fileResponse.blob()
    
    // Send to Unstructured.io for processing
    const formData = new FormData()
    formData.append('files', fileBlob, fileName)
    formData.append('strategy', 'hi_res') // High resolution for better accuracy
    formData.append('coordinates', 'true')
    formData.append('output_format', 'application/json')
    
    const unstructuredResponse = await fetch('https://api.unstructured.io/general/v0/general', {
      method: 'POST',
      headers: {
        'unstructured-api-key': unstructuredApiKey,
      },
      body: formData,
    })

    if (!unstructuredResponse.ok) {
      throw new Error(`Unstructured.io API error: ${unstructuredResponse.statusText}`)
    }

    const extractedData = await unstructuredResponse.json()
    console.log(`Extracted ${extractedData.length} elements`)

    // Step 2: Process and structure material properties
    const materialProperties = await extractMaterialProperties(extractedData)
    
    // Step 3: Store in database
    const { data: document, error: docError } = await supabaseClient
      .from('documents')
      .insert({
        user_id: userId,
        filename: fileName,
        file_path: fileUrl,
        file_type: 'pdf',
        status: 'processing',
        extracted_text: JSON.stringify(extractedData),
        metadata: {
          application: application,
          processed_at: new Date().toISOString(),
          material_count: materialProperties.length
        }
      })
      .select()
      .single()

    if (docError) throw docError

    // Step 4: Generate embeddings and store chunks
    await processAndStoreEmbeddings(
      supabaseClient,
      document.id,
      userId,
      extractedData,
      materialProperties
    )

    // Step 5: Store structured material properties
    for (const material of materialProperties) {
      await supabaseClient.from('materials').insert({
        user_id: userId,
        document_id: document.id,
        material_family: material.family,
        grade: material.grade,
        properties: material.properties,
        application: application,
        source: 'uploaded_pdf'
      })
    }

    // Step 6: Update document status
    await supabaseClient
      .from('documents')
      .update({ status: 'completed' })
      .eq('id', document.id)

    // Step 7: Export to Excel and Text
    const exportFiles = await exportMaterialData(materialProperties)

    return new Response(
      JSON.stringify({ 
        success: true,
        documentId: document.id,
        materialsExtracted: materialProperties.length,
        exportFiles: exportFiles
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

/**
 * Extracts material properties from unstructured data
 */
async function extractMaterialProperties(elements: any[]): Promise<any[]> {
  const materials: any[] = []
  let currentMaterial: any = null

  for (const element of elements) {
    const text = element.text || ''
    
    // Detect material names/grades (patterns like 316L, API 5L X65, etc.)
    const gradePattern = /\b([A-Z0-9]+[-\s]?[A-Z0-9]*)\b/g
    const gradeMatch = text.match(gradePattern)
    
    if (gradeMatch && text.match(/steel|alloy|titanium|aluminum|nickel/i)) {
      if (currentMaterial) {
        materials.push(currentMaterial)
      }
      
      currentMaterial = {
        family: extractMaterialFamily(text),
        grade: gradeMatch[0],
        properties: {},
        raw_text: text
      }
    }
    
    // Extract properties if we have a current material
    if (currentMaterial) {
      // Tensile strength
      const tensileMatch = text.match(/tensile\s+strength[:\s]+(\d+\.?\d*)\s*(MPa|psi|ksi)/i)
      if (tensileMatch) {
        currentMaterial.properties.tensileStrength = `${tensileMatch[1]} ${tensileMatch[2]}`
      }
      
      // Yield strength
      const yieldMatch = text.match(/yield\s+strength[:\s]+(\d+\.?\d*)\s*(MPa|psi|ksi)/i)
      if (yieldMatch) {
        currentMaterial.properties.yieldStrength = `${yieldMatch[1]} ${yieldMatch[2]}`
      }
      
      // Hardness
      const hardnessMatch = text.match(/hardness[:\s]+(\d+\.?\d*)\s*(HB|HV|HRC)/i)
      if (hardnessMatch) {
        currentMaterial.properties.hardness = `${hardnessMatch[1]} ${hardnessMatch[2]}`
      }
      
      // Temperature range
      const tempMatch = text.match(/(-?\d+)\s*°?C?\s*to\s*(-?\d+)\s*°?C/i)
      if (tempMatch) {
        currentMaterial.properties.temperatureRange = `${tempMatch[1]}°C to ${tempMatch[2]}°C`
      }
      
      // Elongation
      const elongMatch = text.match(/elongation[:\s]+(\d+\.?\d*)\s*%/i)
      if (elongMatch) {
        currentMaterial.properties.elongation = `${elongMatch[1]}%`
      }
      
      // Corrosion resistance
      if (text.match(/corrosion\s+resistance/i)) {
        const rating = text.match(/excellent|good|fair|poor/i)
        if (rating) {
          currentMaterial.properties.corrosionResistance = rating[0]
        }
      }
    }
  }
  
  if (currentMaterial) {
    materials.push(currentMaterial)
  }

  // Enrich missing data from web APIs
  for (const material of materials) {
    await enrichMaterialData(material)
  }

  return materials
}

/**
 * Extracts material family from text
 */
function extractMaterialFamily(text: string): string {
  if (text.match(/stainless\s+steel/i)) return 'Austenitic Stainless Steel'
  if (text.match(/duplex/i)) return 'Duplex Stainless Steel'
  if (text.match(/carbon\s+steel/i)) return 'Carbon Steel'
  if (text.match(/nickel\s+alloy|inconel/i)) return 'Nickel-Chromium Alloy'
  if (text.match(/titanium/i)) return 'Titanium Alloy'
  if (text.match(/aluminum/i)) return 'Aluminum Alloy'
  return 'Unclassified'
}

/**
 * Enriches material data by fetching from external APIs
 */
async function enrichMaterialData(material: any): Promise<void> {
  try {
    // Call MatWeb API or similar (example - you'd need actual API key)
    const matwebKey = Deno.env.get('MATWEB_API_KEY')
    if (!matwebKey) return

    // Fill in missing properties from web sources
    if (!material.properties.tensileStrength) {
      // Fetch from API
      material.properties.tensileStrength = 'Data unavailable'
    }
  } catch (error) {
    console.error('Error enriching material:', error)
  }
}

/**
 * Generates embeddings and stores document chunks
 */
async function processAndStoreEmbeddings(
  supabase: any,
  documentId: string,
  userId: string,
  elements: any[],
  materials: any[]
): Promise<void> {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  
  // Chunk the content (500 chars with 50 overlap)
  const chunks: string[] = []
  let currentChunk = ''
  
  for (const element of elements) {
    const text = element.text || ''
    if ((currentChunk + text).length > 500) {
      if (currentChunk) chunks.push(currentChunk)
      currentChunk = text
    } else {
      currentChunk += ' ' + text
    }
  }
  if (currentChunk) chunks.push(currentChunk)

  // Generate embeddings for each chunk
  for (const chunk of chunks) {
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: chunk,
      }),
    })

    const embeddingData = await embeddingResponse.json()
    const embedding = embeddingData.data[0].embedding

    await supabase.from('document_chunks').insert({
      document_id: documentId,
      user_id: userId,
      content: chunk,
      embedding: embedding,
    })
  }
}

/**
 * Exports material data to Excel and Text formats
 */
async function exportMaterialData(materials: any[]): Promise<any> {
  // CSV format
  const csvHeaders = ['Material Family', 'Grade', 'Tensile Strength', 'Yield Strength', 'Hardness', 'Temperature Range', 'Elongation', 'Corrosion Resistance']
  const csvRows = materials.map(m => [
    m.family,
    m.grade,
    m.properties.tensileStrength || 'N/A',
    m.properties.yieldStrength || 'N/A',
    m.properties.hardness || 'N/A',
    m.properties.temperatureRange || 'N/A',
    m.properties.elongation || 'N/A',
    m.properties.corrosionResistance || 'N/A'
  ])
  
  const csv = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n')

  // Text format
  const text = materials.map(m => {
    return `Material: ${m.family} - ${m.grade}\n` +
           `Tensile Strength: ${m.properties.tensileStrength || 'N/A'}\n` +
           `Yield Strength: ${m.properties.yieldStrength || 'N/A'}\n` +
           `Hardness: ${m.properties.hardness || 'N/A'}\n` +
           `Temperature Range: ${m.properties.temperatureRange || 'N/A'}\n` +
           `Elongation: ${m.properties.elongation || 'N/A'}\n` +
           `Corrosion Resistance: ${m.properties.corrosionResistance || 'N/A'}\n` +
           '-'.repeat(50) + '\n'
  }).join('\n')

  return {
    csv: csv,
    text: text
  }
}