# Quick Start Guide - Material Assistant Add-Ons

## 🎯 What's New?

Your Material Assistant now has powerful new features:

1. ✅ **Smart Material Suggestions** - AI-powered recommendations when selecting applications
2. ✅ **Multi-Stage Analysis** - 4-stage workflow for precise material selection
3. ✅ **RAG Pipeline** - Extract material data from PDFs using Unstructured.io
4. ✅ **Intelligent Ranking** - Color-coded top 3 materials based on your requirements
5. ✅ **Download Reports** - Export results in CSV and Text formats
6. ✅ **Enhanced Chat** - Google Scholar links for academic research

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Environment Variables

Create or update your `.env` file:

```env
# Existing
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# New - Required for RAG features
VITE_OPENAI_API_KEY=sk-...your-openai-key
```

### Step 2: Database Setup

1. Go to your Supabase project dashboard
2. Click "SQL Editor"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run it
5. Wait for "Success" message

### Step 3: Deploy Edge Function (Optional - for PDF processing)

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the RAG function
supabase functions deploy unstructured-rag

# Set secrets
supabase secrets set UNSTRUCTURED_API_KEY=your_unstructured_key
supabase secrets set OPENAI_API_KEY=your_openai_key
```

**Note:** PDF processing with RAG requires an Unstructured.io API key. Get one at https://unstructured.io

### Step 4: Run the Application

```bash
npm install
npm run dev
```

---

## 🎮 How to Use the New Features

### Feature 1: Material Suggestions

1. Navigate to `/app-selection`
2. Click on any application (Cryogenic, Subsea, or Oil & Gas)
3. **Instantly see** top 5 materials with:
   - Material Family
   - Grade
   - Key Properties (Tensile, Yield, Hardness, etc.)

### Feature 2: Multi-Stage Analysis

**Complete workflow:**

1. **Stage 1**: Select Application
2. **Stage 2**: Enter Design Requirements
   - Temperature (°C): e.g., `-196`
   - Pressure (psi): e.g., `3000`
   - Stress (MPa): e.g., `150`
3. **Stage 3**: Enter Mechanical Properties
   - Tensile Strength (MPa): e.g., `485`
   - Yield Strength (MPa): e.g., `170`
   - Hardness (HB): e.g., `217`
4. **Stage 4**: Select Standards
   - Check: ASTM ✓, ISO ✓, EN, DIN
5. **Click "Run Analysis"**

### Feature 3: View Ranked Results

After clicking "Run Analysis", you'll see:

- **🥇 Rank 1** (Gold): Best match
- **🥈 Rank 2** (Silver): Strong alternative
- **🥉 Rank 3** (Bronze): Good option

Each material shows:
- Overall Score (0-100)
- Score breakdown (Design, Mechanical, Standards, Cost)
- AI recommendation

### Feature 4: Download Reports

On the results page, click:
- **Download CSV**: For Excel/spreadsheet analysis
- **Download Text**: For documentation

### Feature 5: Upload PDF (with RAG)

1. Go to `/data-ingestion`
2. Upload material specification PDF
3. System automatically:
   - Extracts text using Unstructured.io
   - Identifies material properties
   - Stores in database
   - Generates embeddings for RAG
   - Exports to CSV and text

**Supported formats:** PDF, TXT, CSV (max 200MB)

### Feature 6: Enhanced Chat

1. Go to `/chat`
2. Ask questions like:
   - "What's the best material for -196°C?"
   - "Compare 316L vs Inconel 625"
3. Below each response, click:
   - **Google**: General search
   - **Scholar**: Academic papers ✨ NEW
   - **MatWeb**: Material database

---

## 🔧 Configuration Options

### Customize Material Database

Edit `src/services/materialSuggestions.ts` to add more materials:

```typescript
const MATERIAL_DATABASE: Record<string, MaterialSuggestion[]> = {
  cryogenic: [
    {
      materialFamily: "Your Material Family",
      grade: "Your Grade",
      keyProperties: {
        tensileStrength: "500 MPa",
        yieldStrength: "250 MPa",
        // ... more properties
      }
    }
  ]
};
```

### Adjust Ranking Weights

Edit `src/services/materialRanking.ts`:

```typescript
// Current weights
const overallScore = (
  designScore * 0.35 +      // 35% weight
  mechanicalScore * 0.35 +  // 35% weight
  standardsScore * 0.20 +   // 20% weight
  costScore * 0.10          // 10% weight
);
```

---

## 📱 Testing the Features

### Test 1: Material Suggestions
- Go to `/app-selection`
- Select "Cryogenic Applications"
- Should see 5 materials with properties

### Test 2: Complete Analysis
- Enter Stage 2 data: `-196°C, 3000 psi, 150 MPa`
- Enter Stage 3 data: `485 MPa, 170 MPa, 217 HB`
- Select Stage 4: `ASTM ✓, ISO ✓`
- Click "Run Analysis"
- Should see 3 ranked materials

### Test 3: Downloads
- On results page, click "Download CSV"
- File should download as `material-recommendations-{timestamp}.csv`
- Open in Excel to verify data

### Test 4: Chat Links
- Go to `/chat`
- Send a message
- Click "Scholar" link
- Should open Google Scholar in new tab

---

## ⚠️ Troubleshooting

### Issue: Material suggestions not loading
**Fix:** Check browser console for errors. Ensure `materialSuggestions.ts` is imported correctly.

### Issue: "Missing Data" error on results page
**Fix:** Complete all stages (2-4) before clicking "Run Analysis"

### Issue: Download not working
**Fix:** Check browser's download settings and popup blocker

### Issue: Google Scholar link broken
**Fix:** Verify URL encoding in `Chat.tsx` line with `scholar.google.com`

### Issue: Database tables not found
**Fix:** Run the SQL migration file in Supabase SQL Editor

---

## 🎨 Customization

### Change Color Coding

Edit `src/services/materialRanking.ts`:

```typescript
const rankColors = [
  { 
    color: 'text-yellow-600',   // Rank 1
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-400'
  },
  // ... change colors here
];
```

### Add More Stages

Edit `src/pages/MultiStageMenu.tsx`:

```typescript
const [currentStage, setCurrentStage] = useState(2);
// Change to: useState(2) through useState(5) for 5 stages
```

---

## 📊 Data Format Examples

### CSV Export Format
```
Rank,Material Family,Grade,Overall Score,...
1,Nickel-Chromium Alloy,Inconel 625,92,...
```

### Text Export Format
```
RANK 1 - Nickel-Chromium Alloy Inconel 625
Overall Score: 92/100
Detailed Scores:
  • Design Requirements: 95/100
  ...
```

---

## 🎓 Learning Resources

- **Unstructured.io Docs**: https://unstructured-io.github.io/unstructured/
- **Supabase Vector Search**: https://supabase.com/docs/guides/ai
- **OpenAI Embeddings**: https://platform.openai.com/docs/guides/embeddings

---

## 💡 Tips & Best Practices

1. **Material Suggestions**: Load quickly by caching in `material_cache` table
2. **RAG Processing**: Process PDFs in batches to manage API costs
3. **Ranking**: Test with various inputs to validate algorithm
4. **Downloads**: Include timestamp in filenames for organization
5. **Chat**: Use specific material names for better Scholar results

---

## 🤝 Support

Need help? Check:
1. Browser console (F12) for errors
2. Supabase logs for backend errors
3. `ADD_ONS_README.md` for detailed documentation
4. Network tab to verify API calls

---

## ✅ Verification Checklist

- [ ] Material suggestions appear on app selection
- [ ] All 4 stages navigate correctly
- [ ] Results page shows 3 ranked materials
- [ ] CSV download works
- [ ] Text download works
- [ ] Google Scholar link opens
- [ ] Database has 4 built-in materials
- [ ] Chat shows 3 reference links

---

**Ready to go!** Your Material Assistant is now enhanced with powerful AI-driven features. 🚀

Start at: `http://localhost:5173/app-selection`
