# ASTM A890 Material Selection - Complete Workflow Guide

## 🎯 Overview
This guide walks you through the complete process of selecting ASTM A890 cast stainless steel materials for your application, from initial application selection to viewing detailed material specifications.

---

## 📋 Step-by-Step Process

### **STEP 1: Home Page - Start Your Journey**
**Location:** `/` (Home Page)

#### What You'll See:
- **Hero Section** with "Material Assistant" title
- **Quick Access Section** with three main cards:
  - 🏭 **Applications** - Browse and select your application
  - 📊 **Analytics** - View insights
  - 🤖 **AI Chatbot** - Get intelligent assistance
- **Standards Banner** displaying ASTM, DIN, EN, ISO standards

#### Action Required:
1. Click on **"Applications"** card (or "Browse Applications" button)
2. This navigates you to `/app-selection`

---

### **STEP 2: Application Selection Page**
**Location:** `/app-selection`

#### What You'll See:
- List of industrial applications with AI-recommended materials
- Each application card shows:
  - Application name and description
  - AI confidence score (e.g., "92% Match")
  - Recommended materials (e.g., ASTM A890-4A, A890-5A)
  - Material properties preview

#### Available Applications:
- **Oil & Gas Pipelines** - High corrosion resistance, 850°C max
- **Chemical Processing** - Excellent chemical resistance
- **Marine Applications** - Superior corrosion resistance for seawater
- **Heat Exchangers** - High temperature resistance
- **Pressure Vessels** - High strength and durability
- And more...

#### Material Properties Displayed:
Each material card shows:
- **Tensile Strength** (MPa)
- **Yield Strength** (MPa)
- **Hardness** (HB)
- **Corrosion Resistance** (Excellent/Good/Moderate)
- **Max Temperature** (°C)
- **Elongation** (%)

#### Action Required:
1. **Browse through applications** that match your needs
2. **Click on any material card** to:
   - View more details on MatWeb (external link)
   - Or continue to next step for detailed specification
3. **Click "Select Application"** button to proceed with data ingestion

---

### **STEP 3: Data Ingestion**
**Location:** `/data-ingestion`

#### What You'll See:
- **Upload Interface** for your specific requirements
- **Options to input:**
  - Operating temperature range
  - Pressure requirements
  - Corrosive environment details
  - Mechanical property requirements
  - Industry standards to comply with

#### Features:
- ✅ **Drag & Drop** file upload (specifications, drawings)
- ✅ **Manual Entry** for specific parameters
- ✅ **Template Selection** for common applications
- ✅ **Multi-file support** (PDF, Excel, Word)

#### Action Required:
1. **Upload your specification documents** (optional)
2. **Enter operating conditions:**
   - Temperature range
   - Pressure range
   - Chemical exposure
   - Required certifications
3. **Click "Process Data"** to analyze requirements

---

### **STEP 4: Processing & RAG Pipeline**
**Location:** `/processing`

#### What Happens (AI Processing):
The system performs intelligent analysis:

1. **Document Analysis**
   - Extracts key requirements from uploaded files
   - Identifies critical parameters
   
2. **RAG (Retrieval-Augmented Generation) Pipeline**
   - Searches ASTM A890 standard database
   - Matches your requirements with suitable grades
   - Considers all 8 available grades:
     - Grade 1A, 1B, 1C (Ferritic)
     - Grade 3A (Ferritic-Austenitic)
     - Grade 4A (Austenitic-Ferritic)
     - Grade 5A, 6A (Austenitic)
     - Grade 7A (High-Performance)

3. **AI Material Ranking**
   - Evaluates mechanical properties
   - Checks corrosion resistance
   - Validates temperature compatibility
   - Ensures weldability requirements

4. **Compliance Verification**
   - ASTM A890/A890M standard compliance
   - Referenced standards check (A781, A958, etc.)
   - Heat treatment requirements

#### What You'll See:
- **Processing Steps Visualization**
  - ⏳ Document parsing
  - ⏳ Feature extraction
  - ⏳ AI analysis
  - ⏳ Material matching
  - ✅ Complete
- **Progress indicators** for each step
- **Real-time status updates**

#### Time Required:
- Typically 5-15 seconds depending on document complexity

---

### **STEP 5: Material Results**
**Location:** `/material-results`

#### What You'll See:
**Recommended ASTM A890 Grades** ranked by suitability:

