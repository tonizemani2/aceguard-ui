import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { UserNav } from "@/components/user-nav"
import { DemoProvider } from "@/context/demo-context"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <div className="flex min-h-screen bg-ace-bg-primary">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-ace-border bg-ace-bg-primary px-4">
            <div className="md:hidden">{/* Mobile trigger is handled in AppSidebar */}</div>
            <div className="flex items-center justify-end w-full">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
          </main>
        </div>
      </div>
    </DemoProvider>
  )
}
