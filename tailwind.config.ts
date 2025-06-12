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
			spacing: {
				'section': '1.25rem',   // 新しい縦マージン基準 (20px)
			},
			fontFamily: {
				// Font families with unique keys
				'heading': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'body': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'number': ['Inter', 'sans-serif'],
				'logo': ['Poppins', 'Inter', 'sans-serif'],
				'display': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'bubble': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
				'button': ['Inter', 'sans-serif'],
				'head': ['"Noto Sans JP"', 'Inter', 'sans-serif'],
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
					DEFAULT: '#FF708A', // Updated to Pigipe Pink
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#7ADFA2', // Updated to Pigipe Green
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#FFD66E', // Keep existing accent
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
					'primary': '#FF708A',    // Pigipe Pink
					'secondary': '#7ADFA2',  // Pigipe Green
					'accent': '#FFD66E',     // Keep existing accent
					'danger': '#E0E0E0',     // Keep gray
					'neutral': '#F5F5F5',    // Background
					'success': '#7ADFA2',    // Pigipe Green
					'info': '#E0E0E0',       // Keep gray
					'warning': '#FFD66E',    // Keep accent
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
				},
				// Add Pigipe brand colors
				'brand': {
					'pink': '#FF708A',
					'light': '#FFE8F1'
				},
				// Pigipe color tokens
				'pigipePink': '#FF708A',
				'pigipePinkLight': '#FFA5B4',
				'pigipeGreen': '#7ADFA2',
				'pigipeGreenDark': '#4CC985',
				// Pigipe color tokens for investment game
				'pigipe': {
					'primary': '#FF708A',
					'secondary': '#7ADFA2', 
					'success': '#7ADFA2',
					'warning': '#FFD66E',
					'danger': '#FF708A',
					'info': '#87CEEB',
					'neutral': '#F5F5F5'
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
