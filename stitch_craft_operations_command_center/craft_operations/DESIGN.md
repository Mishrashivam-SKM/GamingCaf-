---
name: CRAFT Operations
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c3c6d0'
  on-secondary: '#2d3138'
  secondary-container: '#43474f'
  on-secondary-container: '#b2b5be'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dfe2ec'
  secondary-fixed-dim: '#c3c6d0'
  on-secondary-fixed: '#181c23'
  on-secondary-fixed-variant: '#43474f'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 240px
  sidebar-collapsed: 64px
  topbar-height: 64px
  gutter: 1.5rem
  container-padding: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style
The design system is engineered for the high-intensity environment of premium PC gaming cafe management. It adopts a "Command Center" aesthetic that prioritizes utility, clarity, and performance over decorative flourishes. The personality is professional, authoritative, and focused—moving away from traditional "gamer" tropes like neon glows and aggressive angles toward a refined, enterprise-grade dark mode.

The style is a fusion of **Modern Minimalism** and **Tonal Layering**. It utilizes a "Deep Matte" approach where depth is communicated through subtle shifts in background values rather than heavy shadows or borders. This reduces visual noise for operators who manage multiple screens and high-occupancy hardware for extended periods.

## Colors
The palette is built on a foundation of "Midnight Grayscale" to minimize eye strain in low-light environments. 

- **Primary Background (#0B0D10):** The base canvas for the entire application.
- **Surface Layer (#15181D):** Used for cards and primary content containers to create a subtle lift from the background.
- **Panel Layer (#1B1F26):** Reserved for interactive sidebars, modals, and secondary utility panels.
- **Electric Blue Accent (#3B82F6):** A high-visibility tactical color used exclusively for primary actions, active states, and critical information paths.

Currency values (₹) should always be rendered in the `text_primary` color to ensure financial data is the most legible element on the screen.

## Typography
This design system utilizes **Geist** for its technical, precise character that aligns with developer-centric and high-performance tools. Its geometric clarity ensures readability at small sizes, which is critical for dense data tables and hardware monitoring.

- **Headlines:** Should be tight and impactful. Use `-0.01em` to `-0.02em` letter spacing for larger headings.
- **Data Display:** Use the Monospace variant of Geist for all numerical data, timestamps, and currency (₹) to ensure vertical alignment in tables.
- **Labels:** Small caps/Uppercase labels are used for metadata headers (e.g., "CPU TEMP", "IP ADDRESS", "SESSION TIME").

## Layout & Spacing
The layout follows a strict functional grid designed for desktop-first operations.

1.  **Persistent Top Bar:** Fixed at 64px height. Contains global search, system clock, and user profile. 
2.  **Collapsible Left Sidebar:** 240px width when expanded, collapsing to 64px (icons only) to maximize workspace for data-heavy views.
3.  **Content Area:** Uses a fluid flexbox system with a standard 24px (1.5rem) gutter between modules.

Spacing follows an 8px base unit. Component internal padding should be generous (16px–24px) to ensure the "Premium" feel and prevent the UI from feeling cramped despite the high data density.

## Elevation & Depth
This design system rejects traditional shadows in favor of **Tonal Elevation**. Depth is created by the stacking of darker and lighter matte surfaces.

- **Level 0 (Canvas):** `#0B0D10` — The furthest background layer.
- **Level 1 (Cards/Main Sections):** `#15181D` — Standard container for content.
- **Level 2 (Popovers/Active Panels):** `#1B1F26` — Used for elements that appear "on top" of the content, such as dropdown menus or the navigation drawer.

For hover states on interactive cards, use a subtle background lightening (e.g., +2% lightness) rather than a shadow. If a border must be used for definition, it should be a 1px solid stroke at 5% opacity of white.

## Shapes
The shape language is "Soft-Industrial." It utilizes a tight 4px (0.25rem) radius for standard components to maintain a crisp, professional edge that feels precise. 

- **Buttons & Inputs:** 4px radius.
- **Cards & Modals:** 8px (rounded-lg) for structural separation.
- **Status Indicators:** Circular (Full pill) for immediate recognition.

Avoid large, bubbly corners as they conflict with the "Command Center" aesthetic.

## Components
- **Buttons:** Primary buttons use the Electric Blue (#3B82F6) with white text. Secondary buttons use the Panel background (#1B1F26) with a subtle 1px border. No gradients.
- **PC Status Chips:** Use small indicators for machine status: `Green` (Available), `Blue` (Occupied), `Yellow` (Maintenance), `Red` (Offline). Chips should be flat with no stroke.
- **Input Fields:** Darker than the surface layer (#0B0D10) with a 1px border that turns Electric Blue on focus. Labels should always be visible above the input.
- **Data Tables:** Zebra-striping is avoided. Use thin 1px horizontal dividers in `#1B1F26`. Row hover states should use a subtle highlight.
- **Sidebar Nav:** Icons should be minimalist line-art. Active states are indicated by an Electric Blue vertical bar on the left edge and a shift in icon color.
- **Station Cards:** Display PC Number, User, and Time Remaining. Use a high-contrast progress bar for session time using the accent blue.