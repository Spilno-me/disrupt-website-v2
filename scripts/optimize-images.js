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
  mobile: 480,
  tablet: 768,
  desktop: 1200,
}

const QUALITY = {
  webp: 82,
  avif: 70,
  png: 80,
}

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const pngFiles = files.filter(f => f.endsWith('.png') && f.includes('feature') || f.includes('who-we-help'))

  console.log(`Found ${pngFiles.length} images to optimize\n`)

  for (const file of pngFiles) {
    const inputPath = join(INPUT_DIR, file)
    const { name } = parse(file)

    console.log(`Processing: ${file}`)

    const image = sharp(inputPath)
    const metadata = await image.metadata()

    for (const [sizeName, width] of Object.entries(SIZES)) {
      if (metadata.width && width > metadata.width) continue

      const outputName = `${name}-${sizeName}`

      // WebP (best compression for photos)
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY.webp })
        .toFile(join(OUTPUT_DIR, `${outputName}.webp`))

      // AVIF (even better compression, newer format)
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: QUALITY.avif })
        .toFile(join(OUTPUT_DIR, `${outputName}.avif`))

      // Fallback PNG (optimized)
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(join(OUTPUT_DIR, `${outputName}.png`))

      console.log(`  ✓ ${sizeName} (${width}px)`)
    }

    console.log('')
  }

  console.log('Image optimization complete!')
}

optimizeImages().catch(console.error)
