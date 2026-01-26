'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, FileDown, Layout, ListTree } from 'lucide-react';

interface ArticleFormatterTabProps {
  config: {
    title: string;
    description: string;
    card1Title: string;
    card1Description: string;
    draftLabel: string;
    draftPlaceholder: string;
    goalLabel: string;
    goalPlaceholder: string;
    formatButton: string;
    card2Title: string;
    card2Description: string;
    outputPlaceholder: string;
  };
}

export function ArticleFormatterTab({ config }: ArticleFormatterTabProps) {
  return (
    <section
      id="article-formatter"
      className="flex flex-col items-center justify-center py-8 md:py-12 w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
          {config.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
          {config.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Input Card */}
        <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>{config.card1Title}</CardTitle>
            <CardDescription>
              {config.card1Description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="draft-input">
                {config.draftLabel}
              </Label>
              <Textarea
                id="draft-input"
                placeholder={config.draftPlaceholder}
                className="min-h-[250px] bg-background/50 rounded-xl shadow-inner border-dashed"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyword-input">
                {config.goalLabel}
              </Label>
              <Input
                id="keyword-input"
                placeholder={config.goalPlaceholder}
                disabled
              />
            </div>
            <Button
              className="w-full !mt-8 text-lg relative overflow-hidden group"
              disabled
            >
              <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
              <ListTree className="mr-2 h-5 w-5" />
              {config.formatButton}
            </Button>
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{config.card2Title}</CardTitle>
              <CardDescription>
                {config.card2Description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" disabled>
                <Copy className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <FileDown className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 min-h-[400px] rounded-md border border-dashed border-border bg-muted/30 p-6">
              <p>{config.outputPlaceholder}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
