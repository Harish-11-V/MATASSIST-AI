# Configuration Template

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ============================================
# SUPABASE CONFIGURATION (Required)
# ============================================
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here

# ============================================
# OPENAI API (Required for RAG & Chat)
# ============================================
VITE_OPENAI_API_KEY=sk-proj-...your-openai-key

# ============================================
# UNSTRUCTURED.IO (Required for PDF processing)
# ============================================
# Get your API key from: https://unstructured.io
UNSTRUCTURED_API_KEY=your-unstructured-api-key

# ============================================
# MATWEB API (Optional - for data enrichment)
# ============================================
# Get your API key from: https://www.matweb.com/api
MATWEB_API_KEY=your-matweb-api-key

# ============================================
# APPLICATION SETTINGS
# ============================================
VITE_APP_NAME=Material Assistant
VITE_APP_VERSION=2.0.0
```

## Supabase Edge Function Secrets

Set these secrets using Supabase CLI:

```bash
# Set OpenAI key
supabase secrets set OPENAI_API_KEY=sk-proj-...

# Set Unstructured.io key
supabase secrets set UNSTRUCTURED_API_KEY=your-key

# Set MatWeb key (optional)
supabase secrets set MATWEB_API_KEY=your-key

# Set Supabase keys
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
supabase secrets set SUPABASE_ANON_KEY=your-anon-key
```

## Material Suggestions Configuration

Edit `src/services/materialSuggestions.ts` to customize:

```typescript
// Number of suggestions to show
const MAX_SUGGESTIONS = 5;

// Cache duration (in milliseconds)
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// API timeout
const API_TIMEOUT = 5000; // 5 seconds
```

## Ranking Algorithm Configuration

Edit `src/services/materialRanking.ts` to customize weights:

```typescript
// Scoring weights (must sum to 1.0)
const WEIGHTS = {
  designRequirements: 0.35,  // 35%
  mechanicalProperties: 0.35, // 35%
  standards: 0.20,            // 20%
  costEfficiency: 0.10        // 10%
};

// Similarity threshold for matches
const MATCH_THRESHOLD = 0.78; // 0-1 scale

// Number of results to rank
const TOP_N = 3;
```

## RAG Pipeline Configuration

Edit `supabase/functions/unstructured-rag/index.ts`:

```typescript
// Chunk settings
const CHUNK_SIZE = 500;          // Characters per chunk
const CHUNK_OVERLAP = 50;        // Overlap between chunks

// Embedding model
const EMBEDDING_MODEL = 'text-embedding-ada-002';
const EMBEDDING_DIMENSIONS = 1536;

// Unstructured.io settings
const STRATEGY = 'hi_res';       // 'auto', 'fast', 'hi_res'
const INCLUDE_COORDINATES = true;
```

## Color Theme Configuration

Edit `src/index.css` for custom colors:

```css
:root {
  /* Rank colors */
  --rank-gold: 217 91% 60%;      /* #F59E0B */
  --rank-silver: 0 0% 45%;       /* #737373 */
  --rank-bronze: 24 70% 50%;     /* #C2410C */
  
  /* Score colors */
  --score-excellent: 142 76% 36%; /* Green */
  --score-good: 47 92% 50%;      /* Yellow */
  --score-fair: 24 70% 50%;      /* Orange */
  --score-poor: 0 84% 60%;       /* Red */
}
```

## Database Configuration

### Connection Pooling
```sql
-- In Supabase dashboard → Database → Settings
-- Set pool size based on expected load:
-- Small: 15 connections
-- Medium: 50 connections
-- Large: 100 connections
```

### Vector Index Configuration
```sql
-- Adjust IVFFlat lists parameter for your data size:
-- Small (<100k vectors): lists = 100
-- Medium (100k-1M): lists = 1000
-- Large (>1M): lists = 4000

CREATE INDEX document_chunks_embedding_idx 
ON document_chunks USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

## Performance Tuning

