/**
 * ═══════════════════════════════════════════════════════════════════
 *                      CURSOR PIXELS ANIMATION
 * ═══════════════════════════════════════════════════════════════════
 *
 * A smooth, organic cursor-following effect with idle floating,
 * excited jitter on hover, and explosion on click.
 *
 * Created by Andrii Drozdenko
 * Crafted with love by DisruptInc.io
 * https://disruptinc.io
 *
 * Sharing is caring! Feel free to use, modify, and share.
 * A little credit goes a long way. Cheers!
 *
 * ═══════════════════════════════════════════════════════════════════
 */

// ============ CONFIGURATION ============
const CONFIG = {
  // Pixel definitions
  pixels: [
    { width: 12, height: 12, rx: 2, color: '#F70D1A', delay: 0.02 },
    { width: 10, height: 10, rx: 2, color: '#F70D1A', delay: 0.06 },
    { width: 14, height: 14, rx: 3, color: '#F70D1A', delay: 0.10 },
    { width: 8, height: 8, rx: 1.5, color: '#2D3142', delay: 0.04 },
    { width: 6, height: 6, rx: 1, color: '#2D3142', delay: 0.08 },
    { width: 6, height: 6, rx: 1, color: '#2D3142', delay: 0.12 },
    { width: 7, height: 7, rx: 1.5, color: '#2D3142', delay: 0.14 },
  ],

  // Offset positions relative to cursor
  offsets: [
    { x: 5, y: 28 },
    { x: -12, y: 38 },
    { x: 14, y: 45 },
    { x: -4, y: 55 },
    { x: 8, y: 65 },
    { x: -10, y: 75 },
    { x: 3, y: 85 },
  ],

  // Timing
  idleTriggerDelay: 600,
  fadeDuration: 0.4,
  disruptDuration: 0.5,

  // Idle animation
  idle: {
    xRangeMin: 6, xRangeMax: 12,
    yRangeMin: 8, yRangeMax: 14,
    durationMin: 2, durationMax: 3.5,
    staggerDelay: 0.1,
    maxRotation: 10,
  },

  // Excited animation
  excited: {
    scaleMin: 1.08, scaleMax: 1.16,
    maxRotation: 12,
    durationBase: 0.25,
    durationVariance: 0.15,
  },

  // Explosion animation
  explosion: {
    minDistance: 30, maxDistance: 60,
    minScale: 1.1, maxScale: 1.25,
    maxRotation: 90,
    settleBlend: 0.85,
    phases: { explode: 0.22, settle: 0.28, return: 0.5 },
  },
};

// ============ STATE ============
let state = 'following'; // 'following' | 'idle' | 'disrupting'
let isExcited = false;
let mousePos = { x: 0, y: 0 };
let idleTimeout = null;
let idleTweens = [];
let excitedTweens = [];
let disruptTimeline = null;
let pixelAnimators = [];

// ============ UTILITY FUNCTIONS ============
function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function randomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

function randomCentered(maxAbsValue) {
  return (Math.random() - 0.5) * maxAbsValue;
}

function calculateQuickToDuration(delay) {
  return 0.3 + delay * 2;
}

// ============ PIXEL ANIMATOR CLASS ============
class PixelAnimator {
  constructor(element, config, index) {
    this.element = element;
    this.config = config;
    this.index = index;
    this.initializeQuickTo();
    this.applyStyles();
  }

  applyStyles() {
    this.element.style.width = this.config.width + 'px';
    this.element.style.height = this.config.height + 'px';
    this.element.style.borderRadius = this.config.rx + 'px';
    this.element.style.backgroundColor = this.config.color;
  }

  initializeQuickTo() {
    const duration = calculateQuickToDuration(this.config.delay);
    this.quickX = gsap.quickTo(this.element, 'x', { duration, ease: 'power3.out' });
    this.quickY = gsap.quickTo(this.element, 'y', { duration, ease: 'power3.out' });
  }

  moveTo(x, y) {
    this.quickX(x);
    this.quickY(y);
  }

  getCurrentTransform() {
    return {
      x: gsap.getProperty(this.element, 'x') || 0,
      y: gsap.getProperty(this.element, 'y') || 0,
      scale: gsap.getProperty(this.element, 'scale') || 1,
      rotation: gsap.getProperty(this.element, 'rotation') || 0,
    };
  }

  fadeIn() {
    gsap.to(this.element, { opacity: 1, duration: CONFIG.fadeDuration, ease: 'power2.out' });
  }

  fadeOut() {
    gsap.to(this.element, { opacity: 0, duration: CONFIG.fadeDuration, ease: 'power2.out' });
  }

