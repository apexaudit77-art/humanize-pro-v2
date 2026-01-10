export function BackgroundOrbs() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-radial-gradient from-accent/20 to-transparent to-70% rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-radial-gradient from-primary/20 to-transparent to-70% rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '3s' }}></div>
      <div className="absolute top-1/4 -right-1/3 w-1/3 h-1/3 bg-radial-gradient from-primary/10 to-transparent to-70% rounded-full blur-3xl animate-pulse" style={{ animationDuration: '14s', animationDelay: '5s' }}></div>
    </div>
  );
}
