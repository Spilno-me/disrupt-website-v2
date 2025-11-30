import { ReactNode } from 'react'
import './ElectricIcon.css'

interface ElectricInputWrapperProps {
  children: ReactNode
}

/**
 * Wrapper component that adds electric border effect to inputs on focus.
 * Uses animated gradient that flows around the border like electricity.
 */
export function ElectricInputWrapper({ children }: ElectricInputWrapperProps) {
  return (
    <div className="electric-input-wrapper">
      {children}
    </div>
  )
}

interface ElectricButtonWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper component that adds electric border effect to buttons on hover.
 * Uses animated gradient that flows around the border like electricity.
 */
export function ElectricButtonWrapper({ children, className = '' }: ElectricButtonWrapperProps) {
  return (
    <div className={`electric-button-wrapper ${className}`}>
      {children}
    </div>
  )
}
