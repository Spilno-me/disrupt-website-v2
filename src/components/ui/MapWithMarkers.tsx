import React, { useState, useRef, useEffect } from 'react'
import mapBackground from '@/assets/figma/map-background.svg'

interface MarkerLocation {
  id: string
  country: string
  x: number // percentage from left (0-100)
  y: number // percentage from top (0-100)
  isMain?: boolean
}

// Country coordinates on the world map (percentages based on 882x420 map)
// Map projection: Standard world map with Americas on left, Asia/Australia on right
// To add a new country: add entry with approximate x% (0=far left/Pacific, 50=Europe, 100=far right/Pacific)
// and y% (0=top/Arctic, 50=equator area, 100=bottom/Antarctic)
const COUNTRY_COORDINATES: Record<string, { x: number; y: number }> = {
  // North America
  'usa': { x: 20, y: 44 }, // Houston, Texas
  'usa-west': { x: 12, y: 40 },
  'usa-east': { x: 22, y: 42 },
  'canada': { x: 18, y: 28 },
  'mexico': { x: 16, y: 52 },

  // South America
  'brazil': { x: 30, y: 68 },
  'argentina': { x: 27, y: 82 },
  'colombia': { x: 24, y: 58 },

  // Western Europe
  'uk': { x: 46, y: 32 },
  'ireland': { x: 44, y: 32 },
  'france': { x: 48, y: 40 },
  'spain': { x: 46, y: 45 },
  'portugal': { x: 44, y: 44 },

  // Central Europe
  'germany': { x: 50, y: 36 },
  'netherlands': { x: 49, y: 34 },
  'belgium': { x: 48, y: 36 },
  'switzerland': { x: 50, y: 40 },
  'austria': { x: 52, y: 40 },
  'poland': { x: 53, y: 35 },
  'czech': { x: 52, y: 37 },

  // Southern Europe
  'italy': { x: 51, y: 44 },
  'greece': { x: 54, y: 46 },

  // Northern Europe
  'sweden': { x: 52, y: 24 },
  'norway': { x: 50, y: 22 },
  'finland': { x: 55, y: 22 },
  'denmark': { x: 50, y: 30 },

  // Eastern Europe
  'ukraine': { x: 57, y: 36 },
  'romania': { x: 55, y: 42 },
  'hungary': { x: 53, y: 40 },

  // Middle East
  'uae': { x: 64, y: 52 },
  'saudi': { x: 61, y: 52 },
  'israel': { x: 58, y: 48 },
  'turkey': { x: 57, y: 44 },

  // Asia
  'india': { x: 70, y: 52 },
  'china': { x: 78, y: 42 },
  'japan': { x: 87, y: 42 },
  'singapore': { x: 78, y: 62 },
  'thailand': { x: 76, y: 56 },
  'vietnam': { x: 78, y: 56 },
  'korea': { x: 84, y: 42 },

  // Africa
  'south-africa': { x: 55, y: 78 },
  'nigeria': { x: 50, y: 58 },
  'egypt': { x: 57, y: 50 },
  'kenya': { x: 58, y: 62 },

  // Oceania
  'australia': { x: 85, y: 74 },
  'new-zealand': { x: 94, y: 82 },
}

// Country display names for tooltips
const COUNTRY_NAMES: Record<string, string> = {
  'usa': 'United States',
  'ireland': 'Ireland',
  'uk': 'United Kingdom',
  'portugal': 'Portugal',
  'switzerland': 'Switzerland',
  'ukraine': 'Ukraine',
  'uae': 'UAE',
  'canada': 'Canada',
  'mexico': 'Mexico',
  'brazil': 'Brazil',
  'argentina': 'Argentina',
  'france': 'France',
  'spain': 'Spain',
  'germany': 'Germany',
  'italy': 'Italy',
  'netherlands': 'Netherlands',
  'belgium': 'Belgium',
  'austria': 'Austria',
  'poland': 'Poland',
  'sweden': 'Sweden',
  'norway': 'Norway',
  'finland': 'Finland',
  'denmark': 'Denmark',
  'greece': 'Greece',
  'turkey': 'Turkey',
  'israel': 'Israel',
  'saudi': 'Saudi Arabia',
  'india': 'India',
  'china': 'China',
  'japan': 'Japan',
  'singapore': 'Singapore',
  'australia': 'Australia',
  'south-africa': 'South Africa',
}

// Active markers - edit this array to change which countries have markers
// Set isMain: true for the headquarters/primary location
const markers: MarkerLocation[] = [
  { id: 'usa', country: 'usa', ...COUNTRY_COORDINATES['usa'] },
  { id: 'ireland', country: 'ireland', ...COUNTRY_COORDINATES['ireland'] },
  { id: 'uk', country: 'uk', ...COUNTRY_COORDINATES['uk'] },
  { id: 'portugal', country: 'portugal', ...COUNTRY_COORDINATES['portugal'] },
  { id: 'switzerland', country: 'switzerland', ...COUNTRY_COORDINATES['switzerland'], isMain: true },
  { id: 'ukraine', country: 'ukraine', ...COUNTRY_COORDINATES['ukraine'] },
  { id: 'uae', country: 'uae', ...COUNTRY_COORDINATES['uae'] },
]

// Disrupt "D" icon with explosive animated pixels - matching header logo
function DisruptIcon({ isMain = false, isHovered = false }: { isMain?: boolean; isHovered?: boolean }) {
  const mainColor = isMain ? '#F70D1A' : '#2D3142'
  const accentColor = isMain ? '#2D3142' : '#F70D1A'
  const anim = isHovered ? 'animate' : ''

  return (
    <svg
      viewBox="-1 7 45 28"
      fill="none"
      className="w-full h-full overflow-visible"
    >
      {/* Floating pixel rectangles - accent color (3 pixels) */}
      <rect
        className={`marker-pixel marker-p1 ${anim}`}
        x="11.19"
        y="23.14"
        width="3.95"
        height="3.86"
        rx="0.53"
        fill={accentColor}
      />
      <path
        className={`marker-pixel marker-p2 ${anim}`}
        d="M5.92 15.96c0-.29.24-.53.54-.53h2.87c.3 0 .54.24.54.53v2.8c0 .29-.24.53-.54.53H6.46c-.3 0-.54-.24-.54-.53v-2.8z"
        fill={accentColor}
      />
      <path
        className={`marker-pixel marker-p3 ${anim}`}
        d="M7.9 30.28c0-.39.32-.71.72-.71h3.82c.42 0 .74.32.74.71v3.73c0 .39-.32.71-.74.71H8.62c-.4 0-.72-.32-.72-.71v-3.73z"
        fill={accentColor}
      />

      {/* Main D shape */}
      <path
        d="M29.17 8.36c7.36 0 13.32 5.93 13.32 13.25s-5.96 13.25-13.32 13.25H15.36c-.51 0-.92-.41-.92-.91v-3.47c0-.5.41-.91.92-.91h13.81c4.41 0 7.99-3.56 7.99-7.95 0-4.39-3.58-7.95-7.99-7.95H15.36c-.51 0-.92-.41-.92-.91V9.28c0-.5.41-.92.92-.92h13.81z"
        fill={mainColor}
      />

      {/* Floating pixel rectangles - main color (7 pixels) */}
      <path
        className={`marker-pixel marker-p4 ${anim}`}
        d="M13.17 18.35c0-.2.16-.35.36-.35h1.91c.2 0 .36.16.36.35v1.86c0 .2-.16.36-.36.36h-1.91c-.2 0-.36-.16-.36-.36v-1.86z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p5 ${anim}`}
        d="M3.95 12.48c0-.15.12-.27.27-.27h1.43c.15 0 .27.12.27.27v1.4c0 .15-.12.26-.27.26H4.22c-.15 0-.27-.11-.27-.26v-1.4z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p6 ${anim}`}
        d="M3.95 27.27c0-.15.12-.27.27-.27h1.43c.15 0 .27.12.27.27v1.4c0 .14-.12.26-.27.26H4.22c-.15 0-.27-.12-.27-.26v-1.4z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p7 ${anim}`}
        d="M6.58 24.69c0-.15.12-.26.27-.26h1.43c.15 0 .27.11.27.26v1.4c0 .15-.12.26-.27.26H6.85c-.15 0-.27-.11-.27-.26v-1.4z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p8 ${anim}`}
        d="M7.9 9.06c0-.39.32-.71.72-.71h3.82c.42 0 .74.32.74.71v3.73c0 .39-.32.71-.74.71H8.62c-.4 0-.72-.32-.72-.71V9.06z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p9 ${anim}`}
        d="M.66 18.35c0-.19.16-.35.36-.35h1.91c.2 0 .36.16.36.35v1.86c0 .2-.16.36-.36.36H1.02c-.2 0-.36-.16-.36-.36v-1.86z"
        fill={mainColor}
      />
      <path
        className={`marker-pixel marker-p10 ${anim}`}
        d="M4.61 20.92c0-.19.16-.35.36-.35h1.91c.2 0 .36.16.36.36v1.86c0 .2-.16.36-.36.36H4.97c-.2 0-.36-.16-.36-.36v-1.86z"
        fill={mainColor}
      />
    </svg>
  )
}

interface LocationMarkerProps {
  x: number
  y: number
  country: string
  isMain?: boolean
  mapOffset: number
  mapWidth: number
}

function LocationMarker({ x, y, country, isMain = false, mapOffset, mapWidth }: LocationMarkerProps) {
  const size = isMain ? 64 : 44
  const [isHovered, setIsHovered] = useState(false)
  const countryName = COUNTRY_NAMES[country] || country

  // Calculate actual pixel position within the infinite map
  const pixelX = (x / 100) * mapWidth + mapOffset

  return (
    <div
      className="absolute cursor-pointer transition-all duration-200"
      style={{
        left: pixelX,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
        width: size,
        height: size,
        zIndex: isHovered ? 50 : (isMain ? 10 : 1),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-repel="true"
    >
      {/* Tooltip */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#2D3142] text-white text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
          isHovered
            ? 'opacity-100 -top-8 scale-100'
            : 'opacity-0 top-0 scale-75 pointer-events-none'
        }`}
      >
        {countryName}
        {isMain && <span className="text-[#08A4BD] ml-1">(HQ)</span>}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#2D3142] rotate-45" />
      </div>

      {/* Circle background with stroke */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className="absolute inset-0"
      >
        <defs>
          <filter id={`marker-shadow-${x}-${y}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        {/* White fill with shadow */}
        <circle cx="32" cy="32" r="29" fill="white" filter={`url(#marker-shadow-${x}-${y})`} />
        {/* Stroke - animated for HQ */}
        <circle
          cx="32"
          cy="32"
          r="27.5"
          stroke={isMain ? undefined : "#08A4BD"}
          strokeWidth="3"
          fill="none"
          className={isMain ? "marker-hq-ring" : ""}
        />
      </svg>
      {/* Icon - precisely centered */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: size * 0.6,
          height: size * 0.6,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <DisruptIcon isMain={isMain} isHovered={isHovered} />
      </div>
    </div>
  )
}

// Inertia physics constants
const FRICTION = 0.96 // Friction coefficient - higher = more inertia (0.85-0.98)
const MIN_VELOCITY = 0.3 // Minimum velocity before stopping
const MAX_VELOCITY = 50 // Maximum velocity cap

export function MapWithMarkers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsetX, setOffsetX] = useState(0)
  const [mapWidth, setMapWidth] = useState(882)
  const [isInitialized, setIsInitialized] = useState(false)

  // All drag/inertia state in refs to avoid stale closures
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    dragStartOffset: 0,
    position: 0,
    previousPosition: 0,
    velocity: 0,
    animationId: null as number | null,
    mapWidth: 882,
  })

  // Find the main (HQ) marker
  const mainMarker = markers.find(m => m.isMain) || markers[0]

  // Normalize offset to keep it within one map width (for seamless looping)
  const normalizeOffset = (offset: number): number => {
    const width = stateRef.current.mapWidth
    let normalized = offset % width
    if (normalized > 0) normalized -= width
    return normalized
  }

  // Animation loop - runs continuously via requestAnimationFrame
  const step = () => {
    const state = stateRef.current

    if (state.isDragging) {
      // While dragging, calculate velocity from position change
      state.velocity = state.position - state.previousPosition
      state.previousPosition = state.position
    } else {
      // When not dragging, apply velocity with friction
      if (Math.abs(state.velocity) > MIN_VELOCITY) {
        state.position += state.velocity
        state.velocity *= FRICTION
        state.position = normalizeOffset(state.position)
        setOffsetX(state.position)
      } else {
        state.velocity = 0
        // Stop animation loop when velocity is negligible
        return
      }
    }

    state.animationId = requestAnimationFrame(step)
  }

  // Start animation loop
  const startAnimation = () => {
    if (stateRef.current.animationId === null) {
      stateRef.current.animationId = requestAnimationFrame(step)
    }
  }

  // Stop animation loop
  const stopAnimation = () => {
    if (stateRef.current.animationId !== null) {
      cancelAnimationFrame(stateRef.current.animationId)
      stateRef.current.animationId = null
    }
  }

  // Handle image load to get actual dimensions and center on HQ
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const width = e.currentTarget.naturalWidth
    setMapWidth(width)
    stateRef.current.mapWidth = width

    // Center the map on HQ marker on initial load
    if (!isInitialized && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const hqPixelX = (mainMarker.x / 100) * width
      const centerOffset = (containerWidth / 2) - hqPixelX + 80
      stateRef.current.position = centerOffset
      stateRef.current.previousPosition = centerOffset
      setOffsetX(centerOffset)
      setIsInitialized(true)
    }
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const state = stateRef.current
    stopAnimation()

    state.isDragging = true
    state.startX = e.clientX
    state.dragStartOffset = state.position
    state.previousPosition = state.position
    state.velocity = 0

    startAnimation()
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const state = stateRef.current
    if (!state.isDragging) return

    const deltaX = e.clientX - state.startX
    state.position = normalizeOffset(state.dragStartOffset + deltaX)
    setOffsetX(state.position)
  }

  const handleMouseUp = () => {
    const state = stateRef.current
    if (!state.isDragging) return

    state.isDragging = false
    // Clamp velocity to prevent extreme speeds
    state.velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, state.velocity))

    // Continue animation for inertia
    if (Math.abs(state.velocity) > MIN_VELOCITY) {
      startAnimation()
    }
  }

  const handleMouseLeave = () => {
    handleMouseUp()
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const state = stateRef.current
    stopAnimation()

    state.isDragging = true
    state.startX = e.touches[0].clientX
    state.dragStartOffset = state.position
    state.previousPosition = state.position
    state.velocity = 0

    startAnimation()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const state = stateRef.current
    if (!state.isDragging) return

    const deltaX = e.touches[0].clientX - state.startX
    state.position = normalizeOffset(state.dragStartOffset + deltaX)
    setOffsetX(state.position)
  }

  const handleTouchEnd = () => {
    const state = stateRef.current
    if (!state.isDragging) return

    state.isDragging = false
    state.velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, state.velocity))

    if (Math.abs(state.velocity) > MIN_VELOCITY) {
      startAnimation()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimation()
  }, [])

  // We render 3 copies of the map for seamless infinite scrolling
  const mapCopies = [-1, 0, 1]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] rounded-[16px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'pan-y' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-element="contact-map"
    >
      {/* Map copies for infinite scroll */}
      <div
        className="absolute inset-0 flex will-change-transform"
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
      >
        {mapCopies.map((copyIndex) => (
          <div
            key={copyIndex}
            className="relative flex-shrink-0 h-full"
            style={{ width: mapWidth }}
          >
            <img
              src={mapBackground}
              alt=""
              className="h-full w-auto object-cover"
              onLoad={copyIndex === 0 ? handleImageLoad : undefined}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Markers - rendered for each map copy */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
      >
        {mapCopies.map((copyIndex) =>
          markers.map((marker) => (
            <div key={`${copyIndex}-${marker.id}`} className="pointer-events-auto">
              <LocationMarker
                x={marker.x}
                y={marker.y}
                country={marker.country}
                isMain={marker.isMain}
                mapOffset={copyIndex * mapWidth}
                mapWidth={mapWidth}
              />
            </div>
          ))
        )}
      </div>

    </div>
  )
}
