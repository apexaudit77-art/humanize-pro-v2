
'use client';

interface SeoContentProps {
  config: {
    title: string;
    description: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
}

export function SeoContent({ config }: SeoContentProps) {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 md:py-20">
      <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 brand-mesh animate-gradient"></div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold font-headline text-primary">
            {config.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {config.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent">{config.feature1Title}</h3>
            <p className="text-muted-foreground">
              {config.feature1Description}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent">{config.feature2Title}</h3>
            <p className="text-muted-foreground">
              {config.feature2Description}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent">{config.feature3Title}</h3>
            <p className="text-muted-foreground">
              {config.feature3Description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
