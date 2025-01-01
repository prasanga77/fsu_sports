import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Sports Schedule and Result Generator</h1>
      <div className="space-x-4">
        <Link href="/generate/schedule">
          <Button size="lg">Generate Schedule</Button>
        </Link>
        <Link href="/generate/result">
          <Button size="lg">Generate Result</Button>
        </Link>
      </div>
    </div>
  )
}

