// src/components/LoginForm.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Field = {
  name: string
  label: string
  type?: string
  placeholder?: string
}

interface LoginFormProps {
  fields?: Field[]
  onSubmit?: (data: Record<string, string>) => void
}

export default function LoginForm({
  fields = [
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  ],
  onSubmit,
}: LoginFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-sm shadow-md rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-lg">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            ))}

            <Button type="submit" className="w-full rounded-xl py-2 text-base">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
