import gsap from 'gsap'
import { TIMING, PIXELS, PIXEL_OFFSETS, REPEL } from './animation-config'
import { PixelAnimator, Position } from './PixelAnimator'
import { CursorStateMachine } from './CursorStateMachine'
import { IdleAnimationHandler } from './IdleAnimationHandler'
import { ExcitedAnimationHandler } from './ExcitedAnimationHandler'
import { DisruptAnimationOrchestrator } from './DisruptAnimationOrchestrator'

/**
 * Main controller that coordinates all cursor animation behaviors.
 * Acts as a facade for the animation subsystem.
 */
export class CursorAnimationController {
  private animators: PixelAnimator[] = []
  private stateMachine = new CursorStateMachine()
  private idleHandler = new IdleAnimationHandler()
  private excitedHandler = new ExcitedAnimationHandler()
  private disruptOrchestrator = new DisruptAnimationOrchestrator()
  private idleTimeout: ReturnType<typeof setTimeout> | null = null
  private mousePosition: Position = { x: 0, y: 0 }

  // Repel state - using boolean flags for clarity
  private isRepelling = false
  private isScattering = false
  private isReturningFromRepel = false
  private scatterOffsets: Position[] = []

  initialize(elements: HTMLDivElement[]): void {
    this.animators = elements.map((element, index) => {
      const config = PIXELS[index]
      const animator = new PixelAnimator(element, config.delay)
      animator.setTransform({ x: 0, y: 0, scale: 1, rotation: 0 })
      gsap.set(element, { opacity: 0 })
      return animator
    })
  }

  cleanup(): void {
    this.clearIdleTimeout()
    this.idleHandler.stop()
    this.excitedHandler.stop()
    this.disruptOrchestrator.kill()
    this.animators.forEach(animator => animator.killAllTweens())
    this.animators = []
  }

  updateMousePosition(position: Position): void {
    this.mousePosition = position

    if (this.stateMachine.isIdle()) {
      this.exitIdle()
    }

    this.resetIdleTimeout()
    this.updatePixelPositions()
  }

  handleInteractiveHover(isInteractive: boolean): void {
    if (this.stateMachine.isDisrupting()) return

    if (isInteractive) {
      this.enterExcited()
    } else {
      this.exitExcited()
    }
  }

  triggerDisrupt(): void {
    if (this.isRepelling) return
    if (!this.stateMachine.transitionTo('disrupting')) return

    this.clearIdleTimeout()
    this.idleHandler.stop()
    this.excitedHandler.stop()

    this.disruptOrchestrator.create(
      this.animators,
      this.mousePosition,
      () => this.onDisruptComplete()
    )
  }

  showPixels(): void {
    this.animators.forEach(animator => animator.fadeIn())
  }

  hidePixels(): void {
    this.clearIdleTimeout()
    this.idleHandler.stop()
    this.excitedHandler.stop()
    this.stateMachine.reset()
    this.animators.forEach(animator => animator.fadeOut())
  }

  isExcited(): boolean {
    return this.excitedHandler.isActive()
  }

  handleRepel(shouldRepel: boolean): void {
    if (shouldRepel && !this.isRepelling) {
      // Start repel - scatter the pixels
      this.startScatter()
    } else if (shouldRepel && this.isReturningFromRepel) {
      // User re-entered repel area while returning - restart scatter
      this.startScatter()
    } else if (!shouldRepel && this.isRepelling) {
      // End repel - return the pixels (can interrupt scatter if needed)
      this.startReturn()
    }
  }

  private startScatter(): void {
    this.isRepelling = true
    this.isScattering = true
    this.isReturningFromRepel = false
    this.clearIdleTimeout()
    this.idleHandler.stop()
    this.excitedHandler.stop()

    // Kill any existing tweens
    this.animators.forEach(animator => animator.killAllTweens())

    // Calculate scatter offsets for each pixel
    this.scatterOffsets = this.animators.map((_, index) => {
      const baseAngle = (index / this.animators.length) * Math.PI * 2
      const angleVariance = (Math.random() - 0.5) * REPEL.ANGLE_VARIANCE * 2
      const angle = baseAngle + angleVariance
      const distance = REPEL.MIN_DISTANCE + Math.random() * (REPEL.MAX_DISTANCE - REPEL.MIN_DISTANCE)

      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      }
    })

    // Animate scatter
    let completedCount = 0
    const totalPixels = this.animators.length

