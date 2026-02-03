export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <img 
                src="/lt-logo.png" 
                alt="L&T Technology Services" 
                className="h-4 w-4 object-contain"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              Material Assistant • L&T Technology Services
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;