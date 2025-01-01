import { redirect } from 'next/navigation'
import SportForm from '@/app/components/SportForm'
import { generateResult } from '@/app/actions/generateResult'

export default function GenerateResultPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await generateResult(formData)
    redirect(`/display/${result.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Generate Result</h1>
      <SportForm type="result" onSubmit={handleSubmit} />
    </div>
  )
}

