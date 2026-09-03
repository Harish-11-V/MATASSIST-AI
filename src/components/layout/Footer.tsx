export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary">
              <img 
                src="/Mlogo.png" 
                alt="MatAssist AI" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              Material Assistant • MatAssist AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;