# Material Assistant - Add-On Features Implementation Guide

## 🎯 Overview

This document outlines the comprehensive add-on features implemented in the Material Assistant application. All existing features and UI remain unchanged - these are pure additions.

---

## ✨ New Features Implemented

### 1. **Enhanced Application Selection with Web-Sourced Material Suggestions**

#### Location: [`src/pages/AppSelection.tsx`](src/pages/AppSelection.tsx)

**Features:**
- When selecting an application (Cryogenic, Subsea, Oil & Gas), the system now automatically suggests top materials
- Materials are displayed with:
  - Material Family
  - Material Grade
  - Key Properties (Tensile Strength, Yield Strength, Hardness, Corrosion Resistance, Temperature Range)
- Data is fetched from [`src/services/materialSuggestions.ts`](src/services/materialSuggestions.ts)
- Loading states with skeleton screens
- Numbered ranking (#1, #2, #3, etc.)

**How it works:**
```typescript
// Automatically loads when application is selected
useEffect(() => {
  if (selectedApp) {
    loadMaterialSuggestions(selectedApp);
  }
}, [selectedApp]);
```

---

### 2. **Multi-Stage Menu System (Stage 2-4)**

#### Location: [`src/pages/MultiStageMenu.tsx`](src/pages/MultiStageMenu.tsx)

**Workflow:**
1. **Stage 1**: Application Selection (existing)
2. **Stage 2**: Design Input Requirements (NEW)
   - Temperature (°C)
   - Pressure (psi)
   - Stress (MPa)
3. **Stage 3**: Key Mechanical Properties (NEW)
   - Tensile Strength (MPa)
   - Yield Strength (MPa)
   - Hardness (HB)
4. **Stage 4**: Standards Selection (NEW)
   - ASTM
   - ISO
   - EN
   - DIN

**Features:**
- Visual progress indicator showing current stage
- Form validation at each stage
- Data persistence in sessionStorage
- Navigation between stages
- "Run Analysis" button at final stage

**Data Flow:**
```
AppSelection → DataIngestion → MultiStageMenu → MaterialResults
```

---

### 3. **RAG Pipeline Integration with Unstructured.io**

#### Location: [`supabase/functions/unstructured-rag/index.ts`](supabase/functions/unstructured-rag/index.ts)

**Pipeline Steps:**
1. Upload PDF to Supabase Storage
2. Extract text and structure using Unstructured.io API
3. Parse material properties from extracted content
4. Enrich missing data via web APIs
5. Generate embeddings using OpenAI ada-002
6. Store chunks in vector database (pgvector)
7. Export to CSV and text format

**Key Features:**
- High-resolution extraction with coordinates
- Pattern matching for material grades (316L, API 5L X65, etc.)
- Property extraction (tensile, yield, hardness, temperature, corrosion)
- Automatic data enrichment for missing properties
- Vector search capabilities for RAG

**API Integration:**
```typescript
// Unstructured.io extraction
const formData = new FormData()
formData.append('files', fileBlob, fileName)
formData.append('strategy', 'hi_res')
formData.append('coordinates', 'true')
```

---

### 4. **Database Schema and Updates**

#### Location: [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql)

**New Tables:**

1. **`documents`**: Stores uploaded PDFs with extraction status
2. **`document_chunks`**: RAG chunks with vector embeddings
3. **`materials`**: Material properties database
4. **`material_cache`**: Cached web suggestions
5. **`analysis_results`**: Saved analysis results

**Built-in Materials:**
- 4 pre-loaded materials (316L SS, 9% Ni Steel, Inconel 625, Duplex 2205)
- Used for initial analytics and recommendations

**Vector Search Function:**
```sql
create function match_documents (
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.78
)
```

---

### 5. **Material Ranking System with Color Coding**

#### Location: [`src/services/materialRanking.ts`](src/services/materialRanking.ts)

**Ranking Algorithm:**
- **Design Requirements Score (35% weight)**
  - Temperature compatibility
  - Pressure capacity
  - Stress handling
  
- **Mechanical Properties Score (35% weight)**
  - Tensile strength vs requirements
  - Yield strength vs requirements
  - Hardness vs requirements
  
- **Standards Compliance Score (20% weight)**
  - ASTM, ISO, EN, DIN matching
  
- **Cost Efficiency Score (10% weight)**
  - Material family cost mapping

**Color Coding:**
- **Rank 1** 🥇: Gold/Yellow (Best Match)
- **Rank 2** 🥈: Silver/Gray (Strong Alternative)
- **Rank 3** 🥉: Bronze/Orange (Good Option)

**Results Display:** [`src/pages/MaterialResults.tsx`](src/pages/MaterialResults.tsx)
- Large rank badges with icons
- Overall score (0-100)
- Score breakdown bars
- Personalized recommendations

---

### 6. **Download Functionality**

#### Features:
- **CSV Export**: Structured data with all scores
- **Text Export**: Formatted report with detailed breakdown

**Usage:**
```typescript
// CSV Export
const csv = exportToCSV(rankedMaterials);
// Creates: material-recommendations-{timestamp}.csv

// Text Export
const text = exportToText(rankedMaterials);
// Creates: material-recommendations-{timestamp}.txt
```

**File Formats:**

**CSV:**
```csv
Rank,Material Family,Grade,Overall Score,Design Score,Mechanical Score,Standards Score,Cost Score,Recommendation
1,Nickel-Chromium Alloy,Inconel 625,92,95,98,85,30,"Excellent match..."
```

**Text:**
```
================================================================================
MATERIAL RECOMMENDATION REPORT
Generated: 12/22/2025, 10:30:00 AM
================================================================================

RANK 1 - Nickel-Chromium Alloy Inconel 625
--------------------------------------------------------------------------------
Overall Score: 92/100

Detailed Scores:
  • Design Requirements: 95/100
  • Mechanical Properties: 98/100
  • Standards Compliance: 85/100
  • Cost Efficiency: 30/100

Recommendation: Excellent match - Inconel 625 exceeds all requirements...
```

---

### 7. **Google Scholar Links in Chat**

#### Location: [`src/pages/Chat.tsx`](src/pages/Chat.tsx)

**Enhancement:**
- Added Google Scholar link alongside existing Google and MatWeb links
- All links are dynamically generated from message content
- Opens in new tab with proper query parameters

**Link Generation:**
```typescript
// Google
https://www.google.com/search?q={message + ' material properties'}

// Google Scholar (NEW)
https://scholar.google.com/scholar?q={message + ' material engineering'}

// MatWeb
https://www.matweb.com/search/QuickText.aspx?SearchText={message}
```

---

## 🚀 Setup Instructions

### Prerequisites

1. **Supabase Account**
   - Project URL
   - Anon Key
   - Service Role Key

2. **API Keys Required:**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   UNSTRUCTURED_API_KEY=your_unstructured_key
   OPENAI_API_KEY=your_openai_key
   MATWEB_API_KEY=your_matweb_key (optional)
   ```

### Installation Steps

1. **Database Setup:**
   ```bash
   # Run the SQL migration in Supabase SQL Editor
   # File: supabase/migrations/001_initial_schema.sql
   ```

2. **Deploy Edge Functions:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login
   supabase login

   # Deploy RAG function
   supabase functions deploy unstructured-rag

   # Set secrets
   supabase secrets set UNSTRUCTURED_API_KEY=your_key
   supabase secrets set OPENAI_API_KEY=your_key
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 📊 Complete User Flow

```
1. Home Page
   ↓
2. App Selection (Choose: Cryogenic/Subsea/Oil & Gas)
   → AI suggests top 5 materials with properties
   ↓
3. Data Ingestion
   → Upload PDF documents
   → Automatic RAG processing with Unstructured.io
   → Extract material properties
   → Store in database & vector DB
   ↓
4. Multi-Stage Menu
   → Stage 2: Input temperature, pressure, stress
   → Stage 3: Input tensile, yield, hardness requirements
   → Stage 4: Select standards (ASTM, ISO, EN, DIN)
   → Click "Run Analysis"
   ↓
5. Material Results
   → View top 3 ranked materials with color coding
   → See detailed score breakdowns
   → Download CSV/Text reports
   ↓
6. Analytics (Updated with new materials)
   → Charts include uploaded materials
   ↓
7. Chat (Enhanced with Google Scholar)
   → Ask questions about materials
   → Get AI responses with reference links
```

---

## 🛠️ Technical Architecture

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Shadcn/UI** components
- **Tailwind CSS** for styling
- **React Query** for API state management

### Backend
- **Supabase** (PostgreSQL + Auth + Storage + Functions)
- **pgvector** extension for vector similarity search
- **OpenAI** for embeddings and chat
- **Unstructured.io** for PDF extraction

### Data Flow
```
PDF Upload → Supabase Storage
           → Unstructured.io (extraction)
           → Pattern matching (properties)
           → OpenAI (embeddings)
           → pgvector (storage)
           → Frontend (display)
```

---

## 📝 API Endpoints

### Supabase Edge Functions

1. **`/unstructured-rag`**
   - Processes PDF with RAG pipeline
   - Returns: `{ documentId, materialsExtracted, exportFiles }`

2. **`/matbot-chat`** (existing)
   - Handles AI chat with RAG context
   - Returns: Streaming response

### Example Usage

```typescript
// Process PDF with RAG
const { data, error } = await supabase.functions.invoke('unstructured-rag', {
  body: {
    fileUrl: 'storage/path/to/file.pdf',
    fileName: 'material_spec.pdf',
    userId: user.id,
    application: 'cryogenic'
  }
});

// Search documents with RAG
const { data: matches } = await supabase.rpc('match_documents', {
  query_embedding: embedding,
  match_count: 5,
  match_threshold: 0.78
});
```

---

## 🎨 UI Components

### New Components
1. **MaterialResults** - Ranked materials display
2. **MultiStageMenu** - 4-stage requirement input
3. Enhanced **AppSelection** - With material suggestions

### Styling
- Color-coded rank badges
- Progress bars for scores
- Animated transitions
- Responsive design
- Dark mode support

---

## 🔐 Security

- **Row Level Security (RLS)** on all tables
- Users can only access their own documents
- Built-in materials are public (read-only)
- Service role for admin operations
- Secure API key storage in environment variables

---

## 🧪 Testing Checklist

- [ ] Application selection loads material suggestions
- [ ] All 4 stages of multi-stage menu work
- [ ] PDF upload triggers RAG processing
- [ ] Materials are extracted correctly
- [ ] Ranking algorithm produces correct results
- [ ] CSV download works
- [ ] Text download works
- [ ] Google Scholar links work
- [ ] Chat shows all 3 reference links
- [ ] Database updates with new materials
- [ ] Analytics reflects new data

---

## 📈 Performance Optimization

- Material suggestions cached in `material_cache` table
- Vector index (IVFFlat) for fast similarity search
- Lazy loading of components
- Debounced API calls
- Parallel processing where possible

---

## 🐛 Troubleshooting

### Issue: Unstructured.io API failing
**Solution:** Check API key and rate limits. Use fallback text extraction.

### Issue: Materials not ranking correctly
**Solution:** Verify input data formats match expected units (MPa, psi, °C, HB)

### Issue: Google Scholar links not working
**Solution:** Check URL encoding and query parameter formatting

### Issue: Database connection errors
**Solution:** Verify Supabase credentials and RLS policies

---

## 🚀 Future Enhancements

1. **Real-time Collaboration**: Multiple users on same analysis
2. **Advanced Filters**: Filter materials by multiple criteria
3. **PDF Report Generation**: Generate complete PDF reports
4. **API Integration**: Connect to more material databases
5. **Machine Learning**: Improve ranking with ML models
6. **Mobile App**: React Native version

---

## 📞 Support

For issues or questions:
- Check console logs for detailed error messages
- Verify all API keys are configured
- Ensure database migrations are applied
- Review Supabase function logs

---

## 📄 License

All new features follow the existing project license.

---

**Last Updated:** December 22, 2025
**Version:** 2.0.0 (Add-On Features Release)
