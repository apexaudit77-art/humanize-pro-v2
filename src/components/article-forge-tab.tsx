

'use client';

import { useState, useRef } from 'react';
import {
  Cpu,
  Stethoscope,
  Globe,
  Scroll,
  Briefcase,
  Heart,
  FileDown,
  Clipboard,
  Copy,
  Loader2,
  Disc,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateArticle } from '@/app/actions';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const categories = [
  { name: 'Sports', icon: <Disc className="w-5 h-5 mr-2" /> },
  { name: 'Tech', icon: <Cpu className="w-5 h-5 mr-2" /> },
  { name: 'Medical', icon: <Stethoscope className="w-5 h-5 mr-2" /> },
  { name: 'Discovery', icon: <Globe className="w-5 h-5 mr-2" /> },
  { name: 'History', icon: <Scroll className="w-5 h-5 mr-2" /> },
  { name: 'Business', icon: <Briefcase className="w-5 h-5 mr-2" /> },
  { name: 'Lifestyle', icon: <Heart className="w-5 h-5 mr-2" /> },
];

const writingStyles = ['Fun/Casual', 'Professional/Academic', 'Colloquial/Slang'];
const languages = ['English', 'Arabic', 'Spanish', 'Chinese', 'Hindi', 'Russian'];
const useCases = ['SEO-Optimized Article', 'Social Media Post'];

interface ArticleForgeTabProps {
    config: {
        title: string;
        description: string;
        settingsTitle: string;
        settingsDescription: string;
        topicLabel: string;
        topicPlaceholder: string;
        categoryLabel: string;
        categoryPlaceholder: string;
        styleLabel: string;
        stylePlaceholder: string;
        languageLabel: string;
        languagePlaceholder: string;
        useCaseLabel: string;
        button: string;
        loading: string;
        outputTitle: string;
        outputDescription: string;
        outputPlaceholder: string;
    }
}


export function ArticleForgeTab({ config }: ArticleForgeTabProps) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [writingStyle, setWritingStyle] = useState(writingStyles[0]);
  const [useCase, setUseCase] = useState(useCases[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a topic.',
      });
      return;
    }
    setIsLoading(true);
    setResult('');

    const response = await generateArticle({
      topic,
      category,
      writingStyle,
      useCase,
      language,
    });

    setIsLoading(false);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Failed to generate article.',
      });
    }
  };

  const handleCopyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${topic.replace(/\s+/g, '_')}.pdf`);
    }
  };

  return (
    <>
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline bg-clip-text text-transparent brand-mesh animate-gradient [text-shadow:var(--text-glow-primary)]">{config.title}</h2>
        <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground md:text-lg">{config.description}</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start py-6">
      <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl border-border/50 shadow-lg transition-all duration-300 hover:backdrop-blur-md">
        <CardHeader>
          <CardTitle>{config.settingsTitle}</CardTitle>
          <CardDescription>
            {config.settingsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">{config.topicLabel}</Label>
            <Input
              id="topic"
              placeholder={config.topicPlaceholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>{config.categoryLabel}</Label>
            <Select value={category} onValueChange={setCategory} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder={config.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    <div className="flex items-center">
                      {cat.icon}
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{config.styleLabel}</Label>
            <Select value={writingStyle} onValueChange={setWritingStyle} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder={config.stylePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {writingStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{config.languageLabel}</Label>
            <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder={config.languagePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>{config.useCaseLabel}</Label>
            <RadioGroup
              value={useCase}
              onValueChange={setUseCase}
              className="flex flex-col space-y-1"
              disabled={isLoading}
            >
              {useCases.map((uc) => (
                <div key={uc} className="flex items-center space-x-2">
                  <RadioGroupItem value={uc} id={uc} />
                  <Label htmlFor={uc}>{uc}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full !mt-8 text-lg relative overflow-hidden group brand-mesh text-primary-foreground shadow-glow hover:scale-105 transition-transform duration-300 hover:animate-pulse-glow"
          >
             <span className="absolute inset-0 brand-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"></span>
            <span className="relative flex items-center justify-center">
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {config.loading}
                </>
                ) : (
                <>
                    {config.button}
                </>
                )}
            </span>
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card className="h-full bg-card/60 backdrop-blur-xl border-border/50 shadow-lg transition-all duration-300 hover:backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>{config.outputTitle}</CardTitle>
              <CardDescription>
                {config.outputDescription}
              </CardDescription>
            </div>
            {result && !isLoading && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <Clipboard className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownloadPdf}
                >
                  <FileDown className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4 pt-4 min-h-[400px] flex flex-col items-center justify-center">
                  <div className="space-y-2">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="text-center text-muted-foreground">Processing AI Patterns...</p>
                  </div>
              </div>
            ) : (
              <div
                ref={resultRef}
                className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 min-h-[400px] rounded-md border border-dashed border-border bg-muted/30 p-6 mt-4"
                dangerouslySetInnerHTML={{
                  __html:
                    result ||
                    `<p>${config.outputPlaceholder}</p>`,
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
