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

export function CitationGeneratorTab() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [style, setStyle] = useState(citationStyles[0]);

  return (
     <section id="citation-generator" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
            مولد استشهادات ومراجع ذكي لجميع مصادرك
            </h1>
            <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
            وثّق مصادرك في ثوانٍ. ضع رابط المقال، الفيديو، أو النص، وسيقوم نظامنا باستخراج كافة المعلومات وتنسيقها لك وفق معايير APA و MLA العالمية.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Input Section */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>1. أدخل المصدر</CardTitle>
                    <CardDescription>الصق رابطاً أو نصاً لتحليله.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="url-input" className="flex items-center gap-2"><Link className="w-4 h-4"/> رابط المصدر (URL)</Label>
                        <Input id="url-input" placeholder="https://example.com/article" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} disabled />
                    </div>
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">أو</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="text-input" className="flex items-center gap-2"><Book className="w-4 h-4"/> لصق نص مقتبس</Label>
                        <Textarea id="text-input" placeholder="اقتباس من المصدر..." className="min-h-[100px]" value={sourceText} onChange={e => setSourceText(e.target.value)} disabled />
                    </div>
                    <Button className="w-full !mt-8 text-lg relative overflow-hidden group" disabled>
                        <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                        <Rss className="mr-2 h-5 w-5" />
                        استخراج البيانات (قريباً)
                    </Button>
                </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-8">
                <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>2. بيانات المصدر المستخرجة</CardTitle>
                        <CardDescription>تأكد من صحة البيانات قبل إنشاء الاستشهاد.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">عنوان المقال</p>
                            <p>في انتظار الإدخال...</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">اسم الكاتب</p>
                            <p>في انتظار الإدخال...</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">تاريخ النشر</p>
                            <p>في انتظار الإدخال...</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">اسم الموقع</p>
                            <p>في انتظار الإدخال...</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>3. الاستشهاد النهائي</CardTitle>
                         <CardDescription>جاهز للنسخ واللصق في بحثك.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="style-select">اختر تنسيق المرجع</Label>
                             <Select value={style} onValueChange={setStyle} disabled>
                                <SelectTrigger id="style-select">
                                    <SelectValue placeholder="اختر التنسيق" />
                                </SelectTrigger>
                                <SelectContent>
                                    {citationStyles.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Textarea
                            readOnly
                            value="سيظهر المرجع المنسق هنا..."
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
