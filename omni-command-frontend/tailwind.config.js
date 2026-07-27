/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-secondary-fixed-variant": "#43474f",
        "on-error-container": "#ffdad6",
        "surface-container-high": "#272a31",
        "inverse-surface": "#e1e2ec",
        "on-tertiary": "#502400",
        "primary-container": "#4d8eff",
        "surface-container-lowest": "rgba(11, 14, 21, 0)",
        "on-primary-fixed": "#001a42",
        "surface-dim": "#0a0c10", /* Darkened slightly for more contrast */
        "outline-variant": "#424754",
        "tertiary-container": "#df7412",
        "primary-fixed": "#d8e2ff",
        "surface-container-low": "rgba(20, 23, 30, 0.7)", /* Darkened slightly */
        "error-container": "#93000a",
        "surface-tint": "#adc6ff",
        "surface-container": "#161922", /* Darkened slightly */
        "on-surface": "#e1e2ec",
        "surface": "rgba(10, 12, 16, 0.85)", /* Darker, more premium base */
        "on-primary-container": "#00285d",
        "tertiary": "#ffb786",
        "on-secondary-container": "#b2b5be",
        "on-primary": "#002e6a",
        "on-tertiary-fixed-variant": "#723600",
        "on-error": "#690005",
        "primary": "#adc6ff",
        "secondary-container": "#43474f",
        "on-primary-fixed-variant": "#004395",
        "on-background": "#e1e2ec",
        "surface-bright": "#363941",
        "background": "#05070a", /* Deeper background for luxury feel */
        "surface-variant": "#32353c",
        "secondary": "#c3c6d0",
        "surface-container-highest": "#32353c",
        "on-secondary-fixed": "#181c23",
        "inverse-primary": "#005ac2",
        "tertiary-fixed": "#ffdcc6",
        "secondary-fixed-dim": "#c3c6d0",
        "on-secondary": "#2d3138",
        "on-tertiary-container": "#461f00",
        "error": "#ffb4ab",
        "on-surface-variant": "#c2c6d6",
        "outline": "#8c909f",
        "tertiary-fixed-dim": "#ffb786",
        "inverse-on-surface": "#2e3038",
        "secondary-fixed": "#dfe2ec",
        "primary-fixed-dim": "#adc6ff",
        "on-tertiary-fixed": "#311400"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-sm": "0.5rem",
        "stack-lg": "2rem",
        "gutter": "1.5rem",
        "topbar-height": "64px",
        "container-padding": "2rem",
        "stack-md": "1rem",
        "sidebar-width": "240px",
        "sidebar-collapsed": "64px"
      },
      "fontFamily": {
        "body-lg": ["Geist", "sans-serif"],
        "mono-data": ["Geist Mono", "monospace"],
        "headline-lg": ["Geist", "sans-serif"],
        "display-lg": ["Geist", "sans-serif"],
        "headline-sm": ["Geist", "sans-serif"],
        "body-sm": ["Geist", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "body-md": ["Geist", "sans-serif"],
        "label-md": ["Geist", "sans-serif"]
      },
      "fontSize": {
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "mono-data": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}]
      },
      "boxShadow": {
        'premium-soft': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'premium-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow-primary': '0 0 20px -5px theme("colors.primary")',
        'glow-green': '0 0 20px -5px rgba(34, 197, 94, 0.5)',
        'glow-red': '0 0 20px -5px rgba(239, 68, 68, 0.5)',
        'glow-orange': '0 0 20px -5px rgba(249, 115, 22, 0.5)',
      },
      "animation": {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      "keyframes": {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
}