#### Example Output:
```
🥇 RANK 1: ASTM A890 Grade 5A (Austenitic)
   Match Score: 95%
   
   Key Properties:
   ✓ Tensile Strength: 485 MPa (min)
   ✓ Yield Strength: 275 MPa (min)
   ✓ Elongation: 20% (min)
   ✓ Max Service Temp: 425°C
   ✓ Corrosion Resistance: Excellent
   
   Applications:
   • Chemical processing equipment
   • Marine hardware
   • Pump and valve components

🥈 RANK 2: ASTM A890 Grade 6A (Austenitic)
   Match Score: 88%
   [Similar details...]

🥉 RANK 3: ASTM A890 Grade 4A (Austenitic-Ferritic)
   Match Score: 82%
   [Similar details...]
```

#### Available Actions:
- **View Full Specification** - Opens detailed A890 demo page
- **Download PDF Report** - Get material selection report
- **Compare Grades** - Side-by-side comparison
- **Chat with AI** - Ask specific questions

#### Action Required:
1. **Review recommended grades** and their match scores
2. **Click "View Full Specification"** for any grade
3. This navigates to the **ASTM A890 Demo Page**

---

### **STEP 6: ASTM A890 Demo Page (Final Output)**
**Location:** `/a890-demo`

#### Complete Standard Documentation:

### 📌 **Page Header**
- **Title:** ASTM A890/A890M - Cast Austenitic, Austenitic-Ferritic (Duplex), and Ferritic Stainless Steels
- **Scope:** For pressure-containing parts and general applications
- **Quick Navigation:** Download PDF, View Standard buttons

---

### 📊 **Section 1: Grades Overview**

8 clickable grade cards displayed in grid:

#### **Card 1: Grade 1A (Ferritic)**
- Chemical Composition: J91150
- Service Class: Moderate corrosion resistance
- Applications: General-purpose applications
- Temperature Range: Up to 260°C

#### **Card 2: Grade 1B (Ferritic)**
- Chemical Composition: J91151
- Enhanced corrosion resistance
- Marine environments
- Similar temperature range

#### **Card 3: Grade 1C (Ferritic)**
- Chemical Composition: J92972
- High-strength ferritic
- Structural applications

#### **Card 4: Grade 3A (Ferritic-Austenitic)**
- Chemical Composition: J92205
- Duplex structure
- Excellent strength + corrosion
- Up to 315°C

#### **Card 5: Grade 4A (Austenitic-Ferritic)**
- Chemical Composition: J92205
- Balanced properties
- Versatile applications
- Up to 316°C

#### **Card 6: Grade 5A (Austenitic)**
- Chemical Composition: J92600
- Superior corrosion resistance
- Chemical processing
- Up to 425°C

#### **Card 7: Grade 6A (Austenitic)**
- Chemical Composition: J92800
- Enhanced properties
- Critical applications
- Up to 425°C

#### **Card 8: Grade 7A (High-Performance)**
- Chemical Composition: Custom
- Premium grade
- Severe service conditions

---

### 📋 **Section 2: Detailed Tensile Requirements Table**

Complete table showing for EACH grade:

| Grade | Type | Tensile (MPa) | Yield (MPa) | Elongation (%) | Hardness (HB) |
|-------|------|---------------|-------------|----------------|---------------|
| 1A | Annealed | 515 min | 380 min | 12 min | 285 max |
| 1A | Solution Treated | 515 min | 380 min | 12 min | 285 max |
| 1B | Annealed | 515 min | 380 min | 15 min | 285 max |
| ... | ... | ... | ... | ... | ... |

**All 8 grades** with both heat treatment conditions where applicable.

**Properties Explained:**
- **Tensile Strength:** Maximum stress material can withstand while being stretched
- **Yield Strength:** Stress at which permanent deformation begins
- **Elongation:** Measure of ductility (% increase in length at break)
- **Hardness:** Resistance to indentation (Brinell Hardness scale)

---

### 🔥 **Section 3: Heat Treatment Requirements**

Detailed specifications for each grade:

#### **Grade 1A - Heat Treatment:**
```
Solution Treatment: Heat to 1900-2050°F (1040-1120°C)
Cooling: Rapid cool (water quench or air cool)
Purpose: Optimize corrosion resistance and mechanical properties
Post-treatment: Optional stress relief at 1200-1400°F
```

#### **Grade 5A - Heat Treatment:**
```
Solution Annealing: 1900-2100°F (1040-1150°C)
Soak Time: Minimum 1 hour per inch of thickness
Cooling: Rapid water quench
Purpose: Achieve austenitic structure
Final Hardness: 217 HB maximum
```

[Similar details for all 8 grades...]

---

### 📚 **Section 4: Referenced ASTM Standards**

