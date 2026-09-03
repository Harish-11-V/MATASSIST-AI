// Material Suggestions Service — fully local, no Supabase dependency.

export interface MaterialSuggestion {
  materialFamily: string;
  grade: string;
  keyProperties: {
    tensileStrength?: string;
    yieldStrength?: string;
    elongation?: string;
    hardness?: string;
    corrosionResistance?: string;
    temperatureRange?: string;
  };
}

export interface ApplicationMaterials {
  application: string;
  topMaterials: MaterialSuggestion[];
}

// Comprehensive material database for different applications
const MATERIAL_DATABASE: Record<string, MaterialSuggestion[]> = {
  cryogenic: [
    {
      materialFamily: "Austenitic Stainless Steel",
      grade: "316L",
      keyProperties: {
        tensileStrength: "485 MPa",
        yieldStrength: "170 MPa",
        elongation: "40%",
        hardness: "217 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-196°C to 425°C"
      }
    },
    {
      materialFamily: "Nickel Steel",
      grade: "9% Ni Steel",
      keyProperties: {
        tensileStrength: "690 MPa",
        yieldStrength: "585 MPa",
        elongation: "20%",
        hardness: "280 HB",
        corrosionResistance: "Good",
        temperatureRange: "-196°C to 200°C"
      }
    },
    {
      materialFamily: "Aluminum Alloy",
      grade: "5083-H116",
      keyProperties: {
        tensileStrength: "317 MPa",
        yieldStrength: "228 MPa",
        elongation: "16%",
        hardness: "85 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-269°C to 65°C"
      }
    },
    {
      materialFamily: "Iron-Nickel Alloy",
      grade: "Invar 36",
      keyProperties: {
        tensileStrength: "500 MPa",
        yieldStrength: "275 MPa",
        elongation: "30%",
        hardness: "150 HB",
        corrosionResistance: "Moderate",
        temperatureRange: "-253°C to 200°C"
      }
    },
    {
      materialFamily: "Austenitic Stainless Steel",
      grade: "304L",
      keyProperties: {
        tensileStrength: "485 MPa",
        yieldStrength: "170 MPa",
        elongation: "40%",
        hardness: "201 HB",
        corrosionResistance: "Very Good",
        temperatureRange: "-196°C to 425°C"
      }
    }
  ],
  subsea: [
    {
      materialFamily: "Duplex Stainless Steel",
      grade: "2205 (UNS S31803)",
      keyProperties: {
        tensileStrength: "620 MPa",
        yieldStrength: "450 MPa",
        elongation: "25%",
        hardness: "290 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-50°C to 300°C"
      }
    },
    {
      materialFamily: "Super Duplex Stainless Steel",
      grade: "2507 (UNS S32750)",
      keyProperties: {
        tensileStrength: "800 MPa",
        yieldStrength: "550 MPa",
        elongation: "15%",
        hardness: "310 HB",
        corrosionResistance: "Outstanding",
        temperatureRange: "-50°C to 250°C"
      }
    },
    {
      materialFamily: "Nickel-Chromium Alloy",
      grade: "Inconel 625",
      keyProperties: {
        tensileStrength: "827 MPa",
        yieldStrength: "414 MPa",
        elongation: "30%",
        hardness: "240 HB",
        corrosionResistance: "Exceptional",
        temperatureRange: "-196°C to 1000°C"
      }
    },
    {
      materialFamily: "Titanium Alloy",
      grade: "Ti-6Al-4V (Grade 5)",
      keyProperties: {
        tensileStrength: "895 MPa",
        yieldStrength: "828 MPa",
        elongation: "10%",
        hardness: "334 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-196°C to 400°C"
      }
    },
    {
      materialFamily: "Austenitic Stainless Steel",
      grade: "317L",
      keyProperties: {
        tensileStrength: "515 MPa",
        yieldStrength: "205 MPa",
        elongation: "35%",
        hardness: "217 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-196°C to 450°C"
      }
    }
  ],
  "oil-gas": [
    {
      materialFamily: "Carbon Steel",
      grade: "API 5L X65",
      keyProperties: {
        tensileStrength: "535 MPa",
        yieldStrength: "450 MPa",
        elongation: "22%",
        hardness: "250 HB",
        corrosionResistance: "Moderate",
        temperatureRange: "-40°C to 400°C"
      }
    },
    {
      materialFamily: "Martensitic Stainless Steel",
      grade: "13Cr (CA6NM)",
      keyProperties: {
        tensileStrength: "755 MPa",
        yieldStrength: "550 MPa",
        elongation: "15%",
        hardness: "285 HB",
        corrosionResistance: "Good",
        temperatureRange: "-46°C to 315°C"
      }
    },
    {
      materialFamily: "Duplex Stainless Steel",
      grade: "22Cr (UNS S31803)",
      keyProperties: {
        tensileStrength: "620 MPa",
        yieldStrength: "450 MPa",
        elongation: "25%",
        hardness: "290 HB",
        corrosionResistance: "Excellent",
        temperatureRange: "-50°C to 300°C"
      }
    },
    {
      materialFamily: "Nickel-Molybdenum Alloy",
      grade: "Hastelloy C-276",
      keyProperties: {
        tensileStrength: "690 MPa",
        yieldStrength: "283 MPa",
        elongation: "40%",
        hardness: "210 HB",
        corrosionResistance: "Outstanding",
        temperatureRange: "-196°C to 1095°C"
      }
    },
    {
      materialFamily: "Low Alloy Steel",
      grade: "ASTM A517 Grade Q",
      keyProperties: {
        tensileStrength: "760 MPa",
        yieldStrength: "690 MPa",
        elongation: "16%",
        hardness: "285 HB",
        corrosionResistance: "Moderate",
        temperatureRange: "-45°C to 400°C"
      }
    }
  ]
};

const CACHE_KEY_PREFIX = 'matassist_material_cache_';

/**
 * Fetches top material recommendations for a given application.
 */
export async function fetchMaterialSuggestions(
  application: string
): Promise<ApplicationMaterials> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const materials = MATERIAL_DATABASE[application] || [];

  return {
    application,
    topMaterials: materials
  };
}

/**
 * Enriches material data by fetching additional properties.
 */
export async function enrichMaterialData(
  materialFamily: string,
  grade: string
): Promise<Partial<MaterialSuggestion>> {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    materialFamily,
    grade,
    keyProperties: {}
  };
}

/**
 * Caches material suggestions in localStorage for offline access.
 */
export async function cacheMaterialSuggestions(
  application: string,
  materials: MaterialSuggestion[]
): Promise<void> {
  try {
    const payload = {
      application,
      materials,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEY_PREFIX + application, JSON.stringify(payload));
  } catch (error) {
    console.error('Error caching materials:', error);
  }
}
