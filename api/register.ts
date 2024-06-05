/* eslint-disable camelcase */
import { registerFormData } from '@/app/auth/register/page'
import { api } from '@/lib/axios'

type RegisterDataProps = {
  data: registerFormData
}

export async function registerUser({ data }: RegisterDataProps) {
  await api.post('/users/', data)
}
