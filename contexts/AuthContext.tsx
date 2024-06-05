/* eslint-disable simple-import-sort/imports */
'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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

  const router = useRouter()

  let refreshing = false

  api.interceptors.response.use(
    (response) => {
      return response
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (error: AxiosError<any>) => {
      if (
        error.response?.status === 401 &&
        error.response.data.detail ===
          'Authentication credentials were not provided.'
      ) {
        if (!refreshing) {
          refreshing = true
          api
            .post('/jwt/refresh/')
            .then((response) => {
              if (response.status >= 400) {
                router.push('/auth/login')
              }
            })
            .catch(() => {
              router.push('/auth/login')
            })
        }
      } else {
        if (!refreshing) {
          refreshing = true
          logout().then(() => {
            router.push('/auth/login')
          })
        }
      }
    },
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
