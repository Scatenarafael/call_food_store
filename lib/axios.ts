import axios from 'axios'

export const api = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_HOST
      ? process.env.NEXT_PUBLIC_API_HOST
      : 'http://localhost:8000'
  }/api`,
  withCredentials: true,
})
