import type React from "react"
import { SidebarNav, MobileSidebarNav } from "@/components/sidebar-nav"
import { ModeToggle } from "@/components/mode-toggle"
import AuthButton from "@/components/auth-button"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex h-full flex-col border-r bg-card">
          <div className="flex h-14 items-center border-b px-4">
            <h1 className="text-xl font-bold text-primary">Finance Tracker</h1>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <SidebarNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <MobileSidebarNav />
            <h1 className="text-xl font-bold text-primary md:hidden">Finance Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <AuthButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
