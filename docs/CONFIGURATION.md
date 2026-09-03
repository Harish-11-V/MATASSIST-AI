# Configuration Reference

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ============================================
# AI API KEYS
# ============================================

# OpenAI — used for AI-powered property filling and embeddings (optional)
# Get from: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=sk-proj-...your-openai-key

# Gemini — used for AI chat and material intelligence
# Get from: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your-gemini-key

# ============================================
# UNSTRUCTURED.IO (optional — for PDF parsing)
# ============================================
# Get from: https://unstructured.io
VITE_UNSTRUCTURED_API_KEY=your-unstructured-api-key

# ============================================
# APPLICATION SETTINGS
# ============================================
VITE_APP_NAME=Material Assistant
VITE_APP_VERSION=2.0.0
```

> **Note:** Supabase has been completely removed. The app runs fully in demo/local mode
> with no backend required. All data is managed client-side or via direct API calls.

---

## Material Suggestions Configuration

Edit `src/services/materialSuggestions.ts` to customise:

```typescript
// Number of suggestions to show
const MAX_SUGGESTIONS = 5;

// Cache duration (in milliseconds) — stored in localStorage
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// API timeout
const API_TIMEOUT = 5000; // 5 seconds
```

---

## Ranking Algorithm Configuration

Edit `src/services/materialRanking.ts` to customise weights:

```typescript
// Scoring weights (must sum to 1.0)
const WEIGHTS = {
  designRequirements: 0.35,   // 35%
  mechanicalProperties: 0.35, // 35%
  standards: 0.20,            // 20%
  costEfficiency: 0.10        // 10%
};

// Similarity threshold for matches
const MATCH_THRESHOLD = 0.78; // 0–1 scale

// Number of results to rank
const TOP_N = 3;
```

---

## Color Theme Configuration

Edit `src/index.css` for custom colours:

```css
:root {
  /* Rank colors */
  --rank-gold:   217 91% 60%;  /* #F59E0B */
  --rank-silver: 0 0% 45%;     /* #737373 */
  --rank-bronze: 24 70% 50%;   /* #C2410C */

  /* Score colors */
  --score-excellent: 142 76% 36%; /* Green  */
  --score-good:       47 92% 50%; /* Yellow */
  --score-fair:       24 70% 50%; /* Orange */
  --score-poor:        0 84% 60%; /* Red    */
}
```

---

## Performance Tuning

### Frontend Optimisation
```typescript
// src/App.tsx — configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes
      gcTime:    1000 * 60 * 30,       // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## Feature Flags

Create `src/config/features.ts`:

```typescript
export const FEATURES = {
  enableWebSuggestions:    true,
  enableRAGProcessing:     true,
  enableGoogleScholar:     true,
  enableMaterialRanking:   true,

  // Beta features
  enableAdvancedFilters:        false,
  enableRealtimeCollaboration:  false,
  enablePDFReports:             false,

  // Limits
  maxFileSize:            200 * 1024 * 1024, // 200 MB
  maxFilesPerUpload:      10,
  maxConcurrentProcessing: 3,
};
```

---

## API Rate Limits

| Service          | Free Tier                           |
|------------------|-------------------------------------|
| OpenAI           | 3 req/min (500k tokens/day)         |
| Unstructured.io  | 1,000 pages/month                   |
| Gemini           | 15 req/min (1M tokens/day)          |

---

## Error Handling Configuration

```typescript
// src/config/errors.ts
export const ERROR_MESSAGES = {
  UPLOAD_FAILED:      'File upload failed. Please try again.',
  PROCESSING_FAILED:  'Unable to process document. Check file format.',
  API_TIMEOUT:        'Request timed out. Please retry.',
  INSUFFICIENT_DATA:  'Not enough data to rank materials.',
  INVALID_INPUT:      'Invalid input values. Please check your entries.',
};

export const RETRY_CONFIG = {
  maxRetries:        3,
  retryDelay:        1000, // 1 second
  backoffMultiplier: 2,    // Exponential backoff
};
```

---

## Development vs Production

### Development (`.env.local`)
```env
NODE_ENV=development
VITE_API_TIMEOUT=30000
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=debug
```

### Production (`.env.production`)
```env
NODE_ENV=production
VITE_API_TIMEOUT=10000
VITE_ENABLE_DEBUG=false
VITE_LOG_LEVEL=error
```

---

## Quick Configuration Checklist

Before deployment, verify:

- [ ] Optional AI API keys are set (`VITE_OPENAI_API_KEY`, `VITE_GEMINI_API_KEY`)
- [ ] App builds with `npm run build` (zero errors)
- [ ] Dev server starts with `npm run dev`

---

**Configuration complete! Material Assistant is ready for production.** 🚀
