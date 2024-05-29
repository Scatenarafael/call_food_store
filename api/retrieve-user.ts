import { api } from '@/lib/axios'

type RetrieveUserReponse = {
  id: string
  email: string
  username: string
}

export async function retrieveUser() {
  try {
    const response = await api.get<RetrieveUserReponse>('/users/me/')
    return response.data
  } catch (e) {
    console.log(e)
  }
}
