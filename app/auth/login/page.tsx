'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Ham, LoaderCircle, MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

import { signIn } from '@/api/sign-in'
import { socialRedirectUrl } from '@/api/social-redirect-url'
import { ErrorFormMessage } from '@/components/error-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginSchema = zod.object({
  email: zod.string().email().min(1, 'E-mail required'),
  password: zod.string().min(1, 'Password required'),
})

export type loginFormData = zod.infer<typeof LoginSchema>

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<loginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()

  async function continueWithGoogleLogin() {
    await socialRedirectUrl({ provider: 'google-oauth2', redirect: 'google' })
  }

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success('Successfully signed in')
      reset()
      router.push('/')
    },
    onError: () => {
      toast.error('Could not sign in')
    },
  })

  function handleSignIn(data: loginFormData) {
    mutation.mutate(data)
  }

  return (
    <div className="relative flex h-full items-center justify-around font-poppins">
      <Button
        variant="outline"
        className="absolute right-36 top-36 flex h-12 w-36 gap-4"
        asChild
      >
        <Link href="/auth/register">
          Register
          <MoveUpRight className="me-[-15px] mt-[-10px]" />
        </Link>
      </Button>
      <div className="mt-[-50px] flex flex-col items-center justify-center gap-10">
        <Ham size={60} />
        <p className="w-5/6 text-center text-2xl">
          Entre com seu cadastro para realizar seu pedido!
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex w-1/3 flex-col items-center justify-center gap-8 rounded-xl border-2 p-8"
      >
        <div className="w-5/6 space-y-2">
          <Label htmlFor="email-signin">E-mail: </Label>
          <Input id="email-signin" type="email" {...register('email')} />
          <ErrorFormMessage error={errors.email || null} />
        </div>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="password-signin">Senha: </Label>
          <Input
            id="password-signin"
            type="password"
            {...register('password')}
          />
          <ErrorFormMessage error={errors.password || null} />
        </div>
        <div className="flex w-full flex-col items-center justify-around space-y-3 p-4">
          <Button
            className="flex w-5/6 gap-2"
            disabled={isLoading || isSubmitting}
          >
            Sign in
            {(isLoading || isSubmitting) && (
              <LoaderCircle className="animate-spin" />
            )}
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
          {/* <Button
            variant="outline"
            className="h-15 w-40 bg-blue-700 text-lg text-white hover:bg-blue-800 hover:text-white"
            onClick={() => {
              continueWithFacebookLogin()
            }}
          >
            Facebook
          </Button> */}
        </div>
      </form>
    </div>
  )
}
