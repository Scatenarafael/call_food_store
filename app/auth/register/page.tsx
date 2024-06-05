'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

import { registerUser } from '@/api/register'
import { socialRedirectUrl } from '@/api/social-redirect-url'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const RegisterSchema = zod
  .object({
    username: zod.string().min(1, 'Username required'),
    email: zod.string().email().min(1, 'E-mail required'),
    password: zod.string().min(1, 'Password required'),
    re_password: zod.string().min(1, 'Password confirmation required'),
  })
  .refine(
    (state) => {
      return state.password === state.re_password
    },
    {
      message: 'Confirmation need to be equal password',
      path: ['re_password'],
    },
  )

export type registerFormData = zod.infer<typeof RegisterSchema>

export default function Register() {
  const router = useRouter()

  async function continueWithGoogleLogin() {
    await socialRedirectUrl({ provider: 'google-oauth2', redirect: 'google' })
  }

  const {
    formState: { errors, isLoading },
    register,
    handleSubmit,
    reset,
  } = useForm<registerFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      re_password: '',
    },
  })

  console.log('errors >>> ', errors)

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Successfully registered user')
      reset()
      router.replace('/auth/login')
    },
    onError: () => {
      toast.error('Fail on register user')
      router.replace('/auth/login')
    },
  })

  function registerUserFn(data: registerFormData) {
    console.log(data)
    mutation.mutate({ data })
  }

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(registerUserFn)}
        className="flex w-1/2 flex-col items-center justify-center gap-8 rounded-xl border-2 p-4"
      >
        <Link href="/auth/login">
          <Button
            variant="outline"
            className="absolute left-36 top-36 flex h-12 w-36 items-center gap-4"
          >
            <MoveLeft />
            Back
          </Button>
        </Link>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="username-register">Usuáio: </Label>
          <Input id="username-register" type="text" {...register('username')} />
        </div>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="email-register">E-mail: </Label>
          <Input id="email-register" type="email" {...register('email')} />
        </div>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="password-register">Senha: </Label>
          <Input
            id="password-register"
            type="password"
            {...register('password')}
          />
        </div>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="re_password-register">Confirmação de senha: </Label>
          <Input
            id="re_password-register"
            type="password"
            {...register('re_password')}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-around space-y-3 p-4">
          <Button type="submit" className="w-5/6" disabled={isLoading}>
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-15 w-5/6 bg-red-600 text-lg text-white hover:bg-red-700 hover:text-white"
            onClick={() => {
              continueWithGoogleLogin()
            }}
          >
            Google
          </Button>
        </div>
      </form>
    </div>
  )
}
