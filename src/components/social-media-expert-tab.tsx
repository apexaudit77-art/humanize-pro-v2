
'use client';

import { useState } from 'react';
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Copy,
  CopyCheck,
  RefreshCcw,
  Sparkles,
  Loader2,
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
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const platforms = [
  { name: 'YouTube', icon: Youtube },
  { name: 'TikTok', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.28 7.43a2.1 2.1 0 0 0-1.87-1.42c-2.31-.2-4.63.15-6.9.15v6.5a2.07 2.07 0 0 1-2.19 2.07 2.13 2.13 0 0 1-2.19-2.18c0-1.2 1-2.18 2.2-2.18.23 0 .45.04.66.12v-3.5a5.53 5.53 0 1 0-5.69 5.56 5.33 5.33 0 0 0 5.69-5.46v-3.41c2.4-.3 4.8-.65 7.11-.35a5.3 5.3 0 0 1 4.28 5.16v.29a3.3 3.3 0 0 1-3.2 3.37 3.32 3.32 0 0 1-3.41-3.28V9.12c2.31 0 4.63-.35 6.95-.15a2.12 2.12 0 0 0 1.88-2.18v-.1a2.13 2.13 0 0 0-1.88-2.18Z"/></svg> },
  { name: 'Instagram', icon: Instagram },
  { name: 'X', icon: Twitter },
  { name: 'Facebook', icon: Facebook },
];

const OutputCard = ({ title, content, onCopy, onGenerateMore }: { title: string, content: string[], onCopy: () => void, onGenerateMore: () => void }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <div className="bg-muted/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <div className='flex gap-1'>
                    <Button variant="ghost" size="icon" onClick={onGenerateMore} disabled>
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleCopy} disabled>
                        {copied ? <CopyCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                {content.length > 0 ? content.map((item, index) => (
                    <p key={index} className="text-sm text-muted-foreground bg-background/50 p-2 rounded-md">{item}</p>
                )) : <p className="text-sm text-muted-foreground">سيتم إنشاء المحتوى هنا...</p>}
            </div>
        </div>
    );
}

export function SocialMediaExpertTab() {
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube');

  return (
    <section id="social-media-expert" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
          مساعدك الذكي لتصدر تريند السوشيال ميديا
        </h1>
        <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
          لا تشغل بالك بالبحث عن الهاشتاقات أو كتابة الوصف. اختر منصتك، ضع فكرتك، واحصل فوراً على عناوين جذابة وهاشتاقات وكلمات دلالية مجهزة بالذكاء الاصطناعي لزيادة مشاهداتك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Input Card */}
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>1. اختر المنصة والمحتوى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>اختر المنصة</Label>
              <ToggleGroup type="single" value={selectedPlatform} onValueChange={(value) => value && setSelectedPlatform(value)} className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2" disabled>
                {platforms.map(({ name, icon: Icon }) => (
                  <ToggleGroupItem key={name} value={name} aria-label={`Select ${name}`} className="h-16 flex-col gap-2">
                    <Icon className="h-6 w-6" />
                    <span className="text-xs">{name}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-description">وصف المحتوى</Label>
              <Textarea
                id="content-description"
                placeholder="مثال: فيديو عن أفضل 5 طرق لزيادة الإنتاجية في العمل"
                className="min-h-[150px] bg-background/50 rounded-xl shadow-inner border-dashed"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">كلمات مفتاحية (اختياري)</Label>
              <Input
                id="keywords"
                placeholder="إنتاجية, عمل, نصائح"
                disabled
              />
            </div>
            <Button
              className="w-full !mt-8 text-lg relative overflow-hidden group"
              disabled
            >
              <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
              <Sparkles className="mr-2 h-5 w-5" />
              توليد المحتوى (قريباً)
            </Button>
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>2. المحتوى المُحسَّن لخوارزمية <span className="text-primary">{selectedPlatform}</span></CardTitle>
                <CardDescription>
                هذه الاقتراحات تم توليدها خصيصاً لزيادة التفاعل.
                </CardDescription>
            </div>
            <Button variant="outline" disabled><Copy className="mr-2 h-4 w-4"/>نسخ الكل</Button>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OutputCard title="عناوين جذابة (Titles)" content={[]} onCopy={()=>{}} onGenerateMore={()=>{}} />
                <OutputCard title="وصف محسن (Description)" content={[]} onCopy={()=>{}} onGenerateMore={()=>{}} />
                <OutputCard title="هاشتاقات رائجة (Hashtags)" content={[]} onCopy={()=>{}} onGenerateMore={()=>{}} />
                <OutputCard title="علامات (Tags)" content={[]} onCopy={()=>{}} onGenerateMore={()=>{}} />
              </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
