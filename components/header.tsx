"use client"

import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Ajouter l'import useState et useEffect
import { useState } from "react"

// Remplacer la fonction Header par celle-ci
export function Header() {
  const [notificationsNonLues, setNotificationsNonLues] = useState(5)
  const [notificationsData, setNotificationsData] = useState([
    {
      id: 1,
      message: "Ciment Portland : Dépassement de 18% du budget prévu",
      date: "Il y a 2 heures",
      lu: false,
    },
    {
      id: 2,
      message: "Rond à béton : Saisie réelle manquante pour main-d'œuvre",
      date: "Il y a 1 jour",
      lu: false,
    },
    {
      id: 3,
      message: "Céramique Sol : Budget prévisionnel à valider avant le 15/04/2025",
      date: "Il y a 2 jours",
      lu: false,
    },
    {
      id: 4,
      message: "Peinture Vinylique : Augmentation du prix des matières premières de 12%",
      date: "Il y a 3 jours",
      lu: false,
    },
    {
      id: 5,
      message: "Brique Rouge : Retard de livraison des matières premières",
      date: "Il y a 4 jours",
      lu: false,
    },
  ])

  // Marquer une notification comme lue
  const marquerCommeLu = (id) => {
    setNotificationsData(notificationsData.map((notif) => (notif.id === id ? { ...notif, lu: true } : notif)))
    setNotificationsNonLues((prev) => Math.max(0, prev - 1))
  }

  // Marquer toutes les notifications comme lues
  const marquerToutesCommeLues = () => {
    setNotificationsData(notificationsData.map((notif) => ({ ...notif, lu: true })))
    setNotificationsNonLues(0)
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/placeholder.svg?height=40&width=140" alt="BudgetProd Logo" className="h-8" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationsNonLues > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4">
                <span className="font-medium">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={marquerToutesCommeLues}
                  disabled={notificationsNonLues === 0}
                >
                  Tout marquer comme lu
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {notificationsData.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">Aucune notification</div>
                ) : (
                  notificationsData.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-muted ${notif.lu ? "opacity-70" : "bg-muted/30"}`}
                      onClick={() => marquerCommeLu(notif.id)}
                    >
                      <div className={`text-sm ${notif.lu ? "font-normal" : "font-medium"}`}>{notif.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notif.date}</div>
                    </div>
                  ))
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/notifications" className="justify-center">
                  Voir toutes les notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">Karim Benali</p>
                  <p className="text-xs text-muted-foreground">Administrateur</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profil">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/parametres">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  Déconnexion
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