Complete list of related standards:

- **ASTM A370** - Test Methods and Definitions for Mechanical Testing
- **ASTM A781** - Castings, Steel and Alloy, Common Requirements
- **ASTM A958** - Vacuum Treatment of Steel Castings
- **ASTM E8/E8M** - Tension Testing of Metallic Materials
- **ASTM E92** - Vickers Hardness Testing
- **ASTM E112** - Grain Size Determination
- **ASTM E709** - Magnetic Particle Examination
- **ASTM A488** - Steel Castings, Welding Qualifications

**Purpose:** These standards ensure:
- Proper testing procedures
- Quality control methods
- Manufacturing processes
- Inspection techniques

---

### 🏭 **Section 5: Manufacturing Process**

#### **Casting Process:**
1. **Melting** - AOD (Argon Oxygen Decarburization) or VAR (Vacuum Arc Remelting)
2. **Pouring** - Into sand or investment molds
3. **Solidification** - Controlled cooling
4. **Heat Treatment** - Per specification above
5. **Finishing** - Machining, grinding, polishing
6. **Inspection** - Per ASTM requirements
7. **Testing** - Mechanical, chemical, non-destructive

#### **Quality Control Checkpoints:**
- ✓ Chemical composition verification
- ✓ Mechanical property testing
- ✓ Dimensional inspection
- ✓ Surface finish verification
- ✓ Non-destructive testing (NDT)
- ✓ Pressure testing (if applicable)

---

### 🔍 **Section 6: Keywords & Applications**

#### **Primary Keywords:**
- Cast Stainless Steel
- Austenitic Stainless Steel
- Duplex Stainless Steel
- Ferritic Stainless Steel
- Corrosion Resistant Castings
- High Temperature Castings
- Pressure Vessel Components

#### **Typical Applications by Grade:**

**Grades 1A, 1B, 1C (Ferritic):**
- Automotive exhaust systems
- Heat exchangers (moderate temp)
- Decorative architectural elements
- Food processing equipment

**Grade 3A (Ferritic-Austenitic):**
- Marine hardware and fittings
- Chemical processing equipment
- Desalination plants
- Offshore platforms

**Grade 4A (Austenitic-Ferritic):**
- Pump bodies and impellers
- Valve bodies and trim
- Pipeline components
- Pulp and paper industry

**Grades 5A, 6A (Austenitic):**
- Chemical reactors
- Pharmaceutical equipment
- Heat exchangers (high temp)
- Nuclear power components

**Grade 7A (High-Performance):**
- Critical offshore applications
- Severe corrosive environments
- High-stress components
- Specialized industrial equipment

---

### 💼 **Section 7: Selection Guidance**

#### **When to Choose Grade 1A-1C (Ferritic):**
✅ Cost-effective solution needed
✅ Moderate corrosion resistance sufficient
✅ Operating temp < 260°C
✅ Magnetic properties acceptable
❌ NOT for: High chloride environments, high temps

#### **When to Choose Grade 3A/4A (Duplex):**
✅ Balance of strength and corrosion resistance
✅ Chloride-containing environments
✅ Stress corrosion cracking resistance needed
✅ Higher strength than austenitic grades
✅ Operating temp < 316°C
❌ NOT for: Very high temperatures (>316°C)

#### **When to Choose Grade 5A/6A (Austenitic):**
✅ Superior corrosion resistance required
✅ High temperature service (up to 425°C)
✅ Non-magnetic properties needed
✅ Excellent weldability
✅ Oxidizing environments
❌ NOT for: High chloride at elevated temp (pitting risk)

#### **When to Choose Grade 7A:**
✅ Most demanding applications
✅ Severe marine environments
✅ Critical safety components
✅ Budget allows for premium grade
❌ Consider cost vs. performance benefit

---

### 📥 **Section 8: Action Buttons**

At the bottom of the page:

1. **📄 Download Full PDF Specification**
   - Complete ASTM A890 standard document
   - Material data sheets for each grade
   - Selection guide and property tables

2. **🔗 View Official ASTM Standard**
   - Links to ASTM International website
   - Purchase full standard document
   - Access online standard database

3. **💬 Ask AI About This Material**
   - Open chat interface
   - Pre-loaded with A890 context
   - Ask specific questions about grades

4. **📊 Compare with Other Standards**
   - Compare with DIN, EN, ISO equivalents
   - Cross-reference table
   - Material substitution guide

---

## 🎓 Understanding Your Results

