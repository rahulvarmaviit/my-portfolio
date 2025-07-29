/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // light-gray
        input: 'var(--color-input)', // subtle-gray
        ring: 'var(--color-ring)', // warm-orange
        background: 'var(--color-background)', // warm-white
        foreground: 'var(--color-foreground)', // dark-gray
        primary: {
          DEFAULT: 'var(--color-primary)', // warm-orange
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // deeper-orange
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // clear-red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // subtle-gray
          foreground: 'var(--color-muted-foreground)', // medium-gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // success-green
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // warm-white
          foreground: 'var(--color-popover-foreground)', // dark-gray
        },
        card: {
          DEFAULT: 'var(--color-card)', // subtle-gray
          foreground: 'var(--color-card-foreground)', // dark-gray
        },
        success: {
          DEFAULT: 'var(--color-success)', // bright-green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // clear-red
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-medium': '500',
      },
      borderRadius: {
        'card': '8px',
        'button': '6px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        'gentle': '300ms',
        'progress': '500ms',
      },
      transitionTimingFunction: {
        'gentle': 'ease-out',
        'progress': 'ease-in-out',
      },
      spacing: {
        'nav-height': '60px',
        'nav-padding-x': '24px',
        'nav-padding-y': '16px',
        'logo-height': '40px',
        'touch-target': '48px',
      },
      zIndex: {
        'nav': '1000',
        'nav-mobile': '1100',
        'modal': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}