import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'rgb(var(--background))',
  			foreground: 'rgb(var(--foreground))',
  			'widget-border': 'rgb(var(--widget-border))',
  			'button-bg': 'rgb(var(--button-bg))',
  			'button-text': 'rgb(var(--button-text))',
  			'hover-bg': 'rgb(var(--hover-bg))',
  			'hover-text': 'rgb(var(--hover-text))',
  			apple: {
  				gray: {
  					100: '#F5F5F7',
  					200: '#E8E8ED',
  					300: '#D2D2D7',
  					400: '#AEAEB2',
  					500: '#8E8E93',
  					600: '#636366',
  					700: '#48484A',
  					800: '#3A3A3C',
  					900: '#1C1C1E',
  				},
  				blue: {
  					light: '#0071E3',
  					dark: '#0077ED',
  				},
  			},
  			// ... other existing color definitions ...
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
  			neonGreen: '#39FF14',
  			neonBlue: '#00FFFF',
  			neonPurple: '#9D00FF',
  			neonYellow: '#FFFF00',
  			neonOrange: '#FF6600',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			gaming: ['Press Start 2P', 'cursive'],
  		},
  	},
  	borderRadius: {
  		'apple': '0.75rem',
  		'DEFAULT': '0.75rem',
  		'sm': '0.5rem',
  		'md': '0.75rem',
  		'lg': '1rem',
  		'xl': '1.5rem',
  		'full': '9999px',
  	},
  	boxShadow: {
  		'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  	},
  	transitionProperty: {
  		'apple': 'all',
  	},
  	transitionDuration: {
  		'apple': '300ms',
  	},
  	transitionTimingFunction: {
  		'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  	},
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
