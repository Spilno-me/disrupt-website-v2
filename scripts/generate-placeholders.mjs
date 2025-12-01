import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { existsSync } from 'fs'

const PLACEHOLDER_WIDTH = 20 // Tiny size for blur effect
const BLUR_AMOUNT = 5
const QUALITY = 20

const SOURCE_DIRS = [
  { src: 'src/assets/optimized', pattern: /hero-frame.*\.png$/ },
  { src: 'src/assets/optimized/product', pattern: /product-hero.*\.png$/ },
  { src: 'src/assets/optimized/about', pattern: /about-hero.*\.png$/ },
]

const OUTPUT_DIR = 'src/assets/optimized/placeholders'

async function generatePlaceholder(inputPath, outputPath) {
  const image = sharp(inputPath)
  const metadata = await image.metadata()

  // Calculate height to maintain aspect ratio
  const aspectRatio = metadata.height / metadata.width
  const height = Math.round(PLACEHOLDER_WIDTH * aspectRatio)

  await image
    .resize(PLACEHOLDER_WIDTH, height)
    .blur(BLUR_AMOUNT)
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  const stats = await sharp(outputPath).metadata()
  console.log(`✓ ${basename(outputPath)} (${PLACEHOLDER_WIDTH}x${height})`)
}

async function main() {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }

  console.log('Generating blur placeholders...\n')

  for (const { src, pattern } of SOURCE_DIRS) {
    if (!existsSync(src)) continue

    const files = await readdir(src)
    const heroFiles = files.filter(f => pattern.test(f))

    for (const file of heroFiles) {
      const inputPath = join(src, file)
      const outputName = basename(file, extname(file)) + '-placeholder.webp'
      const outputPath = join(OUTPUT_DIR, outputName)

      try {
        await generatePlaceholder(inputPath, outputPath)
      } catch (err) {
        console.error(`✗ Failed: ${file}`, err.message)
      }
    }
  }

  console.log('\nDone! Placeholders saved to:', OUTPUT_DIR)
}

main().catch(console.error)
