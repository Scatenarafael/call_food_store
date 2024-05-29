import axios from 'axios'

export const api = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_HOST
      ? process.env.NEXT_PUBLIC_HOST
      : 'http://localhost:8000'
  }/api`,
  withCredentials: true,
})
