'use client'

import { Ham, MoveUpRight } from 'lucide-react'
import Link from 'next/link'

import { socialRedirectUrl } from '@/api/social-redirect-url'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  async function continueWithGoogleLogin() {
    await socialRedirectUrl({ provider: 'google-oauth2', redirect: 'google' })
  }
  // async function continueWithFacebookLogin() {
  //   await socialRedirectUrl({ provider: 'facebook', redirect: 'facebook' })
  // }
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
      <div className="flex w-1/3 flex-col items-center justify-center gap-8 rounded-xl border-2 p-8">
        <div className="w-5/6 space-y-2">
          <Label htmlFor="email-signin">E-mail: </Label>
          <Input id="email-signin" type="email" />
        </div>
        <div className="w-5/6 space-y-2">
          <Label htmlFor="password-signin">Senha: </Label>
          <Input id="password-signin" type="password" />
        </div>
        <div className="flex w-full flex-col items-center justify-around space-y-3 p-4">
          <Button className="w-5/6">Login</Button>
          <Button
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
      </div>
    </div>
  )
}
