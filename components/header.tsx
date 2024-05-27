import { ShoppingCart, User } from 'lucide-react'

import { ModeToggle } from './toggle-theme'
import { Button } from './ui/button'

export function Header() {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4 font-roboto dark:bg-zinc-800">
      <span className="text-2xl font-bold">Call Food</span>

      <div className="flex gap-4">
        <ModeToggle />
        <Button variant="ghost" className="group">
          <ShoppingCart />
        </Button>
        <Button variant="ghost" className="group">
          <User />
        </Button>
      </div>
    </div>
  )
}
