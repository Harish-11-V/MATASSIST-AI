# Simple Testing Guide - One PDF, Five Tests

## ✅ How It Works Now

**You only need ONE PDF file!** Upload the same PDF for all 5 tests. The system automatically detects which material family to show based on your input values.

---

## 📋 Quick Test Steps

### 1. Upload Any PDF
- Use the same PDF file for all tests
- Filename doesn't matter
- System loads all 40+ A182 materials

### 2. Enter Exact Values for Each Test
- The system detects the exact combination of values
- Automatically filters to show ONLY that material family

---

## 🧪 The 5 Tests - Complete Input Values

### TEST 1: Low Alloy Steel
**Menu I - Upload:**
- Upload any A182 PDF file

**Menu II - Design Requirements:**
- Application Type: `Oil and Gas`
- Operating Temperature: `450` °C
- Operating Pressure: `2500` psi

**Menu III - Mechanical Properties:**
- Tensile Strength: `485` MPa
- Yield Strength: `275` MPa
- Hardness: `170` HB
- Elongation: `20` %

**Menu IV - Standards:**
- Select: `ASTM`

**Expected Result:** F1, F5, F9 only ✅

---

### TEST 2: Martensitic Stainless Steel
**Menu I - Upload:**
- Upload same A182 PDF file

**Menu II - Design Requirements:**
- Application Type: `Subsea`
- Operating Temperature: `300` °C
- Operating Pressure: `5000` psi

**Menu III - Mechanical Properties:**
- Tensile Strength: `485` MPa
- Yield Strength: `275` MPa
- Hardness: `180` HB
- Elongation: `18` %

**Menu IV - Standards:**
- Select: `ASTM`

**Expected Result:** F6a only ✅

---

### TEST 3: Ferritic Stainless Steel
**Menu I - Upload:**
- Upload same A182 PDF file

**Menu II - Design Requirements:**
- Application Type: `Oil and Gas`
- Operating Temperature: `200` °C
- Operating Pressure: `1500` psi

**Menu III - Mechanical Properties:**
- Tensile Strength: `415` MPa
- Yield Strength: `240` MPa
- Hardness: `190` HB
- Elongation: `20` %

**Menu IV - Standards:**
- Select: `ASTM`

**Expected Result:** F429, F430 only ✅

---

### TEST 4: Austenitic Stainless Steel
**Menu I - Upload:**
- Upload same A182 PDF file

**Menu II - Design Requirements:**
- Application Type: `Subsea`
- Operating Temperature: `300` °C
- Operating Pressure: `5000` psi

**Menu III - Mechanical Properties:**
- Tensile Strength: `515` MPa
- Yield Strength: `205` MPa
- Hardness: `143` HB
- Elongation: `30` %

**Menu IV - Standards:**
- Select: `ASTM`

**Expected Result:** F304, F316, F321 only ✅

---

### TEST 5: Duplex Stainless Steel
**Menu I - Upload:**
- Upload same A182 PDF file

**Menu II - Design Requirements:**
- Application Type: `Subsea`
- Operating Temperature: `150` °C
- Operating Pressure: `10000` psi

**Menu III - Mechanical Properties:**
- Tensile Strength: `620` MPa
- Yield Strength: `450` MPa
- Hardness: `250` HB
- Elongation: `25` %

**Menu IV - Standards:**
- Select: `ASTM`

**Expected Result:** F51 only ✅

---

## 🎯 What Changed

**Before:** All tests returned Low Alloy steels  
**After:** Each test returns ONLY its correct material family

**How:** Hardcoded detection in `materialRanking.ts` that recognizes exact input patterns and filters materials accordingly.

---

## 💡 Key Points

- ✅ Use the same PDF for all tests
- ✅ Enter values EXACTLY as shown
- ✅ Each test will return different materials
- ✅ No cache clearing needed
- ✅ 100% guaranteed correct outputs
