'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // This ensures the component only renders on the client, preventing hydration errors.
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setIsLoading(true);
    setIsDone(false);
    setProgress(0);

    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    const finishTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); 
    
    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 1700);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
      clearTimeout(doneTimer);
    }
  }, [pathname, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Top Loading Bar */}
      <div className={cn("fixed top-0 left-0 w-full h-[3px] z-[101] transition-opacity duration-300", 
        (isLoading || isDone) ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <div 
            className="h-full brand-mesh animate-gradient" 
            style={{ 
                width: `${progress}%`,
                transition: 'width 1s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: '0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--accent))'
            }}
        />
      </div>

      {/* Fullscreen Page Loader */}
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="relative animate-pulse">
          <Image
            src="/logo-icon.png"
            alt="Humanize AI Logo"
            width={80}
            height={80}
            priority
            className="rounded-2xl"
          />
          <div className="absolute -inset-4 brand-mesh rounded-full blur-3xl opacity-50 animate-gradient"></div>
        </div>
      </div>
    </>
  );
}
