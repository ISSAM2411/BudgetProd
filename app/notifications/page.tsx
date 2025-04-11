"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, AlertTriangle, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Données initiales pour les notifications adaptées à l'Algérie
const initialNotifications = [
  {
    id: 1,
    priorite: "haute",
    message: "Ciment Portland : Dépassement de 18% du budget prévu pour les matières premières",
    date: "10/04/2025 08:30",
    statut: "en attente",
    lu: false,
  },
  {
    id: 2,
    priorite: "moyenne",
    message: "Rond à béton : Saisie réelle manquante pour main-d'œuvre",
    date: "09/04/2025 14:15",
    statut: "traitée",
    lu: false,
  },
  {
    id: 3,
    priorite: "basse",
    message: "Céramique Sol : Budget prévisionnel à valider avant le 15/04/2025",
    date: "08/04/2025 09:45",
    statut: "en attente",
    lu: false,
  },
  {
    id: 4,
    priorite: "haute",
    message: "Peinture Vinylique : Augmentation du prix des matières premières de 12%",
    date: "07/04/2025 16:20",
    statut: "en attente",
    lu: false,
  },
  {
    id: 5,
    priorite: "basse",
    message: "Période Mars 2025 : Clôture prévue dans 3 jours",
    date: "06/04/2025 10:00",
    statut: "traitée",
    lu: true,
  },
  {
    id: 6,
    priorite: "moyenne",
    message: "Brique Rouge : Retard de livraison des matières premières",
    date: "05/04/2025 11:30",
    statut: "en attente",
    lu: false,
  },
  {
    id: 7,
    priorite: "haute",
    message: "Alerte carburant : Augmentation des prix de 8% à prévoir",
    date: "04/04/2025 09:15",
    statut: "traitée",
    lu: true,
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [parametres, setParametres] = useState({
    emailNotifications: true,
    frequence: "quotidien",
    depassement: true,
    saisieManquante: true,
    validation: true,
    cloture: true,
  })

  // Nombre de notifications non lues
  const nonLues = notifications.filter((notif) => !notif.lu).length

  // Marquer une notification comme lue
  const marquerCommeLu = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, lu: true } : notif)))
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue avec succès.",
    })
  }

  // Marquer toutes les notifications comme lues
  const marquerToutesCommeLues = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, lu: true })))
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues avec succès.",
    })
  }

  // Gérer les changements de paramètres
  const handleParametreChange = (param, value) => {
    setParametres((prev) => ({ ...prev, [param]: value }))
  }

  // Enregistrer les paramètres
  const enregistrerParametres = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences de notification ont été enregistrées avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications et alertes</h1>
        <p className="text-muted-foreground">Gérez vos notifications et paramètres d'alerte</p>
      </div>

      <Tabs defaultValue="alertes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alertes">Alertes</TabsTrigger>
          <TabsTrigger value="parametres">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="alertes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Alertes actives</CardTitle>
                <CardDescription>Liste des alertes nécessitant votre attention</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {nonLues > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {nonLues} non {nonLues === 1 ? "lue" : "lues"}
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={marquerToutesCommeLues} disabled={nonLues === 0}>
                  <Check className="mr-2 h-4 w-4" />
                  Tout marquer comme lu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow key={notification.id} className={notification.lu ? "opacity-70" : ""}>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              notification.priorite === "haute"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : notification.priorite === "moyenne"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {notification.priorite === "haute" ? (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            ) : notification.priorite === "moyenne" ? (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            ) : (
                              <Bell className="mr-1 h-3 w-3" />
                            )}
                            {notification.priorite.charAt(0).toUpperCase() + notification.priorite.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`${notification.lu ? "font-normal" : "font-medium"}`}>
                            {notification.message}
                          </div>
                        </TableCell>
                        <TableCell>{notification.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              notification.statut === "traitée"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          >
                            {notification.statut === "traitée" ? (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            ) : (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {notification.statut.charAt(0).toUpperCase() + notification.statut.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => marquerCommeLu(notification.id)}
                            disabled={notification.lu}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Marquer comme lu
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {notifications.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Aucune notification disponible.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parametres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Personnalisez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Notifications par email</h3>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={parametres.emailNotifications}
                    onCheckedChange={(checked) => handleParametreChange("emailNotifications", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Fréquence des notifications</h3>
                  <RadioGroup
                    value={parametres.frequence}
                    onValueChange={(value) => handleParametreChange("frequence", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediat" id="immediat" />
                      <Label htmlFor="immediat">Immédiat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quotidien" id="quotidien" />
                      <Label htmlFor="quotidien">Quotidien</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hebdomadaire" id="hebdomadaire" />
                      <Label htmlFor="hebdomadaire">Hebdomadaire</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium">Types d'alertes</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="depassement">Dépassements budgétaires</Label>
                    <Switch
                      id="depassement"
                      checked={parametres.depassement}
                      onCheckedChange={(checked) => handleParametreChange("depassement", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="saisie-manquante">Saisies manquantes</Label>
                    <Switch
                      id="saisie-manquante"
                      checked={parametres.saisieManquante}
                      onCheckedChange={(checked) => handleParametreChange("saisieManquante", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="validation">Validations en attente</Label>
                    <Switch
                      id="validation"
                      checked={parametres.validation}
                      onCheckedChange={(checked) => handleParametreChange("validation", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cloture">Clôtures de période</Label>
                    <Switch
                      id="cloture"
                      checked={parametres.cloture}
                      onCheckedChange={(checked) => handleParametreChange("cloture", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 flex justify-end border-t">
              <Button onClick={enregistrerParametres}>Enregistrer les préférences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
