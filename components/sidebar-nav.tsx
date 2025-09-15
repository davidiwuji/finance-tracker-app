"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  CreditCard,
  PieChart,
  BookOpen,
  Settings,
  Menu,
  DollarSign,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Assets",
    href: "/assets",
    icon: TrendingUp,
  },
  {
    name: "Liabilities",
    href: "/liabilities",
    icon: CreditCard,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: Wallet,
  },
  {
    name: "Investments",
    href: "/investments",
    icon: PieChart,
  },
  {
    name: "Trading Journal",
    href: "/trading",
    icon: BookOpen,
  },
  {
    name: "Net Worth",
    href: "/net-worth",
    icon: DollarSign,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileSidebarNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Finance Tracker</h2>
          </div>
          <ScrollArea className="flex-1 px-4 py-4">
            <SidebarNav />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
