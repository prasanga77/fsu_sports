import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
  }

  const inputPath = path.join(process.cwd(), 'public', 'generated', `${id}.png`)
  
  try {
    const inputBuffer = await fs.readFile(inputPath)
    const outputBuffer = await sharp(inputBuffer).jpeg().toBuffer()
    
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${id}.jpg"`,
      },
    })
  } catch (error) {
    console.error('Error converting image:', error)
    return NextResponse.json({ error: 'Failed to convert image' }, { status: 500 })
  }
}

