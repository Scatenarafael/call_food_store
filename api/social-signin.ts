import { api } from '@/lib/axios'

interface SocialSignInProps {
  provider: string
  state: string
  code: string
}

export async function socialSignIn({
  state,
  provider,
  code,
}: SocialSignInProps) {
  await api.post(
    `/o/${provider}/?state=${encodeURIComponent(
      state,
    )}&code=${encodeURIComponent(code)}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
}
