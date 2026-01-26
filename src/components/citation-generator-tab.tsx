'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Book, Copy, Rss } from "lucide-react";

const citationStyles = ["APA", "MLA", "Chicago", "Harvard"];

interface CitationGeneratorTabProps {
  config: {
    title: string;
    description: string;
    card1Title: string;
    card1Description: string;
    linkLabel: string;
    linkPlaceholder: string;
    or: string;
    textLabel: string;
    textPlaceholder: string;
    extractButton: string;
    card2Title: string;
    card2Description: string;
    fieldArticleTitle: string;
    fieldAuthorName: string;
    fieldPublishDate: string;
    fieldWebsiteName: string;
    dataPlaceholder: string;
    card3Title: string;
    card3Description: string;
    styleLabel: string;
    stylePlaceholder: string;
    finalCitationPlaceholder: string;
  };
}

export function CitationGeneratorTab({ config }: CitationGeneratorTabProps) {
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [style, setStyle] = useState(citationStyles[0]);

  return (
     <section id="citation-generator" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
            {config.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
            {config.description}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Input Section */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>{config.card1Title}</CardTitle>
                    <CardDescription>{config.card1Description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="url-input" className="flex items-center gap-2"><Link className="w-4 h-4"/> {config.linkLabel}</Label>
                        <Input id="url-input" placeholder={config.linkPlaceholder} value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} disabled />
                    </div>
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">{config.or}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-input" className="flex items-center gap-2"><Book className="w-4 h-4"/> {config.textLabel}</Label>
                        <Textarea id="text-input" placeholder={config.textPlaceholder} className="min-h-[100px]" value={sourceText} onChange={e => setSourceText(e.target.value)} disabled />
                    </div>
                    <Button className="w-full !mt-8 text-lg relative overflow-hidden group" disabled>
                        <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                        <Rss className="mr-2 h-5 w-5" />
                        {config.extractButton}
                    </Button>
                </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-8">
                <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>{config.card2Title}</CardTitle>
                        <CardDescription>{config.card2Description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">{config.fieldArticleTitle}</p>
                            <p>{config.dataPlaceholder}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">{config.fieldAuthorName}</p>
                            <p>{config.dataPlaceholder}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">{config.fieldPublishDate}</p>
                            <p>{config.dataPlaceholder}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">{config.fieldWebsiteName}</p>
                            <p>{config.dataPlaceholder}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>{config.card3Title}</CardTitle>
                         <CardDescription>{config.card3Description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="style-select">{config.styleLabel}</Label>
                             <Select value={style} onValueChange={setStyle} disabled>
                                <SelectTrigger id="style-select">
                                    <SelectValue placeholder={config.stylePlaceholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {citationStyles.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Textarea
                            readOnly
                            value={config.finalCitationPlaceholder}
                            className="min-h-[100px] bg-muted/40 pr-12"
                            />
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" disabled>
                                <Copy className="h-5 w-5"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
  );
}
