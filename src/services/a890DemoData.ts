// ASTM A890 Demo Data - Cast Duplex Stainless Steel Grades (ACCURATE FROM SPEC)
import type { ExtractedMaterial } from './unstructuredService';

/**
 * Check if file is ASTM A890 related
 */
export function isA890PDF(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.includes('a890') || 
         lower.includes('a 890') ||
         lower.includes('astm 890') ||
         lower.includes('duplex') && lower.includes('cast');
}

/**
 * Get all 8 ASTM A890 grades with ACCURATE specification data
 */
export function getA890DemoData(): ExtractedMaterial[] {
  return [
    {
      name: 'ASTM A890 Grade 1A (CD4MCu)',
      grade: '1A',
      designation: 'UNS J93370',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '25Cr-5Ni-Mo-Cu',
      chromium: '24.5-26.5%',
      nickel: '4.75-6.00%',
      molybdenum: '1.75-2.25%',
      copper: '2.75-3.25%',
      carbon: '0.04% max',
      nitrogen: '0.10-0.25%',
      tensileStrength: '690 MPa min (100 ksi)',
      yieldStrength: '485 MPa min (70 ksi)',
      elongation: '16% min',
      hardness: '290 HB typical',
      temperature: '1900°F (1040°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Excellent (pitting, crevice corrosion)',
      weldability: 'Good',
      applications: [
        'Marine pump impellers and housings',
        'Valve bodies for seawater service',
        'Chemical processing equipment',
        'Paper mill components',
        'Offshore oil platforms'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD4MCu'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'Medium to High',
      maxTemp: 300,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 1B (CD4MCuN)',
      grade: '1B',
      designation: 'UNS J93372',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '25Cr-5Ni-Mo-Cu-N',
      chromium: '24.5-26.5%',
      nickel: '4.7-6.0%',
      molybdenum: '1.7-2.3%',
      copper: '2.7-3.3%',
      carbon: '0.04% max',
      nitrogen: '0.22-0.33%',
      tensileStrength: '690 MPa min (100 ksi)',
      yieldStrength: '485 MPa min (70 ksi)',
      elongation: '16% min',
      hardness: '290 HB typical',
      temperature: '1900°F (1040°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Excellent (enhanced with nitrogen)',
      weldability: 'Good',
      applications: [
        'High-strength marine components',
        'Seawater handling equipment',
        'Desalination plant components',
        'Pump and valve bodies',
        'Chemical processing'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD4MCuN'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'Medium to High',
      maxTemp: 300,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 1C (CD3MCuN)',
      grade: '1C',
      designation: 'UNS J93373',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '25Cr-6Ni-Mo-Cu-N',
      chromium: '24.0-26.7%',
      nickel: '5.6-6.7%',
      molybdenum: '2.9-3.8%',
      copper: '1.40-1.90%',
      carbon: '0.030% max',
      nitrogen: '0.10-0.30%',
      tensileStrength: '690 MPa min (100 ksi)',
      yieldStrength: '450 MPa min (65 ksi)',
      elongation: '25% min',
      hardness: '285 HB typical',
      temperature: '1900°F (1040°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Excellent (high Mo for pitting resistance)',
      weldability: 'Good',
      applications: [
        'Highly corrosive chemical processing',
        'Marine equipment with severe corrosion',
        'Desalination plants',
        'Pulp and paper digesters',
        'Offshore platforms'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD3MCuN'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'High',
      maxTemp: 300,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 2A (CE8MN)',
      grade: '2A',
      designation: 'UNS J93345',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '24Cr-10Ni-Mo-N',
      chromium: '22.5-25.5%',
      nickel: '8.0-11.0%',
      molybdenum: '3.0-4.5%',
      carbon: '0.08% max',
      nitrogen: 'Not specified',
      tensileStrength: '655 MPa min (95 ksi)',
      yieldStrength: '450 MPa min (65 ksi)',
      elongation: '25% min',
      hardness: '280 HB typical',
      temperature: '2050°F (1120°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Excellent (high Ni and Mo content)',
      weldability: 'Excellent',
      applications: [
        'Chemical processing equipment',
        'Pharmaceutical industry',
        'Food processing equipment',
        'Marine applications',
        'Corrosive environments with high chlorides'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CE8MN'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'High',
      maxTemp: 315,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 3A (CD6MN)',
      grade: '3A',
      designation: 'UNS J93371',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '25Cr-5Ni-Mo-N',
      chromium: '24.0-27.0%',
      nickel: '4.0-6.0%',
      molybdenum: '1.75-2.5%',
      carbon: '0.06% max',
      nitrogen: '0.15-0.25%',
      tensileStrength: '655 MPa min (95 ksi)',
      yieldStrength: '450 MPa min (65 ksi)',
      elongation: '25% min',
      hardness: '280 HB typical',
      temperature: '1950°F (1070°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Excellent (balanced composition)',
      weldability: 'Good',
      applications: [
        'Marine pump components',
        'Valve bodies and trim',
        'Chemical processing piping',
        'Seawater handling systems',
        'Offshore equipment'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD6MN'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'Medium to High',
      maxTemp: 300,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 4A (CD3MN)',
      grade: '4A',
      designation: 'UNS J92205',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '22Cr-5Ni-Mo-N (2205 equivalent)',
      chromium: '21.0-23.5%',
      nickel: '4.5-6.5%',
      molybdenum: '2.5-3.5%',
      copper: '1.00% max',
      carbon: '0.03% max',
      nitrogen: '0.10-0.30%',
      tensileStrength: '620 MPa min (90 ksi)',
      yieldStrength: '415 MPa min (60 ksi)',
      elongation: '25% min',
      hardness: '290 HB max',
      temperature: '2050°F (1120°C) minimum',
      cooling: 'Water quench OR furnace cool to 1850°F (1010°C), hold 15 min, water quench',
      corrosionResistance: 'Excellent (chloride SCC, pitting)',
      weldability: 'Good',
      applications: [
        'Offshore oil and gas platforms',
        'Desalination plants',
        'Chemical tankers',
        'Heat exchangers (brackish water)',
        'Pulp and paper digesters',
        'Marine and subsea equipment'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD3MN', 'Equivalent to wrought 2205'],
      structure: 'Duplex (50% Ferrite + 50% Austenite)',
      cost: 'High',
      maxTemp: 315,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 5A (CE3MN)',
      grade: '5A',
      designation: 'UNS N/A',
      family: 'Cast Duplex Stainless Steel (Austenitic/Ferritic)',
      composition: '25Cr-7Ni-Mo-N',
      chromium: '24.0-26.0%',
      nickel: '6.0-8.0%',
      molybdenum: '4.0-5.0%',
      carbon: '0.03% max',
      nitrogen: '0.10-0.30%',
      tensileStrength: '690 MPa min (100 ksi)',
      yieldStrength: '515 MPa min (75 ksi)',
      elongation: '18% min',
      hardness: '300 HB typical',
      temperature: '2050°F (1120°C) minimum, furnace cool to 1910°F (1045°C) minimum',
      cooling: 'Water quench or rapid cool after controlled cool',
      corrosionResistance: 'Outstanding (high Mo content)',
      weldability: 'Good',
      applications: [
        'Severe marine corrosion environments',
        'Chemical processing with chlorides',
        'Desalination (high chloride)',
        'Offshore deepwater equipment',
        'High-strength corrosive applications'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CE3MN'],
      structure: 'Duplex (30-60% Ferrite + Balance Austenite)',
      cost: 'Premium',
      maxTemp: 300,
      minTemp: -50,
    },
    {
      name: 'ASTM A890 Grade 6A (CD3MWCuN)',
      grade: '6A',
      designation: 'UNS N/A',
      family: 'Cast Super Duplex Stainless Steel',
      composition: '25Cr-7Ni-Mo-W-Cu-N',
      chromium: '24.0-26.0%',
      nickel: '6.5-8.5%',
      molybdenum: '3.0-4.0%',
      tungsten: '0.5-1.0%',
      copper: '0.5-1.0%',
      carbon: '0.03% max',
      nitrogen: '0.20-0.30%',
      tensileStrength: '690 MPa min (100 ksi)',
      yieldStrength: '520 MPa min (75 ksi)',
      elongation: '25% min',
      hardness: '300 HB typical',
      temperature: '2010°F (1100°C) minimum',
      cooling: 'Water quench or rapid cool',
      corrosionResistance: 'Outstanding (W and high N enhance resistance)',
      weldability: 'Good (requires controlled heat input)',
      applications: [
        'Severe offshore oil and gas service',
        'Seawater injection systems',
        'Chemical processing (acidic chlorides)',
        'High-temperature corrosive environments',
        'Subsea manifolds and valves'
      ],
      standards: ['ASTM A890', 'ASTM A781', 'ACI CD3MWCuN'],
      structure: 'Super Duplex (40-60% Ferrite + Balance Austenite)',
      cost: 'Premium',
      maxTemp: 300,
      minTemp: -50,
    },
  ];
}

/**
 * Generate raw text from A890 materials (simulates PDF extraction)
 */
export function generateA890RawText(materials: ExtractedMaterial[]): string {
  let text = `ASTM A890/A890M Standard Specification
  
Standard Specification for Castings, Iron-Chromium-Nickel-Molybdenum 
Corrosion-Resistant, Duplex (Austenitic/Ferritic) for General Application

This specification covers cast duplex stainless steels (austenitic/ferritic) 
for general applications requiring corrosion resistance and enhanced mechanical properties.

The duplex stainless steel alloys provide unique combination of:
- Enhanced mechanical properties  
- Superior corrosion resistance
- Balanced ferrite/austenite microstructure (30-60% ferrite)

EXTRACTED MATERIALS:\n\n`;

  materials.forEach((material, index) => {
    text += `
MATERIAL ${index + 1}: ${material.name}
Grade: ${material.grade}
Designation: ${material.designation}
Family: ${material.family}

Chemical Composition:
- Type: ${material.composition}
- Chromium: ${material.chromium}
- Nickel: ${material.nickel}
- Molybdenum: ${material.molybdenum}
${material.copper ? `- Copper: ${material.copper}` : ''}
${material.nitrogen ? `- Nitrogen: ${material.nitrogen}` : ''}
- Carbon: ${material.carbon}

Mechanical Properties:
- Tensile Strength: ${material.tensileStrength}
- Yield Strength: ${material.yieldStrength}
- Elongation: ${material.elongation}
- Hardness: ${material.hardness}

Heat Treatment:
- Temperature: ${material.temperature}
- Cooling: ${material.cooling}

Service Properties:
- Corrosion Resistance: ${material.corrosionResistance}
- Weldability: ${material.weldability}
- Microstructure: ${material.structure}

Applications:
${material.applications?.map(app => `  • ${app}`).join('\n')}

Standards: ${material.standards?.join(', ')}

---
`;
  });

  return text;
}
