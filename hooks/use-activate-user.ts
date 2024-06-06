import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { ActivationUserProps } from '@/api/activate-user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useActivateUser(
  activate: (data: ActivationUserProps) => Promise<void>,
  uid: string,
  token: string,
) {
  const effectRan = useRef(false)

  useEffect(() => {
    if (uid && token && !effectRan.current) {
      activate({ uid, token })
        .then(() => {
          toast.success('User successfully activated!')
          window.location.replace(
            `${process.env.NEXT_PUBLIC_STORE_HOST}/auth/login`,
          )
        })
        .catch(() => {
          toast.error('Failed to activate user')
          window.location.replace(
            `${process.env.NEXT_PUBLIC_STORE_HOST}/auth/login`,
          )
        })
    }

    return () => {
      effectRan.current = true
    }
  }, [activate, uid, token])
}
