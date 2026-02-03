# ASTM A890 Test Inputs - Marine & Oil/Gas Applications

## Test Case 1: Offshore Oil & Gas Platform (Grade 4A Expected)
**Application Type:** Oil & Gas / Marine
**Operating Conditions:**
- **Temperature:** 80°C (176°F)
- **Pressure:** 3000 psi (20.7 MPa)
- **Applied Stress:** 300 MPa
- **Environment:** Seawater with chlorides
- **Corrosion Requirements:** High (chloride SCC resistance)

**Expected Winner:** Grade 4A (CD3MN) - UNS J92205 (2205 equivalent)
**Why:** 
- Tensile: 620 MPa (adequate for 300 MPa stress)
- Excellent chloride resistance
- Marine-grade duplex for oil/gas platforms
- Cost-effective for the application

---

## Test Case 2: Desalination Plant - High Chloride (Grade 1A or 4A)
**Application Type:** Chemical Processing / Marine
**Operating Conditions:**
- **Temperature:** 60°C (140°F)
- **Pressure:** 2000 psi (13.8 MPa)
- **Applied Stress:** 250 MPa
- **Environment:** Very high chloride concentration
- **Corrosion Requirements:** Extreme (brine environment)

**Expected Winners:** 
1. Grade 1A (CD4MCu) - High Cu content enhances chloride resistance
2. Grade 4A (CD3MN) - Balanced performance

**Why:** 
- Both have excellent pitting resistance
- Copper in 1A provides additional protection
- Moderate stress allows either grade

---

## Test Case 3: High-Stress Marine Application (Grade 5A Expected)
**Application Type:** Subsea / High Stress
**Operating Conditions:**
- **Temperature:** 90°C (194°F)
- **Pressure:** 5000 psi (34.5 MPa)
- **Applied Stress:** 450 MPa
- **Environment:** Deep seawater with high pressure
- **Corrosion Requirements:** Extreme

**Expected Winner:** Grade 5A (CE3MN)
**Why:**
- **Highest yield strength: 515 MPa** (handles 450 MPa stress)
- Excellent molybdenum content (4.0-5.0%) for deep water
- Superior corrosion resistance
- Designed for high-stress subsea equipment

---

## Test Case 4: Chemical Processing - Acidic Chlorides (Grade 6A Expected)
**Application Type:** Chemical Processing
**Operating Conditions:**
- **Temperature:** 120°C (248°F)
- **Pressure:** 4000 psi (27.6 MPa)
- **Applied Stress:** 380 MPa
- **Environment:** Acidic chloride solution
- **Corrosion Requirements:** Extreme

**Expected Winner:** Grade 6A (CD3MWCuN) - Super Duplex
**Why:**
- Tungsten (0.5-1.0%) provides exceptional corrosion resistance
- High nitrogen (0.20-0.30%) for strength and corrosion
- Handles high temperature and acidic environment
- Premium material for severe service

---

## Test Case 5: Moderate Marine Service (Grade 3A Expected)
**Application Type:** Marine / General
**Operating Conditions:**
- **Temperature:** 50°C (122°F)
- **Pressure:** 1500 psi (10.3 MPa)
- **Applied Stress:** 200 MPa
- **Environment:** Brackish water
- **Corrosion Requirements:** Moderate to High

**Expected Winner:** Grade 3A (CD6MN)
**Why:**
- Adequate strength (655 MPa tensile / 450 MPa yield)
- Good corrosion resistance for brackish water
- **Most cost-effective** for moderate requirements
- Balanced composition for general service

---

## Test Case 6: Cryogenic Test (All A890 Grades Should Fail/Rank Low)
**Application Type:** Cryogenic Storage
**Operating Conditions:**
- **Temperature:** -150°C (-238°F)
- **Pressure:** 2000 psi (13.8 MPa)
- **Applied Stress:** 250 MPa
- **Environment:** Liquid nitrogen storage

**Expected Result:** 
- **All A890 grades should rank LOW or be disqualified**
- System should recommend A182 austenitic grades (F304, F316L, F321)

**Why:**
- Duplex stainless steels have min temp limit of -50°C
- Below -50°C, ferrite phase becomes brittle
- Deep cryogenic requires austenitic structure only

---

## How to Test in Application:

### Step 1: Create Test PDF
Save this content as `ASTM_A890_Test.pdf` or `A890_Specification.pdf`

### Step 2: Input Parameters
For **Test Case 1 (Oil & Gas)**:
```
Application: Oil & Gas / Marine
Temperature: 80°C
Pressure: 3000 psi
Applied Stress: 300 MPa
Environment: Seawater
```

### Step 3: Verify Output
Check that:
1. ✅ Grade 4A (CD3MN) ranks #1
2. ✅ Design Requirements score shows proper percentage (not 0%)
3. ✅ Mechanical Properties score reflects 300 MPa vs 415 MPa yield
4. ✅ Export (Excel/Word) shows correct values:
   - Tensile: 620 MPa
   - Yield: 415 MPa
   - Composition: 22Cr-5Ni-Mo-N
   - UNS: J92205

### Step 4: Export Validation
Download Excel/Word and verify:
- ✅ Grade designation matches (4A)
- ✅ Tensile/Yield match spec (620/415 MPa)
- ✅ Temperature range correct (-50°C to 315°C)
- ✅ Nitrogen content shown (0.10-0.30%)

---

## Expected Ranking Order by Application:

| Test Case | Rank 1 | Rank 2 | Rank 3 |
|-----------|--------|--------|--------|
| Oil & Gas (80°C, 300 MPa) | 4A (J92205) | 1A (J93370) | 3A (J93371) |
| Desalination (60°C, 250 MPa) | 1A (J93370) | 4A (J92205) | 1B (J93372) |
| High Stress Subsea (90°C, 450 MPa) | 5A | 6A | 1B (J93372) |
| Acidic Chlorides (120°C, 380 MPa) | 6A | 5A | 2A (J93345) |
| Moderate Marine (50°C, 200 MPa) | 3A (J93371) | 4A (J92205) | 1A (J93370) |
| Cryogenic (-150°C, 250 MPa) | All A890 LOW | Use A182 | F304/F316L |

---

## Console Verification
When testing, check browser console for:
```
🎯 Ranking Material: ASTM A890 Grade 4A (CD3MN)
📐 Design Requirements Score: 85%
💪 Mechanical Properties Score: 92%
📋 Standards Compliance: 100%
💰 Cost Efficiency: 75%
✅ Final Score: 88.5%
```

This confirms accurate scoring and data integrity.
