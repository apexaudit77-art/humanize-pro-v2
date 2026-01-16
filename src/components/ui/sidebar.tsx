
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SidebarNav } from "@/components/sidebar-nav";
import { MobileHeader } from "@/components/mobile-header";
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
  Mail,
  X,
  Loader2,
} from "lucide-react";
import type { NavItem } from "@/lib/types";
import { HumanizerTab } from "../humanizer-tab";
import { ArticleForgeTab } from "../article-forge-tab";
import { AiDetectorTab } from "../ai-detector-tab";
import { PlagiarismCheckerTab } from "../plagiarism-checker-tab";
import { GrammarCheckerTab } from "../grammar-checker-tab";
import { SeoToolsTab } from "../seo-tools-tab";
import { DocumentAnalyzerTab } from "../document-analyzer-tab";
import { CitationGeneratorTab } from "../citation-generator-tab";
import { AiTranslatorTab } from "../ai-translator-tab";
import { ArticleFormatterTab } from "../article-formatter-tab";
import { SocialMediaExpertTab } from "../social-media-expert-tab";
import { FeatureCards } from "../feature-cards";
import { Separator } from "./separator";
import Link from "next/link";
import { AuthMenu } from "../auth-menu";
import { ThemeToggle } from "../theme-toggle";
import { GlobalLanguageSwitcher } from "../global-language-switcher";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import Image from "next/image";
import { SeoContent } from "../seo-content";
import { NewsletterForm } from "../newsletter-form";
import { useUser, useAuth } from "@/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./dialog";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const Footer = () => (
  <footer className="w-full py-8 text-sm text-muted-foreground border-t border-border/10">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-icon.png"
          alt="Humanize AI Icon"
          width={32}
          height={32}
          className="rounded-md"
        />
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} HumanizeAI Pro. All rights reserved.
        </p>
      </div>
      <div className="flex gap-4 md:gap-6 flex-wrap justify-center md:justify-end">
        <Link href="/about" className="hover:text-primary transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
        <Link href="/privacy" className="hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-primary transition-colors">
          Terms of Service
        </Link>
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <Link href="/pricing" className="hover:text-primary transition-colors">
          Pricing
        </Link>
        <Link href="/faq" className="hover:text-primary transition-colors">
          FAQ
        </Link>
        <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
          Sitemap
        </Link>
      </div>
    </div>
  </footer>
);

