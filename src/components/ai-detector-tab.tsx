

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { detectText } from '@/app/actions';
import { Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Link from 'next/link';

const detectionEngines = [
  'GPTZero',
  'Copyleaks',
  'ZeroGPT',
  'Crossplag',
  'Sapling',
];

interface AiDetectorTabProps {
    config: {
        title: string;
        description: string;
        placeholder: string;
        wordCount: string;
        button: string;
        loading: string;
        resultsPlaceholder: string;
        analyzing: string;
        humanScore: string;
        advice: {
            good: string;
            medium: string;
            bad: string;
        };
        enginesTitle: string;
    }
}

export function AiDetectorTab({ config }: AiDetectorTabProps) {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [engineStatus, setEngineStatus] = useState<Record<string, 'loading' | 'done'>>({});
  const { toast } = useToast();

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [text]);

  const handleScan = async () => {
    if (wordCount < 100) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter at least 100 words for an accurate detection.',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    // Simulate engine loading
    const newEngineStatus: Record<string, 'loading' | 'done'> = {};
    detectionEngines.forEach(engine => {
      newEngineStatus[engine] = 'loading';
    });
    setEngineStatus(newEngineStatus);

    const interval = setInterval(() => {
      setEngineStatus(prev => {
        const loadingEngines = Object.keys(prev).filter(k => prev[k] === 'loading');
        if (loadingEngines.length > 0) {
          const nextEngine = loadingEngines[0];
          return { ...prev, [nextEngine]: 'done' };
        }
        return prev;
      });
    }, 500);

    const response = await detectText(text);
    
    clearInterval(interval);
    setIsLoading(false);
    
    setEngineStatus(prev => {
        const finalStatus: Record<string, 'loading' | 'done'> = {};
        Object.keys(prev).forEach(k => finalStatus[k] = 'done');
        return finalStatus;
    });

    if (response.success && response.data) {
      setResult(response.data.humanScore);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Failed to detect AI content.',
      });
    }
  };
  
  const scoreColor = useMemo(() => {
    if (result === null) return 'hsl(var(--muted-foreground))';
    if (result >= 80) return 'hsl(var(--chart-2))'; // Green
    if (result >= 40) return 'hsl(var(--chart-5))'; // Yellow
    return 'hsl(var(--destructive))'; // Red
  }, [result]);

  const chartData = useMemo(() => {
    const humanScore = result ?? 0;
    const aiScore = 100 - humanScore;
    return [
      { name: 'Human', value: humanScore },
      { name: 'AI', value: aiScore },
    ];
  }, [result]);
  
  const getAdvice = () => {
    if (result === null) return null;
    if (result >= 80) {
        return (
            <p className="text-sm text-green-500">
                {config.advice.good}
            </p>
        );
    }
    if (result >= 40) {
        return (
            <p className="text-sm text-yellow-500">
                {config.advice.medium}
            </p>
        );
    }
    return (
        <p className="text-sm text-red-500">
            {config.advice.bad.split('Humanizer Tool')[0]}
            <Link href="/en/humanize-ai" className="underline font-bold hover:text-primary">
                Humanizer Tool
            </Link>
            {config.advice.bad.split('Humanizer Tool')[1]}
        </p>
    );
  };


  return (
    <Card className="w-full bg-white/5 backdrop-blur-2xl border-white/10 shadow-lg h-full flex flex-col transition-all duration-300 hover:backdrop-blur-md">
       <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">{config.title}</CardTitle>
            <CardDescription className="text-center">{config.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-4 relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 rounded-md flex items-center justify-center">
                        <div className="h-1 w-full brand-mesh animate-gradient"></div>
                    </div>
                )}
                <Textarea
                    placeholder={config.placeholder}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] resize-y text-base p-4 bg-background/50 rounded-xl shadow-inner border-dashed"
                    disabled={isLoading}
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{config.wordCount}: {wordCount}</span>
                </div>
            </div>
            
            {result !== null ? (
                <div className="text-center mt-4">
                    <div className="w-32 h-32 mx-auto relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={chartData} dataKey="value" innerRadius={40} outerRadius={55} startAngle={90} endAngle={450} paddingAngle={2} cornerRadius={5}>
                                    <Cell fill={scoreColor} />
                                    <Cell fill="hsl(var(--muted))" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold" style={{ color: scoreColor }}>{result}%</span>
                            <span className="text-xs text-muted-foreground">{config.humanScore}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        {getAdvice()}
                    </div>
                </div>
            ) : (
                 <div className="text-center text-muted-foreground min-h-[160px] flex flex-col justify-center items-center">
                    <p>{isLoading ? config.analyzing : config.resultsPlaceholder}</p>
                </div>
            )}

            <Button onClick={handleScan} disabled={isLoading || wordCount < 100} className="w-full mt-4 relative overflow-hidden group text-md py-5 brand-mesh text-primary-foreground shadow-glow hover:scale-105 transition-transform duration-300 hover:animate-pulse-glow">
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

            <div className="mt-4 border-t border-border/20 pt-4">
                <h4 className="text-center text-sm font-semibold text-muted-foreground mb-3">{config.enginesTitle}</h4>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {detectionEngines.map(engine => (
                        <div key={engine} className="flex items-center gap-2">
                            {engineStatus[engine] === 'loading' && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                            {engineStatus[engine] === 'done' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {!engineStatus[engine] && <RefreshCw className="h-4 w-4 text-muted-foreground" />}
                            <span className="text-muted-foreground">{engine}</span>
                        </div>
                    ))}
                </div>
            </div>

        </CardContent>
    </Card>
  );
}
