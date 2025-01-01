import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DisplayPage({ params }: { params: { id: string } }) {
  const [jpgUrl, setJpgUrl] = useState<string | null>(null)

  useEffect(() => {
    const convertToJpg = async () => {
      const response = await fetch(`/api/convert-to-jpg?id=${params.id}`)
      const blob = await response.blob()
      setJpgUrl(URL.createObjectURL(blob))
    }
    convertToJpg()
  }, [params.id])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Generated Output</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Image
          src={`/generated/${params.id}.png`}
          alt="Generated Schedule or Result"
          width={800}
          height={600}
        />
      </div>
      <div className="mt-6 space-x-4">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
        <Link href={`/generated/${params.id}.png`} download>
          <Button>Download PNG</Button>
        </Link>
        {jpgUrl && (
          <Link href={jpgUrl} download={`${params.id}.jpg`}>
            <Button>Download JPG</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

