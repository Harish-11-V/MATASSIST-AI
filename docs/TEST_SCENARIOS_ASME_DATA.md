# TEST SCENARIOS - Using Actual ASME Table Data

## Based on ASME B16.34 Tables 1 & 3 (From Your Attached Images)

---

## TEST SCENARIO 1: Austenitic Stainless Steels (F304, F316, F321)

### Application: **Cryogenic (Subsea Applications)**

### INPUTS (From ASME Table 3):

**Stage 2 - Menu II (Design Requirements):**
- Operating Temperature (°C): `-196` (Cryogenic LNG service)
- Operating Pressure (psi): `3000`

**Stage 3 - Menu III (Mechanical Properties):**
- Minimum Tensile Strength (MPa): `515` ← From Table 3 [75 ksi]
- Minimum Yield Strength (MPa): `205` ← From Table 3 [30 ksi]
- Minimum Hardness (HB): `143` ← From Table 3 (143-192 range)
- Minimum Elongation (%): `30` ← From Table 3

**Stage 4 - Standards:**
- Select: ASTM, ISO, EN

### EXPECTED TOP 3 RESULTS:
1. **F316** - Best (Molybdenum for better corrosion resistance)
2. **F304** - Strong alternative
3. **F321** - Good option (Titanium stabilized)

All three are austenitic (FCC structure) = Excellent cryogenic toughness

---

## TEST SCENARIO 2: High Strength Austenitic (F321, F316, F310)

### Application: **Subsea Applications**

### INPUTS (From ASME Table 3):

**Stage 2 - Menu II:**
- Operating Temperature (°C): `-100` (Deep cryogenic)
- Operating Pressure (psi): `5000` (High pressure)

**Stage 3 - Menu III:**
- Minimum Tensile Strength (MPa): `515`
- Minimum Yield Strength (MPa): `205`
- Minimum Hardness (HB): `143`
- Minimum Elongation (%): `30`

**Stage 4 - Standards:**
- ASTM, ISO

### EXPECTED TOP 3 RESULTS:
1. **F316** - Best for high pressure + cryogenic
2. **F321** - Titanium stabilized
3. **F310** - High Cr/Ni content

---

## TEST SCENARIO 3: High Temperature Service (F310, F321, F316)

### Application: **Oil & Gas Applications**

### INPUTS:

**Stage 2 - Menu II:**
- Operating Temperature (°C): `800` (High temperature from Table 1)
- Operating Pressure (psi): `2000`

**Stage 3 - Menu III:**
- Minimum Tensile Strength (MPa): `515`
- Minimum Yield Strength (MPa): `205`
- Minimum Hardness (HB): `143`
- Minimum Elongation (%): `30`

**Stage 4 - Standards:**
- ASTM

### EXPECTED TOP 3 RESULTS:
1. **F310** - Best (Max temp 1095°C, 24-26% Cr, 19-22% Ni)
2. **F321** - Good (Max temp 870°C, Ti-stabilized)
3. **F44 (Inconel 625)** - Excellent high-temp performance

---

## TEST SCENARIO 4: Duplex Stainless Steel (F51, F55)

### Application: **Oil & Gas / Subsea**

### INPUTS (From ASME Table 3 - Duplex grades):

**Stage 2 - Menu II:**
- Operating Temperature (°C): `20` (Ambient, NOT cryogenic)
- Operating Pressure (psi): `6000` (Very high pressure)

**Stage 3 - Menu III:**
- Minimum Tensile Strength (MPa): `620` ← F51 from Table 3 [90 ksi]
- Minimum Yield Strength (MPa): `450` ← F51 from Table 3 [65 ksi]
- Minimum Hardness (HB): `290` ← F51 max hardness
- Minimum Elongation (%): `25` ← F51 from Table 3

**Stage 4 - Standards:**
- ASTM

### EXPECTED TOP 3 RESULTS:
1. **F55 (Super Duplex)** - Best (110 ksi / 760 MPa tensile, 80 ksi / 550 MPa yield)
2. **F51 (Duplex 2205)** - Strong (90 ksi / 620 MPa tensile, 65 ksi / 450 MPa yield)
3. **F44 (Inconel 625)** - Good (120 ksi / 827 MPa tensile)

---

## TEST SCENARIO 5: Super Duplex (F55) - Maximum Strength

### Application: **Subsea Applications**

### INPUTS (From ASME Table 3 - Super Duplex):

**Stage 2 - Menu II:**
- Operating Temperature (°C): `50` (Warm subsea)
- Operating Pressure (psi): `10000` (Extreme pressure)

**Stage 3 - Menu III:**
- Minimum Tensile Strength (MPa): `760` ← F55 from Table 3 [110 ksi]
- Minimum Yield Strength (MPa): `550` ← F55 from Table 3 [80 ksi]
- Minimum Hardness (HB): `295` ← F55 max hardness
- Minimum Elongation (%): `15` ← F55 from Table 3

**Stage 4 - Standards:**
- ASTM, NACE

### EXPECTED TOP 3 RESULTS:
1. **F55 (Super Duplex Zeron 100)** - Perfect match
2. **F44 (Inconel 625)** - Higher tensile (827 MPa)
3. **F51 (Duplex 2205)** - Good but lower strength

---

## TEST SCENARIO 6: Low Alloy Steel (Should FAIL for Cryogenic)

### Application: **Subsea Applications (Cryogenic)**

### INPUTS (From ASME Table 3 - F22):

**Stage 2 - Menu II:**
- Operating Temperature (°C): `-196` (Cryogenic - UNSAFE for F22!)
- Operating Pressure (psi): `3000`

**Stage 3 - Menu III:**
- Minimum Tensile Strength (MPa): `515` ← F22 from Table 3 [75 ksi]
- Minimum Yield Strength (MPa): `310` ← F22 from Table 3 [45 ksi]
- Minimum Hardness (HB): `156` ← F22 from Table 3
- Minimum Elongation (%): `20` ← F22 from Table 3

**Stage 4 - Standards:**
- ASTM

### EXPECTED RESULTS:
- **F22 should be DISQUALIFIED** (Low alloy steel, BCC structure, becomes brittle at cryogenic temps)
- Top 3 should be austenitic grades instead: F316, F304, F321

---

## VERIFICATION TABLE - Material Properties from ASME Table 3

| Grade | Family | Tensile<br>(MPa) | Yield<br>(MPa) | Elongation<br>(%) | Hardness<br>(HB) | Temp Range<br>(°C) | Notes |
|-------|--------|------------------|----------------|-------------------|------------------|--------------------|-------|
| **F304** | Austenitic SS | 515 | 205 | 30 | --- | -196 to 425 | General purpose, good cryogenic |
| **F316** | Austenitic SS | 515 | 205 | 30 | --- | -196 to 425 | Mo addition, better corrosion |
| **F321** | Austenitic SS | 515 | 205 | 30 | --- | -196 to 870 | Ti-stabilized, high temp |
| **F310** | Austenitic SS | 515 | 205 | 30 | --- | -196 to 1095 | High Cr/Ni, very high temp |
| **F51** | Duplex SS | 620 | 450 | 25 | 290 max | -50 to 316 | 2205, high strength |
| **F55** | Super Duplex | 760 | 550 | 15 | 295 max | -50 to 250 | Zeron 100, highest strength |
| **F44** | Ni Alloy | 827 | 414 | 30 | 200-250 | -196 to 1095 | Inconel 625 |
| **F22** | Low Alloy | 515 | 310 | 20 | 156-207 | -29 to 593 | **NOT for cryogenic!** |

---

## HOW TO RUN THE TEST:

1. **Upload File**: Use `public/ASME_Table5_Test.md` or any file with "ASME" or "Table" in the name

2. **Select Application**: 
   - Cryogenic → "Subsea Applications"
   - High temp → "Oil & Gas Applications"

3. **Input Values**: Use the exact numbers from the scenarios above (taken from ASME Table 3)

4. **Run Analysis**: Click through Menu II → Menu III → Menu IV → Run Analysis

5. **Verify Results**: 
   - Check that top 3 materials match expected results
   - Check that F22 is disqualified for cryogenic
   - Check that duplex grades rank high for high-strength requirements
   - Check that austenitic grades rank high for cryogenic

6. **Test Downloads**:
   - Click "Download Excel" - should get detailed .xlsx file
   - Click "Download Word" - should get formatted .docx file

---

## KEY VALIDATION POINTS:

✅ **Cryogenic Test**: Only austenitic (FCC) materials should rank top 3
- F304, F316, F310, F321, F44 (Inconel) ✓
- F22 (low alloy) should be REJECTED ✗
- F51, F55 (duplex) may have penalties for deep cryogenic ⚠️

✅ **High Strength Test**: Duplex and super duplex should rank highest
- F55 (760 MPa) should rank #1
- F51 (620 MPa) should be in top 3
- F44 (827 MPa Inconel) should compete

✅ **High Temperature Test**: High-temp grades should rank highest
- F310 (up to 1095°C) should rank #1
- F44 (Inconel 625, up to 1095°C) should be top 3
- F321 (up to 870°C) should be in top 3

✅ **Elongation Factor**: Materials with better elongation should score higher
- F304, F316, F321, F44: 30% elongation ✓✓
- F51: 25% elongation ✓
- F55: 15% elongation (acceptable for super duplex)

---

## NOTES:

- All values are from **actual ASME B16.34 standards**
- Temperatures from Table 1 (Heat Treating Requirements)
- Mechanical properties from Table 3 (Tensile and Hardness Requirements)
- System should intelligently rank based on ALL criteria combined
- Elongation is now a **critical factor** in ranking
