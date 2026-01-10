
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'IBM Plex Sans Arabic', 'sans-serif'],
        headline: ['Space Grotesk', 'Tajawal', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        xl: 'calc(var(--radius) + 4px)',
      },
       boxShadow: {
        glow: '0 0 15px hsl(var(--accent) / 0.4), 0 0 30px hsl(var(--primary) / 0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px hsl(var(--accent) / 0.4), 0 0 30px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 25px hsl(var(--accent) / 0.6), 0 0 45px hsl(var(--primary) / 0.4)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient': 'gradient 3s ease infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
      },
      transitionProperty: {
        'grid-template-columns': 'grid-template-columns',
      },
       typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            lineHeight: '1.8',
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
              },
            },
            h1: {
              color: theme('colors.foreground'),
            },
            h2: {
              color: theme('colors.foreground'),
            },
            h3: {
              color: theme('colors.foreground'),
            },
            h4: {
              color: theme('colors.foreground'),
            },
            strong: {
              color: theme('colors.foreground'),
            },
            code: {
              color: theme('colors.primary.DEFAULT'),
            },
            blockquote: {
              color: theme('colors.muted.foreground'),
              borderLeftColor: theme('colors.border'),
            },
          },
        },
        invert: {
           css: {
            color: theme('colors.foreground'),
             a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
              },
            },
            h1: {
              color: theme('colors.foreground'),
            },
            h2: {
              color: theme('colors.foreground'),
            },
            h3: {
              color: theme('colors.foreground'),
            },
            h4: {
              color: theme('colors.foreground'),
            },
             strong: {
              color: theme('colors.foreground'),
            },
             code: {
              color: theme('colors.primary.DEFAULT'),
            },
             blockquote: {
              color: theme('colors.muted.foreground'),
              borderLeftColor: theme('colors.border'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
