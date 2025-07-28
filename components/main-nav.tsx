"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AceGuardLogo } from "@/components/aceguard-logo"
import { LayoutDashboard, GitFork, Search, ClipboardCheck, Scan, ShieldAlert, FileText, Settings } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/repositories", label: "Repositories", icon: GitFork },
  { href: "/findings", label: "Findings", icon: Search },
  { href: "/gaps", label: "Gaps", icon: ClipboardCheck },
  { href: "/scans", label: "Scans", icon: Scan },
  { href: "/claims", label: "Claims", icon: ShieldAlert },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/admin", label: "Admin", icon: Settings },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center px-4 border-b border-ace-border bg-ace-bg-primary">
      <AceGuardLogo className="mr-8" />
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-ace-bg-surface hover:text-ace-accent",
              pathname === item.href ? "bg-ace-bg-surface text-ace-accent" : "text-ace-text-default",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
