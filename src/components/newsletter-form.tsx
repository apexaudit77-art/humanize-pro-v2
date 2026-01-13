'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/app/actions';
import { Loader2, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

const formSchema = z.object({
  email: z.string().email({ message: 'الرجاء إدخال بريد إلكتروني صالح.' }),
});

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await subscribeToNewsletter(values.email);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'تم الاشتراك بنجاح!',
        description: 'شكراً لانضمامك إلى نشرتنا الإخبارية.',
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'حدث خطأ',
        description: result.error,
      });
    }
  }

  return (
    <section className="w-full py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold font-headline text-primary mb-4">
          ابق على اطلاع دائم
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          انضم إلى نشرتنا الإخبارية للحصول على آخر التحديثات والنصائح حول المحتوى المدعوم بالذكاء الاصطناعي.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-4 max-w-lg mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني..."
                        className="pl-10 h-12 text-base"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto h-12 text-base">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                'اشترك الآن'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
