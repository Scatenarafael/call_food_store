'use client'

import { useEffect, useRef } from 'react'

import { retrieveUser } from '@/api/retrieve-user'

export function AuthMe() {
  const effectRan = useRef(false)

  useEffect(() => {
    if (!effectRan.current) {
      retrieveUser()
    }
    return () => {
      effectRan.current = true
    }
  }, [])

  return <div />
}
