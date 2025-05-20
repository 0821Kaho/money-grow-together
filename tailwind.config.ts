import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				// Updated font families
				'heading': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'body': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'number': ['Inter', 'sans-serif'],
				// Logo specific font
				'logo': ['Poppins', 'Inter', 'sans-serif'],
				// Keep the legacy font family presets for backward compatibility
				'heading': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'display': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'body': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'bubble': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'button': ['Inter', 'sans-serif'],
				'num': ['Inter', 'sans-serif'],
				// Keep new font family presets
				'head': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'display': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'num': ['Inter', 'sans-serif'],
			},
			fontWeight: {
				heading: '700',   // Bold
				subheading: '500',// Medium
				body: '400',      // Regular
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#F37B83', // Updated to new primary pink
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#2BA26B', // Updated to new secondary green
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#FFD66E', // Updated to new accent gold
					foreground: '#333333'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				game: {
					'primary': '#F37B83',    // Updated to new primary pink
					'secondary': '#2BA26B',  // Updated to new secondary green
					'accent': '#FFD66E',     // Updated to new accent gold
					'danger': '#E0E0E0',     // Changed from red to gray
					'neutral': '#F5F5F5',    // Background
					'success': '#2BA26B',    // Same as secondary
					'info': '#E0E0E0',       // Changed from blue to gray
					'warning': '#FFD66E',    // Same as accent
					'dark': '#333333',       // Text primary
					'light': '#F5F5F5'       // Background neutral
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '24px', // For CTA buttons
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'coin-spin': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'pop': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'coin-spin': 'coin-spin 0.5s ease-in-out',
				'pop': 'pop 0.3s ease-out',
				'bounce-in': 'bounce-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
