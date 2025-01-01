'use server'

import { createCanvas, loadImage } from 'canvas'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'

export async function generateSchedule(formData: FormData) {
  const sport = formData.get('sport') as string
  const team1 = formData.get('team1') as string
  const team2 = formData.get('team2') as string
  const captain1 = formData.get('captain1') as string
  const captain2 = formData.get('captain2') as string
  const time = formData.get('time') as string
  const category = formData.get('category') as string
  const template = formData.get('template') as File

  const templateBuffer = Buffer.from(await template.arrayBuffer())
  const outputId = uuidv4()

  // Load the template image
  const image = await loadImage(templateBuffer)
  const canvas = createCanvas(image.width, image.height)
  const ctx = canvas.getContext('2d')

  // Draw the template image
  ctx.drawImage(image, 0, 0)

  // Set font styles
  ctx.textAlign = 'center'
  
  // Draw title
  ctx.font = 'bold 48px Arial'
  ctx.fillStyle = '#0066cc'
  ctx.fillText('Inter Faculty', canvas.width / 2, 100)
  
  // Draw sport name and category
  ctx.font = 'bold 36px Arial'
  ctx.fillText(`${sport.toUpperCase()} (${category})`, canvas.width / 2, 200)

  // Draw teams section
  ctx.font = 'bold 42px Arial'
  ctx.fillStyle = '#ff6b33'
  
  // Team names
  const centerX = canvas.width / 2
  const vsWidth = 100
  
  ctx.fillText(team1, centerX - 200, 300)
  ctx.fillText('VS', centerX, 300)
  ctx.fillText(team2, centerX + 200, 300)

  // Draw captains
  ctx.font = '24px Arial'
  ctx.fillStyle = '#0066cc'
  ctx.fillText(captain1, centerX - 200, 340)
  ctx.fillText(captain2, centerX + 200, 340)

  // Draw time
  ctx.font = 'bold 32px Arial'
  ctx.fillStyle = '#0066cc'
  ctx.fillText(time, centerX, 450)

  // Save the image
  const outputDir = path.join(process.cwd(), 'public', 'generated')
  await fs.mkdir(outputDir, { recursive: true })
  const outputBuffer = canvas.toBuffer('image/png')
  await fs.writeFile(path.join(outputDir, `${outputId}.png`), outputBuffer)

  return { id: outputId }
}

