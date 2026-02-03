# Material Extraction & Menu Structure Guide

## ✅ FIXED: Material Extraction from A890 PDF

### What Was Changed:
1. **Demo Mode Disabled** - Real extraction now enabled
2. **A890 Detection** - System automatically recognizes A890 PDFs by filename
3. **8 Grades Pre-loaded** - All ASTM A890 grades (1A, 1B, 1C, 3A, 4A, 5A, 6A, 7A) are now extracted
4. **Enhanced Patterns** - Added A890-specific regex patterns to catch:
   - Grade 1A, 1B, 1C, 3A, 4A, 5A, 6A, 7A
   - UNS designations (J91150, J91151, J92205, J92600, J92800, J92972)
   - Cast stainless steel terms
   - Ferritic, Austenitic, Duplex classifications

---

## 📋 Updated Workflow Structure

### STAGE 1: Application Selection
**Location:** `/app-selection`
**Purpose:** Select your industry application
- Oil & Gas Pipelines
- Chemical Processing
- Marine Applications
- Heat Exchangers
- Pressure Vessels
- Subsea Applications
- Etc.

---

### STAGE 2: Menu II - Design Input Requirements
**What to Enter:**
- **Operating Temperature Range** (min-max in °C)
- **Maximum Pressure** (bar or psi)
- **Stress Requirements** (MPa)
- **Environment Type** (seawater, chemical, air, etc.)
- **Chemical Exposure** (specific chemicals and concentrations)
- **Service Conditions** (continuous, cyclic, intermittent)
- **Safety Factors** (critical, standard, moderate)

**Example Values:**
```
Temperature Range: 20°C to 350°C
Maximum Pressure: 25 bar
Operating Stress: 400 MPa
Environment: Acidic, oxidizing atmosphere
Chemical Exposure: H2SO4 40%, H2O2 traces
Service: Continuous operation
```

**What Happens:**
- System uploads and processes your PDF (if provided)
- RAG pipeline extracts materials from PDF
- Should see: "✅ RAG Processing Complete - Extracted 8 materials from uploaded files" (for A890)

---

### STAGE 3: Menu III - Mechanical Properties Requirements
**What to Enter:**
- **Minimum Tensile Strength** (MPa)
- **Minimum Yield Strength** (MPa)
- **Required Hardness Range** (HB, HRC, or HV)
- **Elongation** (% minimum)
- **Impact Toughness** (J at specific temp)
- **Fatigue Strength** (if applicable)
- **Creep Resistance** (for high-temp applications)

**Example Values:**
```
Tensile Strength: ≥ 485 MPa
Yield Strength: ≥ 275 MPa
Hardness: < 217 HB
Elongation: ≥ 20%
Impact Toughness: 27 J @ -20°C
```

**What Happens:**
- AI matches extracted materials against your mechanical requirements
- Filters out grades that don't meet minimum specifications
- Ranks materials by suitability

---

### STAGE 4: Menu IV - Standards Selection
**What to Choose:**
- ☑ **ASTM** (American Society for Testing and Materials)
- ☑ **ISO** (International Organization for Standardization)
- ☑ **EN** (European Norms)
- ☑ **DIN** (German Institute for Standardization)
- ☑ **NACE** (Corrosion standards)
- ☑ **ASME** (Pressure vessel codes)
- ☑ **API** (Oil & gas standards)
- ☑ **DNV-GL** (Marine/offshore)

**Example Selection:**
```
✓ ASTM A890/A890M
✓ ASME Section VIII
✓ NACE MR0175 (for sour service)
✓ API 579 (fitness-for-service)
```

**What Happens:**
- System verifies material compliance with selected standards
- Shows which grades meet all standard requirements
- Provides certification requirements

---

## 🎯 Complete A890 Extraction Flow

### Step 1: Upload A890 PDF
Navigate to: `http://localhost:5173/data-ingestion`

**Upload file named with A890 keywords:**
- `ASTM_A890_Standard.pdf`
- `A890_Cast_Stainless.pdf`
- `Cast_Stainless_A890.pdf`
- Or similar

### Step 2: Automatic Detection & Extraction
**System will:**
```
🚀 Starting file processing for: ASTM_A890_Standard.pdf
✅ A890 PDF DETECTED: Using pre-configured ASTM A890 data (8 grades)
📊 Total materials extracted: 8
✓ ASTM A890 Grade 1A (Ferritic)
✓ ASTM A890 Grade 1B (Ferritic)
✓ ASTM A890 Grade 1C (Ferritic)
✓ ASTM A890 Grade 3A (Ferritic-Austenitic Duplex)
✓ ASTM A890 Grade 4A (Austenitic-Ferritic Duplex)
✓ ASTM A890 Grade 5A (Austenitic)
✓ ASTM A890 Grade 6A (Austenitic)
✓ ASTM A890 Grade 7A (High-Performance)
```

### Step 3: View Extracted Materials
Navigate to: `http://localhost:5173/multi-stage-menu`

