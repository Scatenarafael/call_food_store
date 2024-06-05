import { api } from '@/lib/axios'

export type ActivationUserProps = {
  uid: string
  token: string
}

export async function activateUser(data: ActivationUserProps) {
  console.log('activateUser >> data', data)
  await api.post('/users/activation/', {
    uid: data.uid,
    token: data.token,
  })
}
