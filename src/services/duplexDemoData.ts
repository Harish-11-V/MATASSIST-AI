/**
 * DUPLEX STAINLESS STEEL DATA - From Audco India Ltd Technical Bulletin No: 1
 * Extracted from actual Duplex_SS.pdf specifications
 * FOR DEMO PURPOSES - Replace with real RAG extraction when fixed
 */

export interface ExtractedMaterial {
  name: string;
  grade?: string;
  family?: string;
  designation?: string;
  composition?: string;
  chromium?: string;
  nickel?: string;
  molybdenum?: string;
  nitrogen?: string;
  carbon?: string;
  copper?: string;
  tensileStrength?: string;
  yieldStrength?: string;
  elongation?: string;
  hardness?: string;
  temperature?: string;
  soakingTime?: string;
  cooling?: string;
  quenchingCoolBelow?: string;
  weldability?: string;
  weldingElectrode?: string;
  preheating?: string;
  interpassTemp?: string;
  heatInput?: string;
  postweldHT?: string;
  weldingPrecautions?: string;
  corrosionResistance?: string;
  applications?: string[];
  standards?: string[];
  cost?: string;
  yieldStrengthAdvantage?: string;
  thermalExpansion?: string;
  minTemperature?: string;
  maxTemp?: number;
  minTemp?: number;
  embrittlementRange?: string;
  structure?: string;
  generation?: string;
  hotCrackingSusceptibility?: string;
  density?: string;
  impact?: string;
  pren?: string;
  silicon?: string;
  manganese?: string;
  phosphorus?: string;
  sulfur?: string;
  vanadium?: string;
  niobium?: string;
  tungsten?: string;
  columbium?: string;
  titanium?: string;
  [key: string]: any;
}

