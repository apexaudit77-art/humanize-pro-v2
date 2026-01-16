
"use client"

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";
import type { NavItem } from "@/lib/types";
import { GlobalLanguageSwitcher } from "./global-language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { AuthMenu } from "./auth-menu";
import Image from "next/image";

interface MobileHeaderProps {
    navItems: NavItem[];
    lang: string;
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
}

export function MobileHeader({ navItems, lang, activeSection, onSectionChange }: MobileHeaderProps) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden backdrop-blur-sm sticky top-0 z-30">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="flex flex-col bg-muted/80 backdrop-blur-lg p-0 w-full max-w-xs">
                    <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href={`/`} className="flex items-center gap-2 font-semibold">
                            <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4">
                         <SidebarNav lang={lang} navItems={navItems} activeSection={activeSection} onSectionChange={onSectionChange} isCollapsed={false}/>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex-1">
                <Link href={`/`} className="flex items-center gap-2 font-semibold">
                    <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
                </Link>
            </div>
            <div className="flex items-center gap-1">
                <AuthMenu />
                <ThemeToggle />
                <GlobalLanguageSwitcher />
            </div>
        </header>
    );
}
