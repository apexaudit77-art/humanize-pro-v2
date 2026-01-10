
"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface SidebarNavProps {
    lang: string;
    navItems: NavItem[];
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
    isCollapsed: boolean;
}

export function SidebarNav({ lang, navItems, activeSection, onSectionChange, isCollapsed }: SidebarNavProps) {
    
    const handleLinkClick = (id: string) => {
        onSectionChange(id);
    };
    
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {navItems.map(({ id, href, icon: Icon, label }) => (
                isCollapsed ? (
                    <Tooltip key={label} delayDuration={0}>
                        <TooltipTrigger asChild>
                             <a
                                href={href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(id);
                                }}
                                className={cn(
                                    "flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground transition-colors hover:text-primary",
                                    activeSection === id && "text-primary bg-accent"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="sr-only">{label}</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                           {label}
                        </TooltipContent>
                    </Tooltip>
                   
                ) : (
                    <a
                        key={label}
                        href={href}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(id);
                        }}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer",
                            activeSection === id && "text-primary bg-accent"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </a>
                )
            ))}
        </nav>
    );
}
