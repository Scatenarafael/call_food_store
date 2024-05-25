import { ShoppingCart, User } from 'lucide-react'

import { Button } from './ui/button'

export function Header() {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4 font-roboto dark:bg-zinc-800">
      <span className="text-2xl font-bold text-primary-foreground">
        Call Food
      </span>

      <div className="flex gap-4">
        <Button variant="ghost" className="group">
          <ShoppingCart className="text-primary-foreground group-hover:text-black" />
        </Button>
        <Button variant="ghost" className="group">
          <User className="text-primary-foreground group-hover:text-black" />
        </Button>
      </div>
    </div>
  )
}