export const DUPLEX_DEMO_MATERIALS: ExtractedMaterial[] = [
  {
    name: 'CD3MN (4A)',
    grade: 'ASTM A890 Grade 4A / UNS J92205',
    family: 'Duplex Stainless Steel (DSS)',
    designation: 'Alloy 2205',
    
    // Chemical Composition
    composition: 'C: 0.03% max, Mn: 1.50% max, Si: 1.00% max, P: 0.04% max, S: 0.020% max, Cr: 21.0-23.5%, Ni: 4.5-6.5%, Mo: 2.5-3.5%, Cu: 1.0% max, N: 0.10-0.30%',
    chromium: '21.0-23.5%',
    nickel: '4.5-6.5%',
    molybdenum: '2.5-3.5%',
    nitrogen: '0.10-0.30%',
    carbon: '0.03% max',
    
    // Mechanical Properties
    tensileStrength: '90 ksi (620 MPa) min',
    yieldStrength: '60 ksi (415 MPa) min',
    elongation: '25% min',
    hardness: 'Not specified (NACE not acceptable)',
    
    // Heat Treatment
    temperature: '1120°C min (Solution Annealing)',
    soakingTime: '1 hour per inch up to 2" and 15 min per additional inch',
    cooling: 'Water quenching',
    
    // Welding
    weldability: 'Good with Ni-enriched filler (E2209)',
    weldingElectrode: 'AWS E2209 (D&H 2093L)',
    preheating: '50°C (Warm)',
    interpassTemp: '150°C Max',
    heatInput: '0.6 to 2.6 kj/mm (Low)',
    postweldHT: 'Not required',
    
    // Corrosion Properties
    corrosionResistance: 'Excellent - Pitting, Chloride SCC, H2S, Sensitization resistant',
    
    // Applications
    applications: [
      'Sea water application',
      'Desalination Plant',
      'Oil and Petroleum Industry',
      'Wet CO2 atmosphere'
    ],
    
    // Standards
    standards: ['ASTM A890', 'ASTM A182 F51'],
    
    cost: 'Moderate',
    
    // Additional Properties
    yieldStrengthAdvantage: '2-3 times higher than Austenitic SS',
    thermalExpansion: 'Closer to carbon steel than austenitic',
    minTemperature: '-45°C (Low temp properties good)',
    embrittlementRange: '315-595°C (Sigma phase formation)',
    structure: '40-60% Ferrite + Austenite',
  },
  
  {
    name: 'CE3MN (5A)',
    grade: 'ASTM A890 Grade 5A / UNS J93404',
    family: 'Super Duplex Stainless Steel (SDSS)',
    designation: 'SAF 2507 / Zeron 100 equivalent',
    
    // Chemical Composition
    composition: 'C: 0.03% max, Mn: 1.5% max, Si: 1.00% max, P: 0.04% max, S: 0.04% max, Cr: 24-26%, Ni: 6.0-8.0%, Mo: 4.0-5.0%, N: 0.1-0.30%',
    chromium: '24-26%',
    nickel: '6.0-8.0%',
    molybdenum: '4.0-5.0%',
    nitrogen: '0.1-0.30%',
    carbon: '0.03% max',
    
    // Mechanical Properties
    tensileStrength: '100 ksi (690 MPa) min',
    yieldStrength: '75 ksi (515 MPa) min',
    elongation: '18% min',
    hardness: '265 HB max (NACE acceptable)',
    
    // Heat Treatment
    temperature: '1120°C min (Solution Annealing)',
    soakingTime: '1 hour per inch up to 2" and 15 min per additional inch',
    cooling: 'Furnace cooling to 1045°C, then Water quenching',
    
    // Welding
    weldability: 'Good but highly prone to Hot Cracking - Special precautions required',
    weldingElectrode: 'Ni-enriched filler (D&H 25/10/4)',
    preheating: '50-100°C (Warm, recommended for heavy/thick castings)',
    interpassTemp: '150°C Max (Critical - prevents ferrite to sigma phase)',
    heatInput: '0.6 to 2.6 kj/mm (Low)',
    postweldHT: 'Not required',
    weldingPrecautions: 'Must weld in solution annealed condition, Ni-enriched filler mandatory, Electrode rebake at 250°C for 1 hour',
    
    // Corrosion Properties
    corrosionResistance: 'Excellent - Superior to DSS, Pitting, Chloride SCC, H2S, Sensitization resistant',
    
    // Applications
    applications: [
      'Sea water application (Severe)',
      'Desalination Plant',
      'Oil and Petroleum Industry (Sour service)',
      'High chloride environments',
      'Subsea equipment'
    ],
    
    // Standards
    standards: ['ASTM A890', 'ASTM A182 F53/F55', 'NACE compliant'],
    
    cost: 'High',
    
    // Additional Properties
    yieldStrengthAdvantage: '2-3 times higher than Austenitic SS',
    thermalExpansion: 'Closer to carbon steel than austenitic',
    minTemperature: '-45°C (Low temp properties good)',
    embrittlementRange: '315-595°C (Sigma phase formation - highly prone)',
    structure: '40-60% Ferrite + Austenite',
    hotCrackingSusceptibility: 'High - Requires strict welding controls',
  },
  
  {
    name: 'CD4MCu (1A)',
    grade: 'ASTM A890 Grade 1A / UNS J93370 / ASTM A351 CD4MCu',
    family: 'Duplex Stainless Steel (DSS)',
    designation: 'First Generation DSS',
    
    // Chemical Composition
    composition: 'C: 0.04% max, Mn: 1.00% max, Si: 1.00% max, P: 0.040% max, S: 0.040% max, Cr: 24.5-26.5%, Ni: 4.75-6.00%, Mo: 1.75-2.25%, Cu: 2.75-3.25%',
    chromium: '24.5-26.5%',
    nickel: '4.75-6.00%',
    molybdenum: '1.75-2.25%',
    copper: '2.75-3.25%',
    carbon: '0.04% max',
    
    // Mechanical Properties
    tensileStrength: '100 ksi (690 MPa) min',
    yieldStrength: '70 ksi (485 MPa) min',
    elongation: '16% min',
    hardness: 'Not acceptable per NACE',
    
    // Heat Treatment
    temperature: '1040°C min (Solution Annealing)',
    soakingTime: '1 hour per inch up to 2" and 15 min per additional inch',
    cooling: 'Water quenching',
    
    // Welding
    weldability: 'Fair - Significant loss of corrosion resistance in welded condition (First gen issue)',
    weldingElectrode: 'AWS E2209 (D&H 2093L) - Ni-enriched',
    preheating: '50°C (Warm)',
    interpassTemp: '150°C Max',
    heatInput: '0.6 to 2.6 kj/mm (Low)',
    postweldHT: 'Not required',
    
    // Corrosion Properties
    corrosionResistance: 'Good (but reduced in welded areas - First generation limitation)',
    
    // Applications
    applications: [
      'Sea water application',
      'Desalination Plant',
      'Oil and Petroleum Industry',
      'General corrosion environments'
    ],
    
    // Standards
    standards: ['ASTM A890', 'ASTM A351', 'ASTM A182 F52'],
    
    cost: 'Moderate',
    
    // Additional Properties
    yieldStrengthAdvantage: '2-3 times higher than Austenitic SS',
    thermalExpansion: 'Closer to carbon steel than austenitic',
    minTemperature: '-45°C (Low temp properties good)',
    embrittlementRange: '315-595°C (Sigma phase formation)',
    structure: '40-60% Ferrite + Austenite',
    generation: 'First Generation - Has weld corrosion issues',
  },
  
  {
    name: 'Alloy 2205 (F51)',
    grade: 'ASTM A182 F51 / UNS S31803',
    family: 'Duplex Stainless Steel (DSS)',
    designation: 'Second Generation DSS - Industry Standard',
    
    composition: 'Cr: 21-23%, Ni: 4.5-6.5%, Mo: 2.5-3.5%, N: 0.15-0.30% (Nitrogen improves weld corrosion resistance)',
    chromium: '21-23%',
    nickel: '4.5-6.5%',
    molybdenum: '2.5-3.5%',
    nitrogen: '0.15-0.30%',
    
    tensileStrength: '90 ksi (620 MPa) min',
    yieldStrength: '65 ksi (450 MPa) min',
    elongation: '25% min',
    
    corrosionResistance: 'Excellent - Improved pitting and crevice corrosion in welded condition due to Nitrogen',
    
    weldability: 'Excellent - Second generation with 0.15-0.3% Nitrogen solves first gen weld issues',
    
    applications: [
      'Sea water application',
      'Desalination Plant',
      'Oil and Petroleum Industry',
      'Chemical processing',
      'Pulp and paper industry'
    ],
    
    standards: ['ASTM A182 F51', 'UNS S31803'],
    
    cost: 'Moderate',
    generation: 'Second Generation - No weld corrosion issues',
    structure: '40-60% Ferrite + Austenite',
  },
  
  {
    name: 'SAF 2507 (F53)',
    grade: 'ASTM A182 F53 / UNS S32750',
    family: 'Super Duplex Stainless Steel (SDSS)',
    designation: 'Sandvik AB - High Performance SDSS',
    
    composition: 'Cr: 24-26%, Ni: 6-8%, Mo: 3-5%, N: 0.24-0.32%',
    chromium: '24-26%',
    nickel: '6-8%',
    molybdenum: '3-5%',
    nitrogen: '0.24-0.32%',
    
    tensileStrength: '116 ksi (800 MPa) min',
    yieldStrength: '80 ksi (550 MPa) min',
    
    corrosionResistance: 'Excellent - Superior PRE number, High chloride resistance',
    
    applications: [
      'Offshore oil & gas',
      'Subsea equipment',
      'Desalination',
      'Chemical tankers',
      'Heat exchangers'
    ],
    
    standards: ['ASTM A182 F53', 'UNS S32750', 'NACE MR0175'],
    
    cost: 'High',
    structure: '40-60% Ferrite + Austenite',
  },
  
  {
    name: 'Zeron 100 (F55)',
    grade: 'ASTM A182 F55 / UNS S32760',
    family: 'Super Duplex Stainless Steel (SDSS)',
    designation: 'Weir Materials - Premium SDSS',
    
    composition: 'Cr: 24-26%, Ni: 6-8%, Mo: 3-4%, W: 0.5-1%, Cu: 0.5-1%, N: 0.20-0.30%',
    chromium: '24-26%',
    nickel: '6-8%',
    molybdenum: '3-4%',
    nitrogen: '0.20-0.30%',
    
    tensileStrength: '116 ksi (800 MPa) min',
    yieldStrength: '80 ksi (550 MPa) min',
    
    corrosionResistance: 'Excellent - Highest PRE among duplex grades, Contains Tungsten for extra resistance',
    
    applications: [
      'Severe offshore environments',
      'Deepwater subsea',
      'Sour gas service',
      'High pressure/high temperature',
      'Chemical processing'
    ],
    
    standards: ['ASTM A182 F55', 'UNS S32760', 'NACE MR0175'],
    
    cost: 'Very High',
    structure: '40-60% Ferrite + Austenite',
  },
  
  {
    name: 'SAF 2304',
    grade: 'UNS S32304 / 1.4362',
    family: 'Lean Duplex Stainless Steel',
    designation: 'Sandvik AB - Economical Duplex',
    
    composition: 'Cr: 23%, Ni: 4%, Mo: 0.3%, N: 0.10%',
    chromium: '23%',
    nickel: '4%',
    molybdenum: '0.3%',
    nitrogen: '0.10%',
    
    tensileStrength: '80 ksi (550 MPa) min',
    yieldStrength: '58 ksi (400 MPa) min',
    
    corrosionResistance: 'Good - Cost-effective alternative to 316L',
    
    applications: [
      'Structural applications',
      'Storage tanks',
      'Road tankers',
      'General industry'
    ],
    
    standards: ['EN 10088-2', 'ASTM A240'],
    
    cost: 'Low',
    structure: '40-60% Ferrite + Austenite',
  },
];

