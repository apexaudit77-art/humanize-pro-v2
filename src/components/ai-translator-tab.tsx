'use client';

import { useState } from 'react';
import {
  ArrowRightLeft,
  Copy,
  Languages,
  Loader2,
  Mic,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from './ui/label';

const languages = [
  'Detect Language',
  'English',
  'Arabic',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Hindi',
  'Russian',
  'Japanese',
  'Portuguese',
];

const tones = ['Formal', 'Creative', 'Academic', 'Colloquial'];

export function AiTranslatorTab() {
  const [sourceLang, setSourceLang] = useState(languages[0]);
  const [targetLang, setTargetLang] = useState(languages[1]);

  return (
    <section
      id="ai-translator"
      className="flex flex-col items-center justify-center py-8 md:py-12 w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
          مترجم الذكاء الاصطناعي: ترجمة ذكية تتجاوز المعاني الحرفية.
        </h1>
        <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
          استخدم قوة الذكاء الاصطناعي للحصول على ترجمة دقيقة تفهم السياق
          الثقافي واللغوي. ترجم نصوصك إلى أي لغة في العالم مع الحفاظ على النبرة
          والأسلوب المناسب.
        </p>
      </div>

      <Card className="w-full max-w-6xl bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
        <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Source Text Area */}
          <div className="flex flex-col gap-4">
            <Select value={sourceLang} onValueChange={setSourceLang} disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-grow">
              <Textarea
                placeholder="Enter text to translate..."
                className="min-h-[250px] sm:min-h-[300px] resize-none bg-background/50 rounded-xl shadow-inner border-dashed"
                disabled
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button variant="ghost" size="icon" disabled>
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Target Text Area */}
          <div className="flex flex-col gap-4">
            <Select value={targetLang} onValueChange={setTargetLang} disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages
                  .filter((l) => l !== 'Detect Language')
                  .map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="relative flex-grow">
              <Textarea
                placeholder="Translation will appear here..."
                readOnly
                className="min-h-[250px] sm:min-h-[300px] resize-none bg-muted/40 rounded-xl shadow-inner border-dashed"
                disabled
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button variant="ghost" size="icon" disabled>
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Controls */}
        <div className="p-4 sm:p-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" disabled>
              <ArrowRightLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Label htmlFor="tone-select">Tone:</Label>
              <Select defaultValue={tones[0]} disabled>
                <SelectTrigger
                  id="tone-select"
                  className="w-auto sm:w-[150px]"
                >
                  <SelectValue placeholder="Select Tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone} value={tone}>
                      {tone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="w-full sm:w-auto relative overflow-hidden group text-md py-5"
            size="lg"
            disabled
          >
            <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
            <Languages className="mr-2 h-5 w-5" />
            Translate (Coming Soon)
          </Button>
        </div>
      </Card>
    </section>
  );
}
