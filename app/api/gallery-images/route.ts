import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images')
    const files = await readdir(imagesDir)
    
    // Filter for image files; exclude only site assets (logo, hero background)
    const imageExtensions = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG']
    const excludeFromGallery = ['logo.svg', 'bg_cropped.jpg', 'bg_cropped2.jpg']
    const imageFiles = files.filter(file =>
      imageExtensions.some(ext => file.endsWith(ext)) && !excludeFromGallery.includes(file)
    )
    
    // Get file stats and sort by modification time (most recent first)
    const imagesWithStats = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = join(imagesDir, file)
        const stats = await stat(filePath)
        return {
          src: `/images/${file}`,
          mtime: stats.mtime.getTime(), // Modification time as timestamp
        }
      })
    )
    
    // Sort by most recent first (descending)
    imagesWithStats.sort((a, b) => b.mtime - a.mtime)
    
    // Return just the sorted image paths
    const sortedImages = imagesWithStats.map(img => img.src)
    
    return NextResponse.json({ images: sortedImages })
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 })
  }
}
