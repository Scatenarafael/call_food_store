'use client'

import { AxiosError } from 'axios'
import { usePathname } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

import { logout } from '@/api/logout'
import { api } from '@/lib/axios'

type AuthContextData = {
  auth: boolean
  setAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(false)
  // const router = useRouter()
  const pathName = usePathname()

  async function logoutRedirect() {
    console.log('pathName >>> ', pathName)
    if (pathName !== '/auth/login') {
      logout().then(() => {
        window.location.replace(
          `${process.env.NEXT_PUBLIC_STORE_HOST}/auth/login`,
        )
      })
    }
  }

  api.interceptors.response.use(
    (response) => {
      return response
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (error: AxiosError<any>) => {
      let redirect

      if (pathName !== '/auth/login') {
        redirect = true
      }

      if (
        error.response?.status === 401 &&
        error.response.data.detail ===
          'Authentication credentials were not provided.'
      ) {
        api
          .post('/jwt/refresh/')
          .then()
          .catch(() => {
            window.location.replace(
              `${process.env.NEXT_PUBLIC_STORE_HOST}/auth/login`,
            )
          })
      } else {
        if (redirect) {
          logoutRedirect()
        }
        redirect = false
      }
    },
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
