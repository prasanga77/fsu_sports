'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SportFormProps {
  type: 'schedule' | 'result'
  onSubmit: (formData: FormData) => void
}

export default function SportForm({ type, onSubmit }: SportFormProps) {
  const [sport, setSport] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('type', type)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div>
        <Label htmlFor="sport">Sport</Label>
        <Select onValueChange={setSport} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volleyball">Volleyball</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sports Category</Label>
        <RadioGroup defaultValue="boys" name="category" className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="boys" id="boys" />
            <Label htmlFor="boys">Boys</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="girls" id="girls" />
            <Label htmlFor="girls">Girls</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Team 1 Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="team1">Team 1</Label>
            <Input id="team1" name="team1" required />
          </div>
          {type === 'schedule' && (
            <div>
              <Label htmlFor="captain1">Captain 1</Label>
              <Input id="captain1" name="captain1" required />
            </div>
          )}
        </div>

        {/* Team 2 Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="team2">Team 2</Label>
            <Input id="team2" name="team2" required />
          </div>
          {type === 'schedule' && (
            <div>
              <Label htmlFor="captain2">Captain 2</Label>
              <Input id="captain2" name="captain2" required />
            </div>
          )}
        </div>
      </div>

      {type === 'schedule' ? (
        <div>
          <Label htmlFor="time">Match Time</Label>
          <Input id="time" name="time" type="time" required />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="score1">Team 1 Score</Label>
              <Input id="score1" name="score1" type="number" required />
            </div>
            <div>
              <Label htmlFor="score2">Team 2 Score</Label>
              <Input id="score2" name="score2" type="number" required />
            </div>
          </div>
          <div>
            <Label htmlFor="winner">Winner</Label>
            <Input id="winner" name="winner" required />
          </div>
          <div>
            <Label htmlFor="playerOfTheMatch">Player of the Match</Label>
            <Input id="playerOfTheMatch" name="playerOfTheMatch" required />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="template">Template Image (JPG or PNG)</Label>
        <Input id="template" name="template" type="file" accept=".jpg,.jpeg,.png" required />
      </div>

      <Button type="submit" className="w-full">
        Generate {type === 'schedule' ? 'Schedule' : 'Result'}
      </Button>
    </form>
  )
}

