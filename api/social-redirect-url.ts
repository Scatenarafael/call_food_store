import { toast } from 'sonner'

import { api } from '@/lib/axios'

interface SocialRedirectProps {
  provider: string
  redirect: string
}

export async function socialRedirectUrl({
  provider,
  redirect,
}: SocialRedirectProps) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : 'http://localhost:3000'
    }/auth/${redirect}`

    const response = await api.get(url, {
      headers: { Accept: 'application/json' },
      withCredentials: true,
    })

    console.log('response >>> ', response)

    // eslint-disable-next-line camelcase
    const { authorization_url } = response.data

    if (response.status === 200 && typeof window !== 'undefined') {
      window.location.replace(authorization_url)
    } else {
      toast.error('Something went wrong')
    }
  } catch (e) {
    toast.error('Something went wrong')
  }
}
