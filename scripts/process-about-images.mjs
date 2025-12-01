import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Source directory with big about images (note the space in folder name)
const SOURCE_DIR = '/Users/adrozdenko/Desktop/bgs/about/Big '
const OUTPUT_DIR = 'src/assets/optimized/about'
const PLACEHOLDER_DIR = 'src/assets/optimized/placeholders'

// Image mapping: source filename -> output name prefix
const IMAGE_MAP = {
  'mission.png': 'our-mission',
  'our_values.png': 'our-values',
  'partners.png': 'partners',
  'proof.png': 'proof-at-glance',
  'story.png': 'our-story',
  'vision.png': 'our-vision',
}

// Size configurations
const SIZES = {
  mobile: { width: 500, height: 280 },
  tablet: { width: 800, height: 448 },
  desktop: { width: 1200, height: 672 },
}

// Quality settings
const QUALITY = {
  mobile: { webp: 88, avif: 78, png: 88 },
  tablet: { webp: 85, avif: 75, png: 85 },
  desktop: { webp: 82, avif: 72, png: 82 },
}

// Placeholder settings
const PLACEHOLDER = {
  width: 20,
  blur: 5,
  quality: 20,
}

async function processImage(sourcePath, outputName, outputDir) {
  console.log(`\nProcessing: ${outputName}`)

  const image = sharp(sourcePath)
  const metadata = await image.metadata()
  console.log(`  Source: ${metadata.width}x${metadata.height}`)

  for (const [sizeName, dimensions] of Object.entries(SIZES)) {
    const quality = QUALITY[sizeName]
    const outputBase = `${outputName}-${sizeName}`

    const resizeOptions = {
      width: dimensions.width,
      height: dimensions.height,
      fit: 'cover',
      position: 'center',
    }

    // WebP
    await sharp(sourcePath)
      .resize(resizeOptions)
      .webp({ quality: quality.webp })
      .toFile(join(outputDir, `${outputBase}.webp`))

    // AVIF
    await sharp(sourcePath)
      .resize(resizeOptions)
      .avif({ quality: quality.avif })
      .toFile(join(outputDir, `${outputBase}.avif`))

    // PNG fallback
    await sharp(sourcePath)
      .resize(resizeOptions)
      .png({ quality: quality.png, compressionLevel: 8 })
      .toFile(join(outputDir, `${outputBase}.png`))

    console.log(`  ✓ ${sizeName} (${dimensions.width}x${dimensions.height})`)
  }

  // Generate placeholder for desktop version
  const placeholderPath = join(PLACEHOLDER_DIR, `${outputName}-desktop-placeholder.webp`)
  const aspectRatio = SIZES.desktop.height / SIZES.desktop.width
  const placeholderHeight = Math.round(PLACEHOLDER.width * aspectRatio)

  await sharp(sourcePath)
    .resize(PLACEHOLDER.width, placeholderHeight)
    .blur(PLACEHOLDER.blur)
    .webp({ quality: PLACEHOLDER.quality })
    .toFile(placeholderPath)

  console.log(`  ✓ placeholder (${PLACEHOLDER.width}x${placeholderHeight})`)
}

async function main() {
  console.log('Processing about page images...')
  console.log(`Source: ${SOURCE_DIR}`)
  console.log(`Output: ${OUTPUT_DIR}\n`)

  // Ensure output directories exist
  await mkdir(OUTPUT_DIR, { recursive: true })
  await mkdir(PLACEHOLDER_DIR, { recursive: true })

  // Process each image
  for (const [sourceFile, outputName] of Object.entries(IMAGE_MAP)) {
    const sourcePath = join(SOURCE_DIR, sourceFile)

    if (!existsSync(sourcePath)) {
      console.log(`⚠ Skipping ${sourceFile} - not found`)
      continue
    }

    try {
      await processImage(sourcePath, outputName, OUTPUT_DIR)
    } catch (err) {
      console.error(`✗ Failed to process ${sourceFile}:`, err.message)
    }
  }

  console.log('\n✅ About page image processing complete!')
}

main().catch(console.error)