const GoogleIcon = () => (
  <svg
    className="mr-3 h-5 w-5"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.65-3.317-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.686,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export function Sidebar({ lang, dir, config }) {
  const navItems: NavItem[] = [
    {
      id: "humanizer",
      href: "#humanizer",
      icon: DraftingCompass,
      label: config.nav.humanizer,
    },
    {
      id: "article-forge",
      href: "#article-forge",
      icon: Cpu,
      label: config.nav.articleForge,
    },
    {
      id: "article-formatter",
      href: "#article-formatter",
      icon: Layout,
      label: config.nav.articleFormatter,
    },
    {
      id: "social-media-expert",
      href: "#social-media-expert",
      icon: ThumbsUp,
      label: config.nav.socialMediaExpert,
    },
    {
      id: "document-analyzer",
      href: "#document-analyzer",
      icon: FileJson,
      label: config.nav.documentAnalyzer,
    },
    {
      id: "ai-detector",
      href: "#ai-detector",
      icon: Search,
      label: config.nav.aiDetector,
    },
    {
      id: "plagiarism-checker",
      href: "#plagiarism-checker",
      icon: FileText,
      label: config.nav.plagiarismChecker,
    },
    {
      id: "grammar-checker",
      href: "#grammar-checker",
      icon: SpellCheck,
      label: config.nav.grammarChecker,
    },
    {
      id: "seo-suite",
      href: "#seo-suite",
      icon: BarChart,
      label: config.nav.seoSuite,
    },
    {
      id: "citation-generator",
      href: "#citation-generator",
      icon: BookMarked,
      label: config.nav.citationGenerator,
    },
    {
      id: "ai-translator",
      href: "#ai-translator",
      icon: Languages,
      label: config.nav.aiTranslator,
    },
  ];

  const [activeSection, setActiveSection] = React.useState(navItems[0].id);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleGoogleSignIn() {
    if (!auth) return;
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Signed in with Google successfully!" });
      setShowLoginModal(false);
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error.message,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const handleSectionChange = (sectionId: string) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "humanizer":
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
              <HumanizerTab
                config={config.humanizerTab}
                setShowLoginModal={setShowLoginModal}
              />
            </div>
          </section>
        );
      case "article-forge":
        return (
          <section
            id="article-forge"
            className="flex flex-col justify-center min-h-screen transition-all duration-300"
          >
            <ArticleForgeTab config={config.articleForgeTab} />
          </section>
        );
      case "article-formatter":
        return (
          <section
            id="article-formatter"
            className="min-h-screen transition-all duration-300"
          >
            <ArticleFormatterTab />
          </section>
        );
      case "document-analyzer":
        return (
          <section
            id="document-analyzer"
            className="min-h-screen transition-all duration-300"
          >
            <DocumentAnalyzerTab />
          </section>
        );
      case "ai-detector":
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
      case "plagiarism-checker":
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
      case "seo-suite":
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
      case "grammar-checker":
        return (
          <section
            id="grammar-checker"
            className="min-h-screen transition-all duration-300"
          >
            <GrammarCheckerTab />
          </section>
        );
      case "citation-generator":
        return (
          <section
            id="citation-generator"
            className="min-h-screen transition-all duration-300"
          >
            <CitationGeneratorTab />
          </section>
        );
      case "ai-translator":
        return (
          <section
            id="ai-translator"
            className="min-h-screen transition-all duration-300"
          >
            <AiTranslatorTab />
          </section>
        );
      case "social-media-expert":
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
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-lg border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline text-center">
              {config.loginModal.title}
            </DialogTitle>
            <DialogDescription className="text-center text-lg pt-2 text-muted-foreground">
              {config.loginModal.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 text-lg"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {config.loginModal.googleButton}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {config.loginModal.or}
                </span>
              </div>
            </div>
            <Button asChild variant="secondary" className="w-full h-12 text-lg">
              <Link href="/login">
                <Mail className="mr-3 h-5 w-5" />
                {config.loginModal.emailButton}
              </Link>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {config.loginModal.signupText}{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              {config.loginModal.signupLink}
            </Link>
          </p>

          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div
        ref={containerRef}
        className={cn(
          "grid min-h-screen w-full transition-grid-template-columns duration-300 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]",
          isCollapsed && "md:grid-cols-[80px_1fr]",
          dir === "rtl" &&
            "md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]",
          dir === "rtl" && isCollapsed && "md:grid-cols-[1fr_80px]"
        )}
      >
        <div
          className={cn(
            "hidden border-r bg-muted/20 md:flex flex-col",
            dir === "rtl" && "border-l border-r-0"
          )}
        >
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-16 items-center border-b border-border/10 px-4 lg:h-[60px] lg:px-6">
              <Link
                href={`/`}
                className={cn(
                  "flex items-center gap-2 font-semibold",
                  isCollapsed && "justify-center w-full"
                )}
              >
                {isCollapsed ? (
                  <Image
                    src="/logo-icon.png"
                    alt="Humanize AI Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                    priority
                    style={{ aspectRatio: '1 / 1' }}
                  />
                ) : (
                  <Image
                    src="/logo-main.png"
                    alt="Humanize AI Logo"
                    width={180}
                    height={45}
                    priority
                    style={{ aspectRatio: '180 / 45' }}
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
                  "flex items-center gap-2",
                  isCollapsed ? "flex-col" : "flex-row justify-center"
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
                  dir === "rtl" ? (
                    <ChevronsLeft />
                  ) : (
                    <ChevronsRight />
                  )
                ) : dir === "rtl" ? (
                  <ChevronsRight />
                ) : (
                  <ChevronsLeft />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className={cn("flex flex-col", dir === "rtl" && "order-first")}>
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
