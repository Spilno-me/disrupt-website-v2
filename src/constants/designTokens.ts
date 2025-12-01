/**
 * Design Tokens - Centralized design system values
 * All colors, shadows, spacing, and animation values should be defined here
 */

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  // Primary palette
  dark: '#2D3142',           // Primary text, buttons, headings
  cream: '#FBFBF3',          // Main background
  teal: '#08A4BD',           // Accent, links, active states
  ferrariRed: '#F70D1A',     // Brand accent (logo red)
  muted: '#5E4F7E',          // Secondary/muted text (dusty purple)
  darkPurple: '#341E63',     // Section headings, pricing tables

  // Feature card circle colors
  circleBlue: '#3B82F6',     // Automate
  circleRed: '#EF4444',      // Advice
  circleYellow: '#EAB308',   // Adapt
  circleGreen: '#22C55E',    // Scale

  // UI Colors
  slate: '#CBD5E1',          // Disabled/inactive states
  lightPurple: '#F5F1FD',    // Light backgrounds

  // LinkedIn brand
  linkedInBlue: '#0A66C2',

  // Transparent overlays
  glassBackground: 'rgba(251, 251, 243, 0.3)',
  headerShadow: 'rgba(0, 0, 0, 0.15)',
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const SHADOWS = {
  // Image shadow - double shadow for "standing on surface" effect
  image: '0 6px 12px -2px rgba(0,0,0,0.3), 0 20px 50px -8px rgba(0,0,0,0.2)',

  // Header glass effect shadow
  header: '0px 2px 4px 5px rgba(0, 0, 0, 0.15)',

  // Button shadows
  buttonDefault: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
} as const

// =============================================================================
// GRADIENTS
// =============================================================================

export const GRADIENTS = {
  // Hero overlay for text readability - only bottom half, light
  heroOverlay: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.25) 100%)',
} as const

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
} as const

// =============================================================================
// SPACING
// =============================================================================

export const SPACING = {
  // Section padding
  sectionPaddingY: 'py-16 lg:py-24',
  sectionPaddingX: 'px-6 lg:px-10',

  // Container max width
  containerMaxWidth: '1440px',
  heroFrameMaxWidth: '1440px',  // Match content container width
  headerMaxWidth: '1440px',

  // Header height (for hero offset)
  headerHeight: '82px',

  // Content gaps
  headingGap: 'mb-1',           // Between heading and subheading
  subheadingGap: 'mb-8',        // Between subheading and content
  listItemGap: 'gap-4',         // Between list items
  sectionContentGap: 'gap-12 lg:gap-16',
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  // Font families
  display: 'font-display',      // Pilat Extended
  sans: 'font-sans',            // Fixel

  // Heading sizes
  h1: 'text-4xl md:text-6xl lg:text-7xl',
  h2: 'text-2xl lg:text-[32px]',
  subheading: 'text-base lg:text-lg',
  body: 'text-base',

  // Heading styles (combined)
  sectionHeading: 'text-2xl lg:text-[32px] font-display font-semibold leading-tight',
  sectionSubheading: 'text-base lg:text-lg font-display font-medium',
} as const

// =============================================================================
// ANIMATION CONSTANTS
// =============================================================================

export const ANIMATION = {
  // Particle system (HeroSection)
  particles: {
    SPAWN_THROTTLE_MS: 50,       // Faster spawning (was 150)
    MAX_ACTIVE_PARTICLES: 30,    // More particles allowed (was 12)
    SPAWN_PROBABILITY: 0.9,      // 90% chance to spawn (was 70%)
    LIFETIME_MS: 3500,
    INITIAL_SPAWN_COUNT: 30,
  },

  // Rotation animation (FeatureCard, LinkedInButton)
  rotation: {
    MAX_SPEED: 1,                // degrees per frame
    ACCELERATION: 0.05,
    DECELERATION: 0.03,
  },

  // LinkedIn button specific
  linkedIn: {
    MAX_SPEED: 8,
    ACCELERATION: 0.4,
    DECELERATION: 0.15,
    FILL_TRIGGER_SPEED: 7,
  },

  // Waypoint animation (GridBlobCanvas)
  blob: {
    WAYPOINT_INTERVAL_MS: 2000,
    EASE_FACTOR: 0.02,
    MAX_WIDTH_RATIO: 0.4,
    MAX_HEIGHT_RATIO: 0.6,
  },
} as const

// =============================================================================
// TAILWIND CLASS COMPOSITIONS
// =============================================================================

// Pre-composed Tailwind class strings for common patterns
export const CLASSES = {
  // Section container
  sectionContainer: 'max-w-[1440px] mx-auto px-6 lg:px-10',

  // Two-column layout
  twoColumnLayout: 'flex flex-col lg:flex-row items-center gap-12 lg:gap-16',

  // Image with shadow
  sectionImage: `w-full h-auto rounded-[${RADIUS.lg}] object-cover`,

  // Heading group
  headingGroup: 'flex flex-col',

  // Glass morphism effect
  glassEffect: 'backdrop-blur-[10px] bg-[rgba(251,251,243,0.3)]',

  // Button base
  buttonPrimary: `h-9 px-4 py-2 rounded-[${RADIUS.md}] text-sm font-medium bg-[${COLORS.dark}] text-white hover:opacity-90 cursor-pointer`,
} as const

// =============================================================================
// Z-INDEX LAYERS
// =============================================================================

export const Z_INDEX = {
  background: 0,
  content: 1,
  header: 50,
  modal: 100,
  tooltip: 150,
} as const
