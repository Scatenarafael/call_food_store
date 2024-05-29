'use client'
import { socialRedirectUrl } from '@/api/social-redirect-url'
import { Button } from '@/components/ui/button'

export default function Login() {
  async function continueWithGoogleLogin() {
    await socialRedirectUrl({ provider: 'google-oauth2', redirect: 'google' })
  }
  return (
    <Button
      variant="destructive"
      onClick={() => {
        continueWithGoogleLogin()
      }}
    >
      Google
    </Button>
  )
}
