/* eslint-disable prettier/prettier */
'use client'

import { activateUser } from '@/api/activate-user';
import useActivateUser from '@/hooks/use-activate-user';

export default function Page({
  params,
}: {
  params: { uid: string; token: string }
}) {
  useActivateUser(activateUser, params.uid, params.token)
  return <div>uid: {params.uid} token: {params.token}</div>
}
