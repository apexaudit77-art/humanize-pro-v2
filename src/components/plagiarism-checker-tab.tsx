
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Search } from "lucide-react";

interface PlagiarismCheckerTabProps {
    config: {
        title: string;
        description: string;
        placeholder: string;
        wordCount: string;
        resultsPlaceholder: string;
        button: string;
        uploadButton: string;
    }
}

export function PlagiarismCheckerTab({ config }: PlagiarismCheckerTabProps) {
  return (
    <Card className="w-full bg-white/5 backdrop-blur-2xl border-white/10 shadow-lg h-full flex flex-col">
       <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">{config.title}</CardTitle>
          <CardDescription className="text-center">
            {config.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-4">
                <Textarea
                    placeholder={config.placeholder}
                    className="min-h-[200px] resize-y bg-background/50 rounded-xl shadow-inner border-dashed"
                    disabled
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{config.wordCount}: 0</span>
                </div>
            </div>
            
            <div className="text-center text-muted-foreground min-h-[160px] flex flex-col justify-center items-center">
                <p>{config.resultsPlaceholder}</p>
            </div>
          
            <div className="space-y-2">
                 <Button className="w-full relative overflow-hidden group text-md py-5" size="lg" disabled>
                    <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                    <Search className="mr-2 h-5 w-5" />
                    {config.button}
                </Button>
                <Button variant="outline" className="w-full" size="lg" disabled>
                    <FileUp className="mr-2 h-5 w-5" />
                    {config.uploadButton}
                </Button>
            </div>

        </CardContent>
    </Card>
  );
}

    