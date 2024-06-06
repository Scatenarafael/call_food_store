import { api } from '@/lib/axios'

export type SignInProps = {
  email: string
  password: string
}

export async function signIn(data: SignInProps) {
  await api.post('/api/jwt/create/', data)
}
