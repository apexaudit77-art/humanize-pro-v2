"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export const GlobalLanguageSwitcher = () => {
  const pathname = usePathname();

  const getLanguageLink = (langCode: string) => {
    const parts = pathname.split("/").filter(Boolean);
    if (languages.some((l) => l.code === parts[0])) {
      parts[0] = langCode;
    } else {
      parts.unshift(langCode);
    }
    return `/${parts.join("/")}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link href={getLanguageLink(lang.code)}>
              <span className="mr-2 ml-2">{lang.flag}</span>
              {lang.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