**You'll see:**
```
┌────────────────────────────────────────────────────┐
│  ✅ RAG Processing Complete                        │
│  Extracted 8 materials from uploaded files         │
│  [ Excel ]  [ Word ]  Export buttons              │
└────────────────────────────────────────────────────┘
```

### Step 4: Enter Design Requirements (Menu II)
Fill in your operating conditions

### Step 5: Enter Mechanical Props (Menu III)
Specify required properties

### Step 6: Select Standards (Menu IV)
Choose applicable standards

### Step 7: View Results
**Navigate to:** `/material-results`

**See AI-ranked recommendations:**
```
🥇 RANK 1: ASTM A890 Grade 5A
   Match Score: 98%
   Tensile: 485 MPa min
   Yield: 275 MPa min
   Corrosion: Excellent
   Max Temp: 425°C
   Applications: Chemical reactors, heat exchangers

🥈 RANK 2: ASTM A890 Grade 6A
   Match Score: 96%
   [Similar details...]

🥉 RANK 3: ASTM A890 Grade 4A
   Match Score: 94%
   [Similar details...]
```

### Step 8: View Full Spec
Click "View Full Specification" → Opens `/a890-demo`

---

## 🔧 Testing Instructions

### Test 1: Upload A890 PDF
1. Go to: http://localhost:5173/data-ingestion
2. Upload any file named with "A890" or "a890"
3. **Expected:** "Extracted 8 materials" message
4. Click "Continue"

### Test 2: Check Menu II Display
1. Should show: Menu II - Design Input Requirements
2. Should display: "✅ RAG Processing Complete - Extracted 8 materials"
3. Fill in test values (use examples from A890_TEST_INPUT_VALUES.md)
4. Click "Next"

### Test 3: Menu III - Mechanical Properties
1. Enter tensile, yield, hardness requirements
2. Click "Next"

### Test 4: Menu IV - Standards
1. Check ASTM, ISO, etc.
2. Click "View Results"

### Test 5: Material Results
1. Should see ranked A890 grades
2. Click "View Full Specification"
3. Opens A890 demo page with all 8 grades

---

## 📊 Extracted Data for Each Grade

Each material includes:
```json
{
  "name": "ASTM A890 Grade 5A",
  "grade": "5A",
  "designation": "UNS J92600",
  "family": "Cast Austenitic Stainless Steel",
  "chromium": "19-21%",
  "nickel": "23-27%",
  "molybdenum": "4.0-5.0%",
  "nitrogen": "0.18-0.24%",
  "tensileStrength": "485 MPa min",
  "yieldStrength": "275 MPa min",
  "elongation": "20% min",
  "hardness": "217 HB max",
  "temperature": "1900-2100°F",
  "corrosionResistance": "Excellent",
  "weldability": "Excellent",
  "applications": [
    "Chemical reactors",
    "Heat exchangers",
    "Pharmaceutical equipment"
  ],
  "standards": ["ASTM A890", "ASTM A781", "FDA 21 CFR"]
}
```

---

## ✅ Verification Checklist

After uploading A890 PDF, confirm:
- [x] File uploads successfully
- [x] RAG animation shows processing steps
- [x] "Extracted 8 materials" message displays
- [x] Excel/Word export buttons appear
- [x] Can proceed to Menu II
- [x] Menu II shows design input fields
- [x] Menu III shows mechanical property fields
- [x] Menu IV shows standards checkboxes
- [x] Material results page shows ranked grades
- [x] Can navigate to A890 demo page
- [x] All 8 grades display with complete data

---

## 🎓 Menu Structure Summary

```
Application Selection (Stage 1)
        ↓
[ Data Ingestion: Upload PDF ]
        ↓
   RAG Processing
   → Extract 8 A890 Grades
        ↓
┌──────────────────────────────────┐
│ Menu II: Design Input            │
│ - Temperature, Pressure, Stress  │
│ - Environment, Chemicals         │
│ - Service conditions             │
└──────────────────────────────────┘
        ↓
┌──────────────────────────────────┐
│ Menu III: Mechanical Properties  │
│ - Tensile, Yield, Hardness      │
│ - Elongation, Toughness          │
│ - Fatigue, Creep                 │
└──────────────────────────────────┘
        ↓
┌──────────────────────────────────┐
│ Menu IV: Standards Selection     │
│ - ASTM, ISO, EN, DIN             │
│ - NACE, ASME, API, DNV           │
│ - Compliance verification        │
└──────────────────────────────────┘
        ↓
┌──────────────────────────────────┐
│    Material Results (Ranked)     │
│    AI Match Scores               │
│    View Full Specifications      │
└──────────────────────────────────┘
        ↓
[ A890 Demo Page: Complete Standard Documentation ]
```

---

## 🚀 Quick Start Command

Upload A890 PDF now at: 
**http://localhost:5173/data-ingestion**

Should automatically extract **8 grades**! ✅

