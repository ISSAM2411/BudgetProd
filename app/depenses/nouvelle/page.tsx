"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Save } from "lucide-react"

export default function NewDepensePage() {
  const [categorie, setCategorie] = useState("matieres")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/depenses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nouvelle dépense</h1>
            <p className="text-muted-foreground">Enregistrez une nouvelle dépense réelle</p>
          </div>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la dépense</CardTitle>
          <CardDescription>Renseignez les détails de la dépense réelle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="produit">Produit concerné</Label>
              <Select>
                <SelectTrigger id="produit">
                  <SelectValue placeholder="Sélectionnez un produit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produitA">Produit A</SelectItem>
                  <SelectItem value="produitB">Produit B</SelectItem>
                  <SelectItem value="produitC">Produit C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date de la dépense</Label>
              <Input id="date" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <RadioGroup
              defaultValue="matieres"
              className="grid grid-cols-3 gap-4"
              onValueChange={(value) => setCategorie(value)}
            >
              <div>
                <RadioGroupItem value="matieres" id="matieres" className="peer sr-only" />
                <Label
                  htmlFor="matieres"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Matières premières</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="main-oeuvre" id="main-oeuvre" className="peer sr-only" />
                <Label
                  htmlFor="main-oeuvre"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Main-d'œuvre</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="charges" id="charges" className="peer sr-only" />
                <Label
                  htmlFor="charges"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Charges indirectes</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {categorie === "matieres" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matiere">Matière première</Label>
                <Select>
                  <SelectTrigger id="matiere">
                    <SelectValue placeholder="Sélectionnez une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matiereA">Matière A</SelectItem>
                    <SelectItem value="matiereB">Matière B</SelectItem>
                    <SelectItem value="matiereC">Matière C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantite">Quantité</Label>
                  <Input id="quantite" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cout">Coût unitaire (€)</Label>
                  <Input id="cout" type="number" />
                </div>
              </div>
            </div>
          )}

          {categorie === "main-oeuvre" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heures">Heures effectuées</Label>
                <Input id="heures" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taux">Taux horaire (€)</Label>
                <Input id="taux" type="number" defaultValue="35" />
              </div>
            </div>
          )}

          {categorie === "charges" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="charge">Type de charge</Label>
                <Select>
                  <SelectTrigger id="charge">
                    <SelectValue placeholder="Sélectionnez un type de charge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricite">Électricité</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="montant">Montant total (€)</Label>
            <Input id="montant" type="number" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commentaire">Commentaire (optionnel)</Label>
            <Input id="commentaire" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Enregistrer la dépense</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
