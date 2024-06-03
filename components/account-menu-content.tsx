'use client'

import { useMutation } from '@tanstack/react-query'
import { DoorOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logout } from '@/api/logout'

export function AccountMenuContent() {
  const router = useRouter()

  const { mutateAsync: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/auth/login')
      toast.success('Successfully Logout')
    },
    onError: () => {
      toast.error('Could not logout! ')
    },
  })

  return (
    <div
      className="flex cursor-pointer gap-3 p-2 hover:bg-primary/10"
      onClick={async () => {
        await signOut()
      }}
    >
      <span>Logout </span> <DoorOpen />
    </div>
  )
}
