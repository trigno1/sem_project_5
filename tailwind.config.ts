import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// ── shadcn/ui HSL tokens (kept for dashboard, etc.) ──────────────
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// ── Stitch "Aether Prism" design tokens ─────────────────────────
  			'ds-primary':               '#a7a5ff',
  			'ds-primary-dim':           '#645efb',
  			'ds-primary-fixed':         '#9795ff',
  			'ds-primary-fixed-dim':     '#8885ff',
  			'ds-primary-container':     '#9795ff',
  			'ds-on-primary':            '#1c00a0',
  			'ds-on-primary-fixed':      '#000000',
  			'ds-on-primary-fixed-var':  '#1a0099',
  			'ds-on-primary-container':  '#14007e',
  			'ds-inverse-primary':       '#4e45e4',

  			'ds-secondary':             '#af88ff',
  			'ds-secondary-dim':         '#8a4cfc',
  			'ds-secondary-fixed':       '#dcc9ff',
  			'ds-secondary-fixed-dim':   '#d0b8ff',
  			'ds-secondary-container':   '#6001d1',
  			'ds-on-secondary':          '#2b0065',
  			'ds-on-secondary-fixed':    '#430097',
  			'ds-on-secondary-fixed-var':'#6514d6',
  			'ds-on-secondary-container':'#e1d0ff',

  			'ds-tertiary':              '#ec63ff',
  			'ds-tertiary-dim':          '#ec63ff',
  			'ds-tertiary-fixed':        '#f487ff',
  			'ds-tertiary-fixed-dim':    '#ef6eff',
  			'ds-tertiary-container':    '#de4bf4',
  			'ds-on-tertiary':           '#3d0047',
  			'ds-on-tertiary-fixed':     '#300038',
  			'ds-on-tertiary-fixed-var': '#660075',
  			'ds-on-tertiary-container': '#19001e',

  			'ds-surface':               '#0c0c1d',
  			'ds-surface-dim':           '#0c0c1d',
  			'ds-surface-bright':        '#2a2a43',
  			'ds-surface-variant':       '#23233b',
  			'ds-surface-tint':          '#a7a5ff',
  			'ds-surface-container':     '#18182b',
  			'ds-surface-container-low': '#111124',
  			'ds-surface-container-high':'#1d1d33',
  			'ds-surface-container-highest':'#23233b',
  			'ds-surface-container-lowest':'#000000',
  			'ds-on-surface':            '#e6e3fb',
  			'ds-on-surface-variant':    '#aba9bf',
  			'ds-on-background':         '#e6e3fb',
  			'ds-inverse-surface':       '#fcf8ff',
  			'ds-inverse-on-surface':    '#545367',

  			'ds-outline':               '#757388',
  			'ds-outline-variant':       '#474659',

  			'ds-error':                 '#ff6e84',
  			'ds-error-dim':             '#d73357',
  			'ds-error-container':       '#a70138',
  			'ds-on-error':              '#490013',
  			'ds-on-error-container':    '#ffb2b9',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'float-hero': {
  				'0%, 100%': { transform: 'translateY(0px) rotate(var(--tw-rotate, 0deg))' },
  				'50%': { transform: 'translateY(-12px) rotate(var(--tw-rotate, 0deg))' },
  			},
  		},
  		animation: {
  			'float-hero': 'float-hero 6s ease-in-out infinite',
  			'float-hero-slow': 'float-hero 7s ease-in-out infinite reverse',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