    this.animators.forEach((animator, index) => {
      const offset = PIXEL_OFFSETS[index]
      const scatter = this.scatterOffsets[index]

      const targetX = this.mousePosition.x + offset.x + scatter.x
      const targetY = this.mousePosition.y + offset.y + scatter.y

      gsap.to(animator.getElement(), {
        x: targetX,
        y: targetY,
        scale: REPEL.FINAL_SCALE,
        rotation: (Math.random() - 0.5) * REPEL.MAX_ROTATION,
        opacity: 0,
        duration: REPEL.EXPLODE_DURATION,
        ease: 'power2.out',
        onComplete: () => {
          animator.reinitializeQuickTo()
          completedCount++

          if (completedCount === totalPixels) {
            this.isScattering = false
          }
        },
      })
    })
  }

  private startReturn(): void {
    this.isReturningFromRepel = true
    this.isScattering = false  // In case we're interrupting a scatter

    // Kill any existing tweens
    this.animators.forEach(animator => animator.killAllTweens())

    let completedCount = 0
    const totalPixels = this.animators.length

    this.animators.forEach((animator, index) => {
      const pixelConfig = PIXELS[index]
      const offset = PIXEL_OFFSETS[index]
      const returnDuration = REPEL.FADE_IN_DURATION + pixelConfig.delay * REPEL.STAGGER_MULTIPLIER

      // Calculate target position (home position around mouse)
      const targetX = this.mousePosition.x + offset.x
      const targetY = this.mousePosition.y + offset.y

      // Animate pixel directly to target position (from wherever it currently is)
      gsap.to(animator.getElement(), {
        x: targetX,
        y: targetY,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: returnDuration,
        ease: 'power2.out',
        onComplete: () => {
          completedCount++

          if (completedCount === totalPixels) {
            // All pixels have returned - reinitialize quickTo for normal following
            this.animators.forEach(a => a.reinitializeQuickTo())
            this.scatterOffsets = []
            this.isRepelling = false
            this.isReturningFromRepel = false
            this.stateMachine.transitionTo('following')
            this.resetIdleTimeout()
          }
        },
      })
    })
  }

  private updatePixelPositions(): void {
    // Don't update during disrupting, scattering, or returning (return handles its own position updates)
    if (this.stateMachine.isDisrupting()) return
    if (this.isScattering) return
    if (this.isReturningFromRepel) return

    this.animators.forEach((animator, index) => {
      const offset = PIXEL_OFFSETS[index]

      // Apply scatter offset if we're in repel state
      let scatterX = 0
      let scatterY = 0
      if (this.isRepelling && this.scatterOffsets[index]) {
        scatterX = this.scatterOffsets[index].x
        scatterY = this.scatterOffsets[index].y
      }

      const position = {
        x: this.mousePosition.x + offset.x + scatterX,
        y: this.mousePosition.y + offset.y + scatterY,
      }
      animator.moveTo(position)
    })
  }

  private enterIdle(): void {
    if (!this.stateMachine.transitionTo('idle')) return
    this.idleHandler.start(this.animators)
  }

  private exitIdle(): void {
    this.idleHandler.stop()

    this.animators.forEach(animator => {
      const current = animator.getCurrentTransform()
      animator.reinitializeQuickTo()
      animator.setTransform({ x: current.x, y: current.y })
      animator.resetTransform()
    })

    this.stateMachine.transitionTo('following')
  }

  private enterExcited(): void {
    if (this.excitedHandler.isActive()) return

    if (this.stateMachine.isIdle()) {
      this.exitIdle()
    }

    this.excitedHandler.start(this.animators)
  }

  private exitExcited(): void {
    this.excitedHandler.stopWithReset(this.animators)
  }

  private onDisruptComplete(): void {
    this.stateMachine.transitionTo('following')
    this.animators.forEach(animator => animator.reinitializeQuickTo())
    this.updatePixelPositions()
  }

  private resetIdleTimeout(): void {
    this.clearIdleTimeout()

    this.idleTimeout = setTimeout(() => {
      if (this.canEnterIdle()) {
        this.enterIdle()
      }
    }, TIMING.IDLE_TRIGGER_DELAY_MS)
  }

  private canEnterIdle(): boolean {
    return this.stateMachine.isFollowing() &&
           !this.excitedHandler.isActive() &&
           !this.isRepelling
  }

  private clearIdleTimeout(): void {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout)
      this.idleTimeout = null
    }
  }
}
