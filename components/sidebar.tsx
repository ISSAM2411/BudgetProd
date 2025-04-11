"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { BarChart3, FileText, Home, LineChart, Settings, Users, Calendar, DollarSign, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Budgets prévisionnels",
    href: "/budgets",
    icon: FileText,
  },
  {
    title: "Dépenses réelles",
    href: "/depenses",
    icon: DollarSign,
  },
  {
    title: "Écarts budgétaires",
    href: "/ecarts",
    icon: BarChart3,
  },
  {
    title: "Rapports",
    href: "/rapports",
    icon: LineChart,
  },
  {
    title: "Gestion des périodes",
    href: "/periodes",
    icon: Calendar,
  },
  {
    title: "Administration",
    href: "/admin",
    icon: Settings,
    submenu: [
      {
        title: "Utilisateurs",
        href: "/admin/utilisateurs",
        icon: Users,
      },
      {
        title: "Configuration",
        href: "/admin/configuration",
        icon: Settings,
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 border-r bg-background z-10">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isSubmenuOpen =
              hasSubmenu &&
              item.submenu?.some((subitem) => pathname === subitem.href || pathname.startsWith(`${subitem.href}/`))

            return (
              <div key={item.href} className="space-y-1">
                {hasSubmenu ? (
                  <>
                    <div
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        isActive || isSubmenuOpen
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-secondary/50",
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.submenu!.map((subitem) => {
                        const isSubActive = pathname === subitem.href || pathname.startsWith(`${subitem.href}/`)
                        return (
                          <Link key={subitem.href} href={subitem.href}>
                            <Button variant={isSubActive ? "secondary" : "ghost"} className="w-full justify-start px-3">
                              <subitem.icon className={cn("h-4 w-4 mr-2", isSubActive && "text-primary")} />
                              <span>{subitem.title}</span>
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <Link href={item.href}>
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start px-3">
                      <item.icon className={cn("h-5 w-5 mr-3", isActive && "text-primary")} />
                      <span>{item.title}</span>
                    </Button>
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bouton de basculement de thème */}
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={toggleTheme}>
            {theme === "dark" ? (
              <>
                <Sun className="h-5 w-5 mr-3" />
                <span>Mode clair</span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 mr-3" />
                <span>Mode sombre</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
