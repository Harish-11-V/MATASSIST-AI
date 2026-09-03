// Supabase removed — no-op shim so all import paths continue to resolve.
// The app runs in demo mode; no real auth or database is needed.

export const supabase = {
  auth: {
    onAuthStateChange: (
      _cb: (event: string, session: null) => void
    ): { data: { subscription: { unsubscribe: () => void } } } => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    getSession: async (): Promise<{ data: { session: null } }> => ({
      data: { session: null },
    }),
    signInWithPassword: async (
      _credentials: { email: string; password: string }
    ): Promise<{ data: unknown; error: null }> => ({ data: null, error: null }),
    signUp: async (
      _credentials: { email: string; password: string; options?: unknown }
    ): Promise<{ data: unknown; error: null }> => ({ data: null, error: null }),
    signOut: async (): Promise<void> => {},
  },
  from: (_table: string) => ({
    upsert: async (
      _row: unknown
    ): Promise<{ error: null }> => ({ error: null }),
  }),
};