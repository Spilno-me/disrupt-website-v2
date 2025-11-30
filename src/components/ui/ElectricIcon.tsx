import { useState } from 'react'
import './ElectricIcon.css'

interface ElectricIconProps {
  isActive?: boolean
}

/**
 * Automate icon with electricity running effect on hover.
 * Demo component to test the effect.
 */
export function ElectricIconAutomate({ isActive = false }: ElectricIconProps) {
  return (
    <svg
      width="52"
      height="56"
      viewBox="0 0 52 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="electric-icon"
    >
      <defs>
        {/* Glow filter for the electric effect */}
        <filter id="electric-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base white stroke - always visible */}
      <path
        d="M15.1667 23.8333V32.5C15.1667 33.6493 15.6232 34.7515 16.4359 35.5641C17.2485 36.3768 18.3507 36.8333 19.5 36.8333H28.1667M10.8333 6.5H19.5C21.8932 6.5 23.8333 8.4401 23.8333 10.8333V19.5C23.8333 21.8932 21.8932 23.8333 19.5 23.8333H10.8333C8.4401 23.8333 6.5 21.8932 6.5 19.5V10.8333C6.5 8.4401 8.4401 6.5 10.8333 6.5ZM32.5 28.1667H41.1667C43.5599 28.1667 45.5 30.1068 45.5 32.5V41.1667C45.5 43.5599 43.5599 45.5 41.1667 45.5H32.5C30.1068 45.5 28.1667 43.5599 28.1667 41.1667V32.5C28.1667 30.1068 30.1068 28.1667 32.5 28.1667Z"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Electric overlay - animated on hover */}
      <path
        d="M15.1667 23.8333V32.5C15.1667 33.6493 15.6232 34.7515 16.4359 35.5641C17.2485 36.3768 18.3507 36.8333 19.5 36.8333H28.1667M10.8333 6.5H19.5C21.8932 6.5 23.8333 8.4401 23.8333 10.8333V19.5C23.8333 21.8932 21.8932 23.8333 19.5 23.8333H10.8333C8.4401 23.8333 6.5 21.8932 6.5 19.5V10.8333C6.5 8.4401 8.4401 6.5 10.8333 6.5ZM32.5 28.1667H41.1667C43.5599 28.1667 45.5 30.1068 45.5 32.5V41.1667C45.5 43.5599 43.5599 45.5 41.1667 45.5H32.5C30.1068 45.5 28.1667 43.5599 28.1667 41.1667V32.5C28.1667 30.1068 30.1068 28.1667 32.5 28.1667Z"
        className={`electric-stroke ${isActive ? 'active' : ''}`}
        stroke="cyan"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#electric-glow)"
      />
    </svg>
  )
}

/**
 * Demo wrapper with hover state for testing the electric effect.
 * Wrap this around a colored circle background to see the full effect.
 */
export function ElectricIconDemo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-[120px] h-[120px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colored circle background */}
      <div
        className="absolute inset-2 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#324B8C' }}
      >
        <ElectricIconAutomate isActive={isHovered} />
      </div>
    </div>
  )
}
