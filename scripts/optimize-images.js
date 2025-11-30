import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, parse } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const INPUT_DIR = join(__dirname, '../src/assets/figma')
const OUTPUT_DIR = join(__dirname, '../src/assets/optimized')

const SIZES = {
  mobile: 640,    // Increased from 480 for sharper mobile images
  tablet: 768,
  desktop: 1200,
}

// Hero frames need higher resolution since they're the main visual
const HERO_SIZES = {
  mobile: 800,    // Higher res for hero on mobile (retina displays)
  tablet: 1024,
  desktop: 1600,
}

// SVG render density - higher = sharper rasterization
const SVG_DENSITY = 300  // High DPI for crisp hexagon patterns

// Quality settings per size - mobile needs higher quality
const QUALITY = {
  mobile: {
    webp: 90,     // Higher quality for mobile (visible on sharp screens)
    avif: 82,
    png: 90,
  },
  tablet: {
    webp: 85,
    avif: 75,
    png: 85,
  },
  desktop: {
    webp: 82,
    avif: 70,
    png: 80,
  },
}

async function processImage(inputPath, outputDir, name) {
  console.log(`Processing: ${name}`)

  const image = sharp(inputPath)
  const metadata = await image.metadata()

  for (const [sizeName, width] of Object.entries(SIZES)) {
    if (metadata.width && width > metadata.width) continue

    const outputName = `${name}-${sizeName}`
    const quality = QUALITY[sizeName]

    // Use lower compression for mobile to preserve quality
    const compressionLevel = sizeName === 'mobile' ? 6 : 9

    // WebP (best compression for photos)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: quality.webp })
      .toFile(join(outputDir, `${outputName}.webp`))

    // AVIF (even better compression, newer format)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .avif({ quality: quality.avif })
      .toFile(join(outputDir, `${outputName}.avif`))

    // Fallback PNG (optimized)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .png({ quality: quality.png, compressionLevel })
      .toFile(join(outputDir, `${outputName}.png`))

    console.log(`  ✓ ${sizeName} (${width}px) - webp:${quality.webp}% avif:${quality.avif}% png:${quality.png}%`)
  }

  console.log('')
}

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  await mkdir(join(OUTPUT_DIR, 'about'), { recursive: true })

  // Process main directory images
  const files = await readdir(INPUT_DIR)
  const pngFiles = files.filter(f =>
    f.endsWith('.png') && (f.includes('feature') || f.includes('who-we-help'))
  )

  console.log(`Found ${pngFiles.length} main images to optimize\n`)

  for (const file of pngFiles) {
    const inputPath = join(INPUT_DIR, file)
    const { name } = parse(file)
    await processImage(inputPath, OUTPUT_DIR, name)
  }

  // Process about directory images
  const aboutDir = join(INPUT_DIR, 'about')
  try {
    const aboutFiles = await readdir(aboutDir)
    const aboutPngFiles = aboutFiles.filter(f => f.endsWith('.png'))

    console.log(`Found ${aboutPngFiles.length} about images to optimize\n`)

    for (const file of aboutPngFiles) {
      const inputPath = join(aboutDir, file)
      const { name } = parse(file)
      await processImage(inputPath, join(OUTPUT_DIR, 'about'), name)
    }
  } catch (e) {
    console.log('No about directory found, skipping...')
  }

  // Process hero-frame SVG to PNG/WebP/AVIF - use higher resolution
  const heroFramePath = join(INPUT_DIR, 'hero-frame.svg')
  try {
    console.log('Processing: hero-frame.svg (high quality)')
    for (const [sizeName, width] of Object.entries(HERO_SIZES)) {
      const quality = QUALITY[sizeName]
      const compressionLevel = sizeName === 'mobile' ? 4 : 6  // Even lower compression for hero

      // WebP
      await sharp(heroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: Math.min(quality.webp + 5, 95) })  // Boost quality for hero
        .toFile(join(OUTPUT_DIR, `hero-frame-${sizeName}.webp`))

      // AVIF
      await sharp(heroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: Math.min(quality.avif + 8, 90) })  // Boost quality for hero
        .toFile(join(OUTPUT_DIR, `hero-frame-${sizeName}.avif`))

      // PNG fallback
      await sharp(heroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .png({ compressionLevel })
        .toFile(join(OUTPUT_DIR, `hero-frame-${sizeName}.png`))

      console.log(`  ✓ ${sizeName} (${width}px @ ${SVG_DENSITY}dpi)`)
    }
    console.log('')
  } catch (e) {
    console.log('Could not process hero-frame.svg:', e.message)
  }

  // Process about-hero-frame SVG - use higher resolution
  const aboutHeroFramePath = join(INPUT_DIR, 'about-hero-frame.svg')
  try {
    console.log('Processing: about-hero-frame.svg (high quality)')
    for (const [sizeName, width] of Object.entries(HERO_SIZES)) {
      const quality = QUALITY[sizeName]
      const compressionLevel = sizeName === 'mobile' ? 4 : 6

      // WebP
      await sharp(aboutHeroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: Math.min(quality.webp + 5, 95) })
        .toFile(join(OUTPUT_DIR, 'about', `about-hero-${sizeName}.webp`))

      // AVIF
      await sharp(aboutHeroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: Math.min(quality.avif + 8, 90) })
        .toFile(join(OUTPUT_DIR, 'about', `about-hero-${sizeName}.avif`))

      // PNG fallback
      await sharp(aboutHeroFramePath, { density: SVG_DENSITY })
        .resize(width, null, { withoutEnlargement: true })
        .png({ compressionLevel })
        .toFile(join(OUTPUT_DIR, 'about', `about-hero-${sizeName}.png`))

      console.log(`  ✓ ${sizeName} (${width}px @ ${SVG_DENSITY}dpi)`)
    }
    console.log('')
  } catch (e) {
    console.log('Could not process about-hero-frame.svg:', e.message)
  }

  console.log('Image optimization complete!')
}

optimizeImages().catch(console.error)
