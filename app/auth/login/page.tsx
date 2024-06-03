'use client'
import { socialRedirectUrl } from '@/api/social-redirect-url'
import { Button } from '@/components/ui/button'

export default function Login() {
  async function continueWithGoogleLogin() {
    await socialRedirectUrl({ provider: 'google-oauth2', redirect: 'google' })
  }
  async function continueWithFacebookLogin() {
    await socialRedirectUrl({ provider: 'facebook', redirect: 'facebook' })
  }
  return (
    <div>
      <Button
        variant="destructive"
        onClick={() => {
          continueWithGoogleLogin()
        }}
      >
        Google
      </Button>
      <Button
        variant="default"
        onClick={() => {
          continueWithFacebookLogin()
        }}
      >
        Facebook
      </Button>
    </div>
  )
}
