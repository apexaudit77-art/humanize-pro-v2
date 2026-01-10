'use client';

import { Zap, Globe, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';

const features = [
  {
    icon: (
      <Zap className="h-8 w-8 text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform group-hover:-translate-y-1" />
    ),
    title: 'Blazing Fast',
    description:
      'Our AI models are optimized for speed, delivering results in seconds, not minutes.',
  },
  {
    icon: (
      <Globe className="h-8 w-8 text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform group-hover:-translate-y-1" />
    ),
    title: 'Multi-Language Support',
    description:
      'Humanize text, generate articles, and check content in multiple languages with ease.',
  },
  {
    icon: (
      <Lock className="h-8 w-8 text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 transform group-hover:-translate-y-1" />
    ),
    title: 'Privacy Focused',
    description:
      "We don't save your data. Your content is yours, and yours alone. All processing is secure.",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="group bg-white/5 backdrop-blur-2xl border-white/10 shadow-lg text-center transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
        >
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              {feature.icon}
            </div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
