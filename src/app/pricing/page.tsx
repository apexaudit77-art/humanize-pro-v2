
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "For personal use and exploration.",
        features: ["Up to 500 words per month", "Basic humanization", "Standard support"],
        cta: "Get Started"
    },
    {
        name: "Pro",
        price: "$19",
        description: "For professionals and content creators.",
        features: ["Up to 50,000 words per month", "Advanced humanization", "SEO tools suite", "Priority support"],
        cta: "Go Pro",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For teams and businesses.",
        features: ["Unlimited words", "Team collaboration", "Dedicated account manager", "Custom integrations"],
        cta: "Contact Sales"
    }
];

export default function Pricing() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
          </Link>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <main className="flex w-full flex-grow flex-col items-center py-8 md:py-12">
            <div className="w-full max-w-5xl space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Our Pricing
                    </h2>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Choose the plan that's right for you.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-4xl font-bold">{plan.price}<span className="text-lg font-normal text-muted-foreground">{plan.price.startsWith('$') ? '/mo' : ''}</span></div>
                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
