

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SidebarNav } from '@/components/sidebar-nav';
import { MobileHeader } from '@/components/mobile-header';
import {
  DraftingCompass,
  Cpu,
  Search,
  FileText,
  SpellCheck,
  BarChart,
  FileJson,
  BookMarked,
  Languages,
  Layout,
  ThumbsUp,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { NavItem } from '@/lib/types';
import { HumanizerTab } from '../humanizer-tab';
import { ArticleForgeTab } from '../article-forge-tab';
import { AiDetectorTab } from '../ai-detector-tab';
import { PlagiarismCheckerTab } from '../plagiarism-checker-tab';
import { GrammarCheckerTab } from '../grammar-checker-tab';
import { SeoToolsTab } from '../seo-tools-tab';
import { DocumentAnalyzerTab } from '../document-analyzer-tab';
import { CitationGeneratorTab } from '../citation-generator-tab';
import { AiTranslatorTab } from '../ai-translator-tab';
import { ArticleFormatterTab } from '../article-formatter-tab';
import { SocialMediaExpertTab } from '../social-media-expert-tab';
import { FeatureCards } from '../feature-cards';
import { Separator } from './separator';
import Link from 'next/link';
import { AuthMenu } from '../auth-menu';
import { ThemeToggle } from '../theme-toggle';
import { GlobalLanguageSwitcher } from '../global-language-switcher';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import Image from 'next/image';
import { SeoContent } from '../seo-content';
import { AuthGuard } from '../auth-guard';
import { NewsletterForm } from '../newsletter-form';

interface SidebarProps {
  lang: string;
  dir: 'ltr' | 'rtl';
  config: any;
}

const Footer = () => (
    <footer className="w-full py-8 text-center text-sm text-muted-foreground border-t border-border/10">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
            <p>&copy; {new Date().getFullYear()} HumanizeAI Pro. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                 <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                 <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                 <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                 <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
        </div>
    </footer>
);


export function Sidebar({ lang, dir, config }: SidebarProps) {
  const navItems: NavItem[] = [
    {
      id: 'humanizer',
      href: '#humanizer',
      icon: DraftingCompass,
      label: config.nav.humanizer,
    },
    {
      id: 'article-forge',
      href: '#article-forge',
      icon: Cpu,
      label: config.nav.articleForge,
    },
    {
      id: 'article-formatter',
      href: '#article-formatter',
      icon: Layout,
      label: config.nav.articleFormatter,
    },
    {
      id: 'social-media-expert',
      href: '#social-media-expert',
      icon: ThumbsUp,
      label: config.nav.socialMediaExpert,
    },
    {
      id: 'document-analyzer',
      href: '#document-analyzer',
      icon: FileJson,
      label: config.nav.documentAnalyzer,
    },
    {
      id: 'ai-detector',
      href: '#ai-detector',
      icon: Search,
      label: config.nav.aiDetector,
    },
    {
      id: 'plagiarism-checker',
      href: '#plagiarism-checker',
      icon: FileText,
      label: config.nav.plagiarismChecker,
    },
    {
      id: 'grammar-checker',
      href: '#grammar-checker',
      icon: SpellCheck,
      label: config.nav.grammarChecker,
    },
    {
      id: 'seo-suite',
      href: '#seo-suite',
      icon: BarChart,
      label: config.nav.seoSuite,
    },
    {
      id: 'citation-generator',
      href: '#citation-generator',
      icon: BookMarked,
      label: config.nav.citationGenerator,
    },
    {
      id: 'ai-translator',
      href: '#ai-translator',
      icon: Languages,
      label: config.nav.aiTranslator,
    },
  ];

  const [activeSection, setActiveSection] = React.useState(navItems[0].id);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'humanizer':
        return (
          <section
            id="humanizer"
            className="flex flex-col justify-center min-h-screen relative overflow-hidden py-12 md:py-24 transition-all duration-300"
          >
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent brand-mesh animate-gradient [text-shadow:var(--text-glow-primary)] transition-all duration-300">
                {config.mainContent.welcomeTitle}
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl transition-all duration-300"></p>
            </div>
            <div className="mt-8 md:mt-12 transition-all duration-300 relative z-10">
              <HumanizerTab config={config.humanizerTab} />
            </div>
          </section>
        );
      case 'article-forge':
        return (
          <section
            id="article-forge"
            className="flex flex-col justify-center min-h-screen transition-all duration-300"
          >
            <ArticleForgeTab config={config.articleForgeTab} />
          </section>
        );
      case 'article-formatter':
        return (
          <section
            id="article-formatter"
            className="min-h-screen transition-all duration-300"
          >
            <ArticleFormatterTab />
          </section>
        );
      case 'document-analyzer':
        return (
          <section
            id="document-analyzer"
            className="min-h-screen transition-all duration-300"
          >
            <DocumentAnalyzerTab />
          </section>
        );
      case 'ai-detector':
        return (
          <section
            id="ai-detector"
            className="flex flex-col justify-center min-h-screen transition-all duration-300"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline bg-clip-text text-transparent brand-mesh animate-gradient [text-shadow:var(--text-glow-primary)]">
                {config.mainContent.verificationSuiteTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground md:text-lg">
                {config.mainContent.verificationSuiteDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AiDetectorTab config={config.aiDetectorTab} />
              <PlagiarismCheckerTab config={config.plagiarismCheckerTab} />
            </div>
          </section>
        );
      case 'plagiarism-checker':
        return (
          <section
            id="plagiarism-checker"
            className="flex flex-col justify-center min-h-screen transition-all duration-300"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline bg-clip-text text-transparent brand-mesh animate-gradient [text-shadow:var(--text-glow-primary)]">
                {config.mainContent.verificationSuiteTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground md:text-lg">
                {config.mainContent.verificationSuiteDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AiDetectorTab config={config.aiDetectorTab} />
              <PlagiarismCheckerTab config={config.plagiarismCheckerTab} />
            </div>
          </section>
        );
      case 'seo-suite':
        return (
          <section
            id="seo-suite"
            className="flex flex-col justify-center min-h-screen transition-all duration-300"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline bg-clip-text text-transparent brand-mesh animate-gradient [text-shadow:var(--text-glow-primary)]">
                {config.mainContent.seoSuiteTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground md:text-lg">
                {config.mainContent.seoSuiteDescription}
              </p>
            </div>
            <div className="max-w-4xl mx-auto w-full">
              <SeoToolsTab config={config.seoToolsTab} />
            </div>
          </section>
        );
      case 'grammar-checker':
        return (
          <section
            id="grammar-checker"
            className="min-h-screen transition-all duration-300"
          >
            <GrammarCheckerTab />
          </section>
        );
      case 'citation-generator':
        return (
          <section
            id="citation-generator"
            className="min-h-screen transition-all duration-300"
          >
            <CitationGeneratorTab />
          </section>
        );
      case 'ai-translator':
        return (
          <section
            id="ai-translator"
            className="min-h-screen transition-all duration-300"
          >
            <AiTranslatorTab />
          </section>
        );
      case 'social-media-expert':
        return (
          <section
            id="social-media-expert"
            className="min-h-screen transition-all duration-300"
          >
            <SocialMediaExpertTab />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className={cn(
          'grid min-h-screen w-full transition-grid-template-columns duration-300 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]',
          isCollapsed && 'md:grid-cols-[80px_1fr]',
          dir === 'rtl' &&
            'md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]',
          dir === 'rtl' && isCollapsed && 'md:grid-cols-[1fr_80px]'
        )}
      >
        <div
          className={cn(
            'hidden border-r bg-muted/20 md:flex flex-col',
            dir === 'rtl' && 'border-l border-r-0'
          )}
        >
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-16 items-center border-b border-border/10 px-4 lg:h-[60px] lg:px-6">
              <Link
                href={`/`}
                className={cn(
                  'flex items-center gap-2 font-semibold',
                  isCollapsed && 'justify-center w-full'
                )}
              >
                {isCollapsed ? (
                  <Image
                    src="/assets/logo-icon.png"
                    alt="Humanize AI Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                    priority
                  />
                ) : (
                  <Image
                    src="/assets/logo-main.png"
                    alt="Humanize AI Logo"
                    width={160}
                    height={40}
                    priority
                    style={{ objectFit: 'contain', aspectRatio: '160 / 40' }}
                  />
                )}
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarNav
                lang={lang}
                navItems={navItems}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                isCollapsed={isCollapsed}
              />
            </div>
            <div className="mt-auto p-4 space-y-2 border-t border-border/10">
              <div
                className={cn(
                  'flex items-center gap-2',
                  isCollapsed ? 'flex-col' : 'flex-row justify-center'
                )}
              >
                <AuthMenu />
                <ThemeToggle />
                <GlobalLanguageSwitcher />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-full mt-2 hidden md:flex"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  dir === 'rtl' ? (
                    <ChevronsLeft />
                  ) : (
                    <ChevronsRight />
                  )
                ) : dir === 'rtl' ? (
                  <ChevronsRight />
                ) : (
                  <ChevronsLeft />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className={cn('flex flex-col', dir === 'rtl' && 'order-first')}>
          <MobileHeader
            navItems={navItems}
            lang={lang}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <main className="flex-1 w-full flex flex-col items-center p-4 sm:p-6 md:p-8 space-y-16 md:space-y-24 overflow-auto">
            {renderContent()}
            <Separator className="my-12 bg-border/10" />
            <FeatureCards />
            <Separator className="my-12 bg-border/10" />
            <SeoContent config={config.seoContent} />
            <NewsletterForm />
            <Footer />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