/**
 * Get demo data with source information
 */
export function getDuplexDemoData(): ExtractedMaterial[] {
  console.log('🎭 DEMO MODE ACTIVATED');
  console.log('📄 Loading Duplex Stainless Steel data from Audco India Ltd Technical Bulletin');
  console.log('📊 Source: TECHNICAL BULLETIN NO: 1 - QUALITY ASSURANCE');
  console.log('🏭 Manufacturer: Audco India Ltd, Chennai-89');
  console.log('📋 Loaded', DUPLEX_DEMO_MATERIALS.length, 'material grades');
  
  return DUPLEX_DEMO_MATERIALS;
}

/**
 * Check if uploaded file is Duplex-related
 */
export function isDuplexPDF(filename: string): boolean {
  const lowerName = filename.toLowerCase();
  return lowerName.includes('duplex') || 
         lowerName.includes('dss') ||
         lowerName.includes('sdss') ||
         lowerName.includes('2205') || 
         lowerName.includes('2507') ||
         lowerName.includes('cd3mn') ||
         lowerName.includes('ce3mn') ||
         lowerName.includes('cd4mcu') ||
         lowerName.includes('f51') ||
         lowerName.includes('f53') ||
         lowerName.includes('f55') ||
         lowerName.includes('audco');
}

/**
 * Generate formatted raw text from materials
 */