### **Match Score Explained:**
- **90-100%:** Excellent match, highly recommended
- **80-89%:** Good match, suitable for application
- **70-79%:** Acceptable match, consider alternatives
- **<70%:** Review requirements, may need different standard

### **Key Factors in Ranking:**
1. **Temperature Compatibility** (25%)
2. **Corrosion Resistance** (25%)
3. **Mechanical Properties** (20%)
4. **Cost-Effectiveness** (15%)
5. **Availability** (10%)
6. **Weldability** (5%)

---

## 🚀 Quick Navigation Shortcuts

### **From Any Page:**
- Click **"Home"** → Returns to landing page
- Click **"Applications"** → Go to app selection
- Click **"Analytics"** → View insights dashboard
- Click **"Chat"** → Open AI assistant

### **Direct URL Access:**
- Home: `http://localhost:5173/`
- Applications: `http://localhost:5173/app-selection`
- Data Ingestion: `http://localhost:5173/data-ingestion`
- Processing: `http://localhost:5173/processing`
- Results: `http://localhost:5173/material-results`
- **A890 Demo: `http://localhost:5173/a890-demo`** ⭐

---

## 💡 Pro Tips

### **Tip 1: Use AI Chat for Clarifications**
If unsure about any grade, click "Chat" and ask:
- "What's the difference between Grade 4A and 5A?"
- "Which grade is best for seawater at 200°C?"
- "Can Grade 1B be welded?"

### **Tip 2: Compare Multiple Grades**
Select 2-3 grades and use compare feature to see:
- Side-by-side property comparison
- Cost differential
- Availability timeline
- Fabrication considerations

### **Tip 3: Download Reports for Team Review**
Generate PDF reports including:
- Your specific requirements
- AI recommendations with justification
- Material datasheets
- Supplier information

### **Tip 4: Save Your Searches**
Create an account to:
- Save application configurations
- Track material selections
- View history of recommendations
- Set up alerts for new grades

---

## 🔧 Technical Support

### **Common Questions:**

**Q: Can I select multiple materials?**
A: Yes, the AI will rank all suitable grades. You can compare top 3-5 recommendations.

**Q: Are these real-time prices?**
A: Material properties are from ASTM standards. For pricing, contact suppliers listed in results.

**Q: How often is the database updated?**
A: ASTM standards database is synchronized quarterly. New amendments are added immediately.

**Q: Can I export to CAD/PLM systems?**
A: Yes, results can be exported in multiple formats (PDF, Excel, XML, JSON) compatible with major PLM platforms.

**Q: What if no perfect match found?**
A: AI will show closest matches with explanation of gaps. Chat can suggest alternatives from other standards (e.g., DIN, EN).

---

## 📞 Need Help?

- **AI Chat:** Fastest response, 24/7 available
- **Email Support:** support@materialassistant.com
- **Documentation:** [Full docs link]
- **Video Tutorials:** [Tutorial link]

---

## ✅ Workflow Summary

```
┌──────────────────────────────────────────────────────────────┐
│  COMPLETE A890 MATERIAL SELECTION WORKFLOW                   │
└──────────────────────────────────────────────────────────────┘

Step 1: HOME PAGE (/)
        └─> Click "Applications"

Step 2: APP SELECTION (/app-selection)
        └─> Browse applications
        └─> View material previews
        └─> Click "Select Application"

Step 3: DATA INGESTION (/data-ingestion)
        └─> Upload specs (optional)
        └─> Enter requirements
        └─> Click "Process Data"

Step 4: PROCESSING (/processing)
        └─> AI analyzes requirements
        └─> RAG pipeline matches materials
        └─> Automated (5-15 seconds)

Step 5: RESULTS (/material-results)
        └─> View ranked recommendations
        └─> See match scores
        └─> Click "View Full Specification"

Step 6: A890 DEMO PAGE (/a890-demo) ⭐
        └─> Complete standard documentation
        └─> All 8 grades detailed
        └─> Tensile properties tables
        └─> Heat treatment specs
        └─> Application guidance
        └─> Download/export options

OUTCOME: Informed material selection with full technical backing
```

---

## 🎯 Success Criteria

You've successfully completed the workflow when you:
- ✅ Identified suitable ASTM A890 grade(s)
- ✅ Understood mechanical properties
- ✅ Verified temperature/corrosion compatibility
- ✅ Reviewed heat treatment requirements
- ✅ Downloaded specification documents
- ✅ Ready to communicate with suppliers/fabricators

---

**Last Updated:** January 6, 2026
**Version:** 1.0
**Material Standard:** ASTM A890/A890M-2024

