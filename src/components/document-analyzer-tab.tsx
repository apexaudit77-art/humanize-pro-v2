'use client';

import { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Languages,
  MessageSquare,
  BrainCircuit,
  Loader2,
  Copy,
  FileDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export function DocumentAnalyzerTab() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      // Handle non-PDF files if needed
      alert('Please upload a PDF file.');
    }
  };

  const AnalysisResultCard = ({ title, children, ctaButtons }: { title: string, children: React.ReactNode, ctaButtons: React.ReactNode }) => (
    <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg transition-all duration-300 flex-1">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
             <h3 className="font-headline text-lg text-white/80">{title}</h3>
             {ctaButtons}
        </div>
        <CardContent className="p-6">
            {children}
        </CardContent>
    </Card>
  );

  return (
    <section id="document-analyzer" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
          محلل المستندات الشامل
        </h1>
        <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
          أداة واحدة تغنيك عن عشرات المواقع. ارفع ملف الـ PDF الخاص بك الآن للدردشة معه، تلخيصه، ترجمته، أو تحويله إلى خريطة ذهنية مبتكرة في ثوانٍ.
        </p>
      </div>

      {!fileName ? (
        <Card
          className="w-full max-w-3xl bg-card/50 backdrop-blur-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <CardContent className="p-8 text-center relative">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                <UploadCloud className="h-16 w-16 text-primary animate-pulse" />
              </div>
              <p className="text-xl font-semibold text-foreground">
                اسحب وأفلت ملف PDF هنا أو انقر للاختيار
              </p>
              <p className="text-muted-foreground">
                (بحد أقصى 10 ميجابايت)
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-5xl space-y-8">
          {isUploading && (
            <div className="w-full max-w-md mx-auto space-y-3 text-center">
              <p className="font-semibold text-lg">جاري رفع: {fileName}</p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
            </div>
          )}

          {!isUploading && (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">تم رفع المستند بنجاح!</h2>
                    <p className="text-muted-foreground mt-2">اختر الإجراء الذي تريد تطبيقه على: <span className="font-semibold text-primary">{fileName}</span></p>
                </div>

              {/* Action Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button variant="outline" size="lg" disabled className="h-auto py-4 flex flex-col gap-2">
                    <FileText className="w-8 h-8" />
                    <span className="font-semibold">تحويل إلى مقال</span>
                    <span className="text-xs font-normal text-muted-foreground">قريباً</span>
                </Button>
                <Button variant="outline" size="lg" disabled className="h-auto py-4 flex flex-col gap-2">
                    <BrainCircuit className="w-8 h-8" />
                    <span className="font-semibold">تلخيص ذكي</span>
                     <span className="text-xs font-normal text-muted-foreground">قريباً</span>
                </Button>
                 <Button variant="outline" size="lg" disabled className="h-auto py-4 flex flex-col gap-2">
                    <Languages className="w-8 h-8" />
                    <span className="font-semibold">ترجمة فورية</span>
                     <span className="text-xs font-normal text-muted-foreground">قريباً</span>
                </Button>
              </div>

               <div className="flex flex-col lg:flex-row gap-8">
                {/* Chat with PDF */}
                <AnalysisResultCard 
                    title="الدردشة مع المستند"
                    ctaButtons={
                        <div className="text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded-md">قريباً</div>
                    }
                >
                    <div className="space-y-4">
                        <div className="min-h-[200px] flex-grow rounded-md border border-dashed border-border p-4 bg-muted/30 text-muted-foreground flex items-center justify-center">
                            ستظهر محادثتك هنا
                        </div>
                        <div className="flex gap-2">
                            <input type="text" placeholder="اطرح سؤالاً عن محتوى الملف..." className="flex-grow bg-background/50 rounded-md px-3 border border-input" disabled />
                            <Button disabled>إرسال</Button>
                        </div>
                    </div>
                </AnalysisResultCard>

                {/* Mind Map */}
                 <AnalysisResultCard 
                    title="توليد خريطة ذهنية"
                     ctaButtons={
                         <Button variant="outline" size="sm" disabled>
                            <BrainCircuit className="w-4 h-4 mr-2" />
                            توليد (قريباً)
                        </Button>
                    }
                >
                    <div className="min-h-[250px] flex items-center justify-center rounded-md border border-dashed border-border bg-muted/30">
                        <p className="text-muted-foreground">ستظهر الخريطة الذهنية هنا</p>
                    </div>
                </AnalysisResultCard>
               </div>

            </div>
          )}
        </div>
      )}
    </section>
  );
}
