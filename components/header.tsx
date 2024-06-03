import { ShoppingCart, User } from 'lucide-react'

import { AccountMenuContent } from './account-menu-content'
import { ModeToggle } from './toggle-theme'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Header() {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4 font-roboto dark:bg-zinc-800">
      <span className="text-2xl font-bold">Call Food</span>

      <div className="flex gap-4">
        <ModeToggle />
        <Button variant="ghost" className="group">
          <ShoppingCart />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="group">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AccountMenuContent />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
