import { redirect } from 'next/navigation'
import SportForm from '@/app/components/SportForm'
import { generateSchedule } from '@/app/actions/generateSchedule'

export default function GenerateSchedulePage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await generateSchedule(formData)
    redirect(`/display/${result.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Generate Schedule</h1>
      <SportForm type="schedule" onSubmit={handleSubmit} />
    </div>
  )
}

