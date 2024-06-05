'use client'

import { socialSignIn } from '@/api/social-signin'
import { Skeleton } from '@/components/ui/skeleton'
import useSocialAuth from '@/hooks/use-social-auth'

export default function Facebook() {
  useSocialAuth(socialSignIn, 'facebook')
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-40 w-40 rounded-full" />
      <Skeleton className="h-[40rem] w-11/12" />
    </div>
  )
}
