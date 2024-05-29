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
import { toast } from 'sonner'

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
      logout()
        .then(() => {
          toast.success('Successfully logout')
          window.location.replace(
            `${process.env.NEXT_PUBLIC_STORE_HOST}/auth/login`,
          )
        })
        .catch(() => {
          toast.error('Could not logout!')
        })
    }
  }

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
        await api.post('/jwt/refresh/')
      } else {
        logoutRedirect()
      }
    },
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

// api.interceptors.response.use(
//   (response) => { return response; },
//   (error: AxiosError<any>) => {
//     let isRefreshing = false
//     let failedRequestsQueue: any[] = [];
//     console.log("Entered interceptor")

//     if (error.response?.status === 401) {

//       console.log("AFTER >> error.response?.status === 401")

//       if(error.response.data?.code === "token_not_valid" && error.response.data?.detail !== "Token is invalid or expired") {

//         console.log("AFTER if >> error.response.data >>> ", error.response.data)

//         cookies = parseCookies();

//         const { "photonfueldashboard.refresh_token": refresh } = cookies;

//         console.log("AFTER cookies >> cookies >>> ", cookies)

//         const originalConfig: any = error.config || {};

//         console.log("originalConfig >>>> ", originalConfig)

//         if (!isRefreshing) {
//           isRefreshing = true;

//           console.log("AFTER if >> refresh >>> ", refresh)

//           if (!refresh) return

//           console.log("AFTER if >> refresh2 >>> ", refresh)
//           api.post("/session/refresh/", {
//               refresh,
//             })
//             .then((response) => {
//               const { access } = response.data;

//               setCookie(undefined, "photonfueldashboard.access_token", access, {
//                 maxAge: 60 * 60 * 24 * 30, //30 days
//                 path: "/",
//               });
//               api.defaults.headers["Authorization"] = `Bearer ${access}`;

//               failedRequestsQueue.forEach((request) =>
//                 request.onSuccess(access)
//               );
//               failedRequestsQueue = [];
//             })

//             .catch((error: AxiosError<any>) => {

//               failedRequestsQueue.forEach((request) =>
//                 request.onFailure(error)
//               );

//               failedRequestsQueue = [];

//             })
//             .finally(() => {
//               isRefreshing = false;

//             });
//         }

//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({
//             onSuccess: (access: string) => {
//               originalConfig.headers["Authorization"] = `Bearer ${access}`;
//               resolve(api(originalConfig));
//             },
//             onFailure: (err: AxiosError) => {
//               reject(err);
//             },
//           });
//         });
//       } else {
//         //TODO: deslogar usuário
//           console.log('axios >> interceptors >> else')
//           console.log("AFTER if >> error.response.data >>> ", error.response.data)
//           if (window.location.href !== `http://${process.env.NEXT_PUBLIC_API_IP}:3000/login`) {
//             singhOut()
//           }
//       }
//     }
//     return Promise.reject(error);
//   }
// )
