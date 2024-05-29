import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { AuthContext } from '@/contexts/AuthContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useSocialAuth(authenticate: any, provider: string) {
  const router = useRouter()

  const { setAuth } = useContext(AuthContext)
  const searchParams = useSearchParams()
  const effectRan = useRef(false)

  useEffect(() => {
    const state = searchParams.get('state')
    const code = searchParams.get('code')

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .then(() => {
          setAuth(true)
          toast.success('Logged in')
          router.push('/')
        })
        .catch(() => {
          toast.error('Failed to log in')
          router.push('/auth/login')
        })
    }

    return () => {
      effectRan.current = true
    }
  }, [authenticate, provider])
}
