import { FieldError } from 'react-hook-form'

interface ErrorFormProps {
  error: FieldError | null
}

export function ErrorFormMessage({ error }: ErrorFormProps) {
  return <p className="text-xs text-red-600">{error?.message}</p>
}