### Frontend Optimization
```typescript
// src/App.tsx - Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 minutes
      cacheTime: 1000 * 60 * 30,  // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Backend Optimization
```typescript
// Batch processing for large uploads
const BATCH_SIZE = 10;  // Process 10 chunks at a time
const PARALLEL_REQUESTS = 3;  // Max parallel API calls
```

## Feature Flags

Create `src/config/features.ts`:

```typescript
export const FEATURES = {
  // Enable/disable features
  enableWebSuggestions: true,
  enableRAGProcessing: true,
  enableGoogleScholar: true,
  enableMaterialRanking: true,
  
  // Beta features
  enableAdvancedFilters: false,
  enableRealtimeCollaboration: false,
  enablePDFReports: false,
  
  // Limits
  maxFileSize: 200 * 1024 * 1024, // 200MB
  maxFilesPerUpload: 10,
  maxConcurrentProcessing: 3,
};
```

## API Rate Limiting

### OpenAI
- Free tier: 3 requests/minute
- Paid tier: 3500 requests/minute
- Embeddings: 3000 requests/minute

### Unstructured.io
- Free tier: 1000 pages/month
- Starter: 10,000 pages/month
- Professional: 100,000 pages/month

### Supabase
- Free tier: 500MB database, 1GB storage
- Pro tier: 8GB database, 100GB storage

## Error Handling Configuration

```typescript
// src/config/errors.ts
export const ERROR_MESSAGES = {
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  PROCESSING_FAILED: 'Unable to process document. Check file format.',
  API_TIMEOUT: 'Request timed out. Please retry.',
  INSUFFICIENT_DATA: 'Not enough data to rank materials.',
  INVALID_INPUT: 'Invalid input values. Please check your entries.',
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,  // 1 second
  backoffMultiplier: 2,  // Exponential backoff
};
```

## Logging Configuration

```typescript
// src/config/logging.ts
export const LOGGING = {
  enabled: process.env.NODE_ENV === 'development',
  level: 'info',  // 'debug' | 'info' | 'warn' | 'error'
  logToConsole: true,
  logToFile: false,
  
  // What to log
  logApiCalls: true,
  logErrors: true,
  logPerformance: true,
};
```

## Security Configuration

```typescript
// Content Security Policy
const CSP = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", 'data:', 'https:'],
  connectSrc: [
    "'self'",
    'https://*.supabase.co',
    'https://api.openai.com',
    'https://api.unstructured.io',
  ],
};
```

## Backup Configuration

### Database Backups
```bash
# Manual backup
supabase db dump -f backup.sql

# Automated backups (set in Supabase dashboard)
# Daily backups: Enabled
# Retention: 7 days (free), 30 days (pro)
```

### Storage Backups
```bash
# Download all files
supabase storage download --bucket documents --recursive
```

## Monitoring Configuration

### Supabase Dashboard
- Enable logging: Settings → API → Enable logging
- Set log retention: 1 day (free), 7 days (pro)

### Error Tracking
```typescript
// Optional: Sentry integration
// npm install @sentry/react
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

## Development vs Production

### Development (.env.local)
```env
NODE_ENV=development
VITE_API_TIMEOUT=30000
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=debug
```

### Production (.env.production)
```env
NODE_ENV=production
VITE_API_TIMEOUT=10000
VITE_ENABLE_DEBUG=false
VITE_LOG_LEVEL=error
```

## Testing Configuration

```typescript
// vitest.config.ts
export default {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
};
```

---

## Quick Configuration Checklist

Before deployment, verify:

- [ ] All environment variables are set
- [ ] Supabase secrets are configured
- [ ] Database migrations are applied
- [ ] Storage buckets are created
- [ ] RLS policies are enabled
- [ ] API keys are valid
- [ ] Rate limits are appropriate
- [ ] Backup strategy is in place
- [ ] Monitoring is configured
- [ ] Error tracking is set up

---

**Configuration complete! Your Material Assistant is ready for production.** 🚀
