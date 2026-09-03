import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, User, Home, Layers, BarChart3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Applications", path: "/app-selection", icon: Layers },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "AI Chat", path: "/chat", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary">
            <img 
              src="/Mlogo.png" 
              alt="MatAssist AI" 
              className="h-16 w-16 object-contain brightness-110 contrast-125 drop-shadow-sm"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">MatBOT AI</h1>
            <p className="text-xs text-muted-foreground">MatAssist AI</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button 
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"} 
              size="sm" 
              className={`text-foreground hover:bg-muted gap-2 ${isActive(item.path) ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.email?.split('@')[0]}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}