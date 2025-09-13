"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  children: React.ReactNode
  className?: string
  onItemClick?: () => void
}

export function MobileMenu({ children, className, onItemClick }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)

  const handleItemClick = () => {
    setOpen(false)
    onItemClick?.()
  }

  return (
    <>
      <Button
        variant="ghost"
        className={cn("md:hidden p-2 h-auto", className)}
        size="sm"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="fixed top-full inset-x-0 bg-white border-t shadow-lg z-[60] md:hidden">
          <div className="w-full px-4 py-4 space-y-4 max-w-none" onClick={handleItemClick}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}