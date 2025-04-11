"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Save, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ParametresPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // États pour les différents paramètres
  const { theme, setTheme } = useTheme()
  const [parametres, setParametres] = useState({
    // Paramètres d'affichage
    theme: theme || "light",
    langue: "fr",
    couleurPrimaire: "blue",

    // Paramètres de notification
    notificationsEmail: true,
    notificationsApp: true,
    frequenceNotifications: "quotidien",

    // Paramètres de confidentialité
    partageStatistiques: true,
    modeConfidentiel: false,
  })

  // Fonction pour mettre à jour les paramètres
  const handleParametreChange = (param, value) => {
    setParametres((prev) => ({ ...prev, [param]: value }))

    // Si le paramètre est le thème, mettre à jour le thème global
    if (param === "theme") {
      setTheme(value)
    }
  }

  // Fonction pour enregistrer les paramètres
  const enregistrerParametres = () => {
    setIsLoading(true)

    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)

      // Sauvegarder dans le localStorage pour simuler une persistance
      const parametresAEnregistrer = {
        ...parametres,
        theme: theme, // S'assurer que le thème actuel est enregistré
      }
      localStorage.setItem("budgetprod_parametres", JSON.stringify(parametresAEnregistrer))

      toast({
        title: "Paramètres enregistrés",
        description: "Vos paramètres ont été enregistrés avec succès.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Personnalisez votre expérience sur BudgetProd</p>
      </div>

      <Tabs defaultValue="affichage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="affichage">Affichage</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="confidentialite">Confidentialité</TabsTrigger>
        </TabsList>

        <TabsContent value="affichage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'affichage</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thème</Label>
                <div className="flex items-center space-x-2">
                  <RadioGroup
                    value={theme}
                    onValueChange={(value) => handleParametreChange("theme", value)}
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light" className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Clair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark" className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Sombre
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">Système</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="langue">Langue</Label>
                <Select value={parametres.langue} onValueChange={(value) => handleParametreChange("langue", value)}>
                  <SelectTrigger id="langue" className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="couleurPrimaire">Couleur principale</Label>
                <Select
                  value={parametres.couleurPrimaire}
                  onValueChange={(value) => handleParametreChange("couleurPrimaire", value)}
                >
                  <SelectTrigger id="couleurPrimaire" className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une couleur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Bleu</SelectItem>
                    <SelectItem value="green">Vert</SelectItem>
                    <SelectItem value="purple">Violet</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="red">Rouge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificationsEmail">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                </div>
                <Switch
                  id="notificationsEmail"
                  checked={parametres.notificationsEmail}
                  onCheckedChange={(checked) => handleParametreChange("notificationsEmail", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificationsApp">Notifications dans l'application</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications dans l'application</p>
                </div>
                <Switch
                  id="notificationsApp"
                  checked={parametres.notificationsApp}
                  onCheckedChange={(checked) => handleParametreChange("notificationsApp", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="frequenceNotifications">Fréquence des notifications</Label>
                <Select
                  value={parametres.frequenceNotifications}
                  onValueChange={(value) => handleParametreChange("frequenceNotifications", value)}
                >
                  <SelectTrigger id="frequenceNotifications" className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediat">Immédiat</SelectItem>
                    <SelectItem value="quotidien">Quotidien</SelectItem>
                    <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confidentialite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de confidentialité</CardTitle>
              <CardDescription>Gérez vos préférences de confidentialité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="partageStatistiques">Partage des statistiques d'utilisation</Label>
                  <p className="text-sm text-muted-foreground">
                    Nous aider à améliorer l'application en partageant des statistiques anonymes
                  </p>
                </div>
                <Switch
                  id="partageStatistiques"
                  checked={parametres.partageStatistiques}
                  onCheckedChange={(checked) => handleParametreChange("partageStatistiques", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="modeConfidentiel">Mode confidentiel</Label>
                  <p className="text-sm text-muted-foreground">Masquer les montants sensibles dans l'interface</p>
                </div>
                <Switch
                  id="modeConfidentiel"
                  checked={parametres.modeConfidentiel}
                  onCheckedChange={(checked) => handleParametreChange("modeConfidentiel", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={enregistrerParametres} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span> Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les paramètres
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