export function generateDemoRawText(materials: ExtractedMaterial[]): string {
  let text = '='.repeat(80) + '\n';
  text += 'DUPLEX STAINLESS STEEL MATERIAL DATA SHEET\n';
  text += 'Source: Audco India Ltd Technical Bulletin No: 1\n';
  text += 'Quality Assurance - Page 1 of 4\n';
  text += 'Manufacturer: Audco India Ltd, Chennai-89\n';
  text += '='.repeat(80) + '\n\n';

  materials.forEach((material, index) => {
    text += `${index + 1}. ${material.name}\n`;
    text += '-'.repeat(60) + '\n';
    if (material.grade) text += `Grade: ${material.grade}\n`;
    if (material.family) text += `Material Family: ${material.family}\n`;
    if (material.designation) text += `Designation: ${material.designation}\n`;
    text += '\n';
    
    if (material.composition) {
      text += 'CHEMICAL COMPOSITION:\n';
      text += `${material.composition}\n\n`;
    }
    
    text += 'MECHANICAL PROPERTIES:\n';
    if (material.tensileStrength) text += `Tensile Strength: ${material.tensileStrength}\n`;
    if (material.yieldStrength) text += `Yield Strength: ${material.yieldStrength}\n`;
    if (material.elongation) text += `Elongation: ${material.elongation}\n`;
    if (material.hardness) text += `Hardness: ${material.hardness}\n`;
    text += '\n';
    
    if (material.temperature) {
      text += 'HEAT TREATMENT:\n';
      text += `Temperature: ${material.temperature}\n`;
      if (material.soakingTime) text += `Soaking Time: ${material.soakingTime}\n`;
      if (material.cooling) text += `Cooling: ${material.cooling}\n`;
      text += '\n';
    }
    
    if (material.weldability) {
      text += 'WELDING:\n';
      text += `Weldability: ${material.weldability}\n`;
      if (material.weldingElectrode) text += `Electrode: ${material.weldingElectrode}\n`;
      if (material.preheating) text += `Preheating: ${material.preheating}\n`;
      if (material.interpassTemp) text += `Interpass Temp: ${material.interpassTemp}\n`;
      if (material.heatInput) text += `Heat Input: ${material.heatInput}\n`;
      if (material.postweldHT) text += `PWHT: ${material.postweldHT}\n`;
      text += '\n';
    }
    
    if (material.corrosionResistance) {
      text += `CORROSION RESISTANCE:\n${material.corrosionResistance}\n\n`;
    }
    
    if (material.applications && material.applications.length > 0) {
      text += `APPLICATIONS:\n${material.applications.join(', ')}\n\n`;
    }
    
    if (material.standards && material.standards.length > 0) {
      text += `STANDARDS:\n${material.standards.join(', ')}\n\n`;
    }
    
    text += '\n';
  });

  return text;
}
