import Image from 'next/image'

import { Card } from '@/components/card'

import Burger from '../public/main_burger.png'

const products = [
  {
    id: 'a973e425-e803-4d20-bbbc-4b85f434305e',
    name: 'X-Salada',
    description:
      'Pao, hamburger, queijo, alface, tomate e mussarela oadnhvoadnvoandviondaoivunaoidvnadon',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'ff00eb07-e937-4153-9199-fd1149e5061f',
  },
  {
    id: 'f7c91b94-a837-400b-b3ef-fd27a453bc31',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'f9b28612-9ff9-4e2e-82bc-ccb77cc1fc11',
  },
  {
    id: 'd5df6a55-f800-4136-9991-6ce031d80d21',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'b235a9b9-971e-45f7-8277-cbf685f254b8',
  },
  {
    id: '1216864e-4323-4d30-93f2-7504a0cbc3e4',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: '7b428783-8bfa-4514-9782-51a09d3befde',
  },
  {
    id: '4b07c7a0-b479-4256-8fc1-93bad4911b0d',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: '44924c4c-55cd-4b23-b83a-56bc4ac5aa09',
  },
  {
    id: 'c4afb197-405e-4f1b-9d2c-41823f2183ae',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'e93eb066-df96-4706-a68a-f4c79946b1b6',
  },
  {
    id: 'db0ac549-8964-40fc-b81c-e405a9c25973',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'b4c2e78b-c3ca-46a1-ade5-669e5ee6e776',
  },
  {
    id: '5cd1b5bd-50a4-41bd-a1b7-1a7aae7fec67',
    name: 'X-Salada',
    description: 'Pao, hamburger, queijo, alface, tomate e mussarela',
    image: '#',
    priceInCents: 2290,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    restaurant: 'e034d5f5-7e11-4305-868f-cfb54ee5f35b',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-11/12 max-w-[90rem] justify-around rounded-xl bg-[url('../public/backgroundBurger.png')] px-12 py-4">
        <div className="mt-[22rem] flex flex-col gap-3">
          <p className="space-x-4 text-justify font-poppins text-5xl text-primary-foreground">
            Call us!
          </p>
          <p className="space-x-4 text-justify font-poppins text-3xl text-primary-foreground">
            Enjoy the best Burger!
          </p>
        </div>
        <Image
          src={Burger.src}
          width={300}
          height={900}
          alt="Burger"
          className="mt-8"
        />
      </div>
      <div className="my-10 flex flex-col space-y-5">
        <p className="font-roboto text-3xl">Products</p>
        <div className="grid grid-flow-row grid-cols-6 gap-5">
          {products.map((product) => {
            return <Card key={product.id} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}
