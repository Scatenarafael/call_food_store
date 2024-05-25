import Image from 'next/image'

import noImage from '../public/no-image.png'

type ProductProps = {
  id: string
  name: string
  description: string
  image: string
  priceInCents: number
  created_at: string
  updated_at: string
  restaurant: string
}

interface CardProps {
  product: ProductProps
}

export function Card({ product }: CardProps) {
  return (
    <div className="relative h-[25rem] w-[14rem] rounded-lg border-2 border-black bg-primary/20">
      <div className="h-4/6 w-full object-fill">
        {!product.image || product.image === '#' ? (
          <Image
            src={noImage.src}
            width={14 * 16}
            height={14 * 16}
            alt="product image"
            className="rounded-t-xl"
          />
        ) : (
          <Image
            src={product.image}
            width={14 * 16}
            height={14 * 16}
            alt="product image"
            className="rounded-t-xl"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-3 pb-3 pt-6 font-mono">
        <p className="text-center font-bold">{product.name}</p>
        <p className="line-clamp-3 text-justify text-xs">
          {product.description}
        </p>
        <p className="absolute left-[140px] top-[240px] z-50 rounded-lg bg-primary p-2 text-xl text-primary-foreground">
          {(product.priceInCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
    </div>
  )
}
