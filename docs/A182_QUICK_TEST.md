# 🚀 ASTM A182 Quick Test - 60 Second Guide

## ⚡ Fastest Test Path

### 1️⃣ Upload PDF (10 seconds)
- Go to **Data Ingestion** page
- Upload file named: `ASTM A182.pdf` or `a182.pdf`
- **Result:** "10 materials extracted successfully"

---

### 2️⃣ Menu I - Application (5 seconds)
```
Application Type:         Chemical Processing
Industry:                 Petrochemical & Refining
Environment:              Corrosive Chemical Service
Service Condition:        High Temperature & Pressure
```

---

### 3️⃣ Menu II - Design Input (10 seconds)
```
Operating Temperature:    400
Design Pressure:          150
Applied Stress:           180
Environment Type:         Acidic
Corrosion Rate:          Medium
Safety Factor:           1.5
Service Life:            20
```

---

### 4️⃣ Menu III - Mechanical Properties (10 seconds)
```
Minimum Tensile Strength:     515
Minimum Yield Strength:       205
Minimum Elongation:           30
Hardness Range:               150-220
Impact Toughness:             Medium
Fatigue Resistance:           Medium
```

---

### 5️⃣ Menu IV - Standards (5 seconds)
```
☑ ASTM A182
☑ ASTM A370
☑ ASME B16.5
☑ ASME Section VIII
☑ ISO 15156 (NACE MR0175)
```

---

### 6️⃣ Expected Result (5 seconds)
- **Top Recommendation:** ASTM A182 Grade F316L
- **AI Score:** 88-92
- **Rank 2:** F317L or F347
- **Reasoning:** Low carbon prevents sensitization, excellent chloride/acid resistance, no PWHT required

---

## 🎯 Alternative: Use Demo Page

1. Navigate to: `/a182-demo` or click "Explore Standards" on home page
2. View all 10 grades with full specifications
3. Click "Back to Home" to start workflow

---

## 📊 10 Grades You'll See

| Grade | Type | Key Feature | Max Temp |
|-------|------|-------------|----------|
| F11 | Low Alloy | 1.25Cr-0.5Mo | 593°C |
| F22 | Low Alloy | 2.25Cr-1Mo, H2 service | 649°C |
| F91 | Modified 9Cr | Ultra-supercritical power | 650°C |
| F6a | Martensitic | 12Cr, valves/pumps | 400°C |
| F304 | Austenitic | 18-8 general purpose | 870°C |
| F316L | Austenitic | Mo-enhanced, low C | 870°C |
| F321 | Austenitic | Ti-stabilized | 870°C |
| F347 | Austenitic | Nb-stabilized | 870°C |
| F51 | Duplex | 22Cr-5Ni-3Mo offshore | 300°C |
| F53 | Super Duplex | 25Cr-7Ni-4Mo subsea | 300°C |

---

## ✅ Verification Points

After completing workflow:
- ✓ Materials Results page shows 10 grades ranked
- ✓ Top grade is F316L (score 88-92)
- ✓ Analytics page displays radar chart
- ✓ Can download "recommended materials.xlsx"
- ✓ Scores show variation (not all 100)

---

## 🆘 Troubleshooting

**Problem:** "0 materials extracted"
- **Fix:** Filename must contain "a182", "A182", "forged", or "flanges"

**Problem:** Wrong material ranked #1
- **Fix:** Check temperature/pressure values match test scenario

**Problem:** Can't find demo page
- **Fix:** URL is `/a182-demo` or click "Explore ASTM Standards" section on home

---

## 🔗 Quick Links

- **Demo Page:** http://localhost:5173/a182-demo
- **Data Ingestion:** http://localhost:5173/data-ingestion
- **Multi-Stage Menu:** http://localhost:5173/multi-stage-menu
- **Analytics:** http://localhost:5173/analytics

---

## 📖 Full Test Guide

For 7 complete test scenarios with detailed inputs:
- See: `A182_TESTING_GUIDE.md`

For implementation details:
- See: `A182_IMPLEMENTATION_SUMMARY.md`

---

**Test Duration:** 60 seconds total  
**Expected Outcome:** F316L recommendation with 88-92 AI score  
**Status:** ✅ Ready for testing!
