'use client'

import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'

import { Card } from '@/components/card'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/axios'

export type ProductProps = {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  created_at: string
  updated_at: string
  restaurant: string
}

export type ProductsResponseProps = {
  meta: {
    totalCount: number
    perPage: number
    pageIndex: number
  }
  results: ProductProps[]
}

export function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],

    queryFn: async () => {
      const response = await api.get<ProductsResponseProps>('products')
      return response.data
    },
    retry: 3,
  })

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div>
          {products && products.results.length > 0 ? (
            products.results.map((product) => {
              return <Card key={product.id} product={product} />
            })
          ) : (
            <p className="text-white">No products registered yet</p>
          )}
        </div>
      )}
    </Fragment>
  )
}