  resetTransform() {
    gsap.to(this.element, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  }

  killAllTweens() {
    gsap.killTweensOf(this.element);
  }
}

// ============ IDLE ANIMATION ============
function startIdle() {
  if (state !== 'following') return;
  state = 'idle';

  const cfg = CONFIG.idle;

  pixelAnimators.forEach((animator, i) => {
    const xRange = randomInRange(cfg.xRangeMin, cfg.xRangeMax);
    const yRange = randomInRange(cfg.yRangeMin, cfg.yRangeMax);
    const duration = randomInRange(cfg.durationMin, cfg.durationMax);
    const delay = i * cfg.staggerDelay;

    const tween = gsap.to(animator.element, {
      x: `+=${xRange * randomDirection()}`,
      y: `+=${yRange * randomDirection()}`,
      rotation: randomCentered(cfg.maxRotation),
      duration,
      delay,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    idleTweens.push(tween);
  });
}

function stopIdle() {
  if (state !== 'idle') return;

  idleTweens.forEach(t => t.kill());
  idleTweens = [];

  pixelAnimators.forEach(animator => {
    const current = animator.getCurrentTransform();
    animator.initializeQuickTo();
    gsap.set(animator.element, { x: current.x, y: current.y });
    animator.resetTransform();
  });

  state = 'following';
}

// ============ EXCITED ANIMATION ============
function startExcited() {
  if (state === 'disrupting' || isExcited) return;
  isExcited = true;

  if (state === 'idle') stopIdle();

  const cfg = CONFIG.excited;

  pixelAnimators.forEach(animator => {
    const duration = cfg.durationBase + Math.random() * cfg.durationVariance;
    const scale = randomInRange(cfg.scaleMin, cfg.scaleMax);
    const rotation = randomCentered(cfg.maxRotation);

    const tween = gsap.to(animator.element, {
      scale,
      rotation,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      overwrite: 'auto',
    });

    excitedTweens.push(tween);
  });
}

function stopExcited() {
  if (!isExcited) return;
  isExcited = false;

  excitedTweens.forEach(t => t.kill());
  excitedTweens = [];

  pixelAnimators.forEach(animator => animator.resetTransform());
}

// ============ DISRUPT ANIMATION ============
function playDisrupt() {
  if (state === 'disrupting') return;

  // Clean up
  if (state === 'idle') {
    idleTweens.forEach(t => t.kill());
    idleTweens = [];
  }
  if (isExcited) {
    excitedTweens.forEach(t => t.kill());
    excitedTweens = [];
    isExcited = false;
  }

  state = 'disrupting';

  if (disruptTimeline) disruptTimeline.kill();

  const cfg = CONFIG.explosion;
  const masterTl = gsap.timeline({
    onComplete: () => {
      disruptTimeline = null;
      state = 'following';
      pixelAnimators.forEach(animator => animator.initializeQuickTo());
      updatePositions();
    },
  });

  disruptTimeline = masterTl;

  pixelAnimators.forEach((animator, index) => {
    const offset = CONFIG.offsets[index];
    const current = animator.getCurrentTransform();
    const homeX = mousePos.x + offset.x;
    const homeY = mousePos.y + offset.y;

    // Random explosion
    const angle = Math.random() * Math.PI * 2;
    const distance = randomInRange(cfg.minDistance, cfg.maxDistance);
    const explodeX = current.x + Math.cos(angle) * distance;
    const explodeY = current.y + Math.sin(angle) * distance;
    const explodeScale = Math.max(current.scale, 1) * randomInRange(cfg.minScale, cfg.maxScale);
    const explodeRotation = current.rotation + randomCentered(cfg.maxRotation);

    const pixelTl = gsap.timeline();

    // Phase 1: Explode
    pixelTl.to(animator.element, {
      x: explodeX,
      y: explodeY,
      scale: explodeScale,
      rotation: explodeRotation,
      duration: CONFIG.disruptDuration * cfg.phases.explode,
      ease: 'power2.out',
    });

    // Phase 2: Settle
    pixelTl.to(animator.element, {
      x: explodeX * cfg.settleBlend + homeX * (1 - cfg.settleBlend),
      y: explodeY * cfg.settleBlend + homeY * (1 - cfg.settleBlend),
      scale: explodeScale * 0.95,
      rotation: explodeRotation * 0.9,
      duration: CONFIG.disruptDuration * cfg.phases.settle,
      ease: 'power1.inOut',
    });

    // Phase 3: Return home
    pixelTl.to(animator.element, {
      x: homeX,
      y: homeY,
      scale: 1,
      rotation: 0,
      duration: CONFIG.disruptDuration * cfg.phases.return,
      ease: 'power2.inOut',
    });

    masterTl.add(pixelTl, 0);
  });
}

// ============ POSITION UPDATES ============
function updatePositions() {
  if (state === 'disrupting') return;

  pixelAnimators.forEach((animator, index) => {
    const offset = CONFIG.offsets[index];
    animator.moveTo(mousePos.x + offset.x, mousePos.y + offset.y);
  });
}

function resetIdleTimeout() {
  if (idleTimeout) clearTimeout(idleTimeout);

  idleTimeout = setTimeout(() => {
    if (state === 'following' && !isExcited) {
      startIdle();
    }
  }, CONFIG.idleTriggerDelay);
}

// ============ EVENT HANDLERS ============
function handleMouseMove(e) {
  mousePos = { x: e.clientX, y: e.clientY };

  // Check for interactive elements
  const target = e.target;
  const isInteractive = target.closest('a, button, [role="button"]');

  if (isInteractive) {
    startExcited();
  } else if (isExcited) {
    stopExcited();
  }

  if (state === 'idle') stopIdle();

  resetIdleTimeout();
  updatePositions();
}

function handleMouseEnter() {
  pixelAnimators.forEach(animator => animator.fadeIn());
}

function handleMouseLeave() {
  if (idleTimeout) clearTimeout(idleTimeout);
  if (state === 'idle') {
    idleTweens.forEach(t => t.kill());
    idleTweens = [];
  }
  stopExcited();
  state = 'following';
  pixelAnimators.forEach(animator => animator.fadeOut());
}

function handleClick() {
  playDisrupt();
}

// ============ INITIALIZATION ============
function init() {
  // Check for touch device
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.querySelector('.cursor-pixels-container').style.display = 'none';
    return;
  }

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelector('.cursor-pixels-container').style.display = 'none';
    return;
  }

  // Initialize pixel animators
  const pixelElements = document.querySelectorAll('.cursor-pixel');

  pixelElements.forEach((element, index) => {
    const config = CONFIG.pixels[index];
    const animator = new PixelAnimator(element, config, index);
    gsap.set(element, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 });
    pixelAnimators.push(animator);
  });

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseenter', handleMouseEnter);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('click', handleClick);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
