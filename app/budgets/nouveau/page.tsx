"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, ArrowLeft, Save } from "lucide-react"

export default function NewBudgetPage() {
  const [matieres, setMatieres] = useState([
    { id: 1, nom: "Matière A", quantite: 100, cout: 10 },
    { id: 2, nom: "Matière B", quantite: 50, cout: 20 },
  ])

  const [charges, setCharges] = useState([
    { id: 1, nom: "Charge A", montant: 1000 },
    { id: 2, nom: "Charge B", montant: 2000 },
  ])

  const addMatiere = () => {
    setMatieres([...matieres, { id: matieres.length + 1, nom: "", quantite: 0, cout: 0 }])
  }

  const addCharge = () => {
    setCharges([...charges, { id: charges.length + 1, nom: "", montant: 0 }])
  }

  const removeMatiere = (id: number) => {
    setMatieres(matieres.filter((m) => m.id !== id))
  }

  const removeCharge = (id: number) => {
    setCharges(charges.filter((c) => c.id !== id))
  }

  const totalMatieres = matieres.reduce((sum, m) => sum + m.quantite * m.cout, 0)
  const totalCharges = charges.reduce((sum, c) => sum + c.montant, 0)
  const totalMainOeuvre = 20 * 35 // heures * taux
  const totalBudget = totalMatieres + totalMainOeuvre + totalCharges

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/budgets">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nouveau budget prévisionnel</h1>
            <p className="text-muted-foreground">Créez un nouveau budget prévisionnel de production</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Enregistrer comme brouillon</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Valider le budget
          </Button>
        </div>
      </div>

      <Tabs defaultValue="infos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="infos">Informations générales</TabsTrigger>
          <TabsTrigger value="matieres">Matières premières</TabsTrigger>
          <TabsTrigger value="main-oeuvre">Main-d'œuvre</TabsTrigger>
          <TabsTrigger value="charges">Charges indirectes</TabsTrigger>
          <TabsTrigger value="resume">Résumé</TabsTrigger>
        </TabsList>

        <TabsContent value="infos">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Définissez les informations de base du budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="produit">Produit</Label>
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
                  <Label htmlFor="quantite">Quantité à produire</Label>
                  <Input id="quantite" type="number" defaultValue="500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Input id="dateDebut" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFin">Date de fin</Label>
                  <Input id="dateFin" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tauxHoraire">Taux horaire main-d'œuvre (€)</Label>
                <Input id="tauxHoraire" type="number" defaultValue="35" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matieres">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Matières premières</CardTitle>
                <CardDescription>Ajoutez les matières premières nécessaires</CardDescription>
              </div>
              <Button onClick={addMatiere}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une matière
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de la matière</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Coût unitaire (€)</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matieres.map((matiere) => (
                    <TableRow key={matiere.id}>
                      <TableCell>
                        <Input defaultValue={matiere.nom} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={matiere.quantite} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={matiere.cout} />
                      </TableCell>
                      <TableCell>{matiere.quantite * matiere.cout} €</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeMatiere(matiere.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right font-medium">Total matières premières: {totalMatieres} €</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="main-oeuvre">
          <Card>
            <CardHeader>
              <CardTitle>Main-d'œuvre</CardTitle>
              <CardDescription>Définissez les heures de main-d'œuvre nécessaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heures">Heures prévues</Label>
                <Input id="heures" type="number" defaultValue="20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tauxAffiche">Taux horaire</Label>
                <Input id="tauxAffiche" type="number" defaultValue="35" disabled />
                <p className="text-xs text-muted-foreground">
                  Le taux horaire est défini dans les informations générales
                </p>
              </div>
              <Separator />
              <div className="text-right font-medium">Total main-d'œuvre: {totalMainOeuvre} €</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charges">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Charges indirectes</CardTitle>
                <CardDescription>Ajoutez les charges indirectes associées</CardDescription>
              </div>
              <Button onClick={addCharge}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une charge
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de la charge</TableHead>
                    <TableHead>Montant (€)</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges.map((charge) => (
                    <TableRow key={charge.id}>
                      <TableCell>
                        <Input defaultValue={charge.nom} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={charge.montant} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeCharge(charge.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right font-medium">Total charges indirectes: {totalCharges} €</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Résumé du budget</CardTitle>
              <CardDescription>Vérifiez les informations avant validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Produit</h3>
                    <p>Produit A</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Quantité</h3>
                    <p>500</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Période</h3>
                    <p>01/04/2025 - 30/04/2025</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Taux horaire</h3>
                    <p>35 €</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Répartition des coûts</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Catégorie</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead className="text-right">Pourcentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Matières premières</TableCell>
                        <TableCell className="text-right">{totalMatieres} €</TableCell>
                        <TableCell className="text-right">{Math.round((totalMatieres / totalBudget) * 100)}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Main-d'œuvre</TableCell>
                        <TableCell className="text-right">{totalMainOeuvre} €</TableCell>
                        <TableCell className="text-right">
                          {Math.round((totalMainOeuvre / totalBudget) * 100)}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Charges indirectes</TableCell>
                        <TableCell className="text-right">{totalCharges} €</TableCell>
                        <TableCell className="text-right">{Math.round((totalCharges / totalBudget) * 100)}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total</TableCell>
                        <TableCell className="text-right font-medium">{totalBudget} €</TableCell>
                        <TableCell className="text-right font-medium">100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Enregistrer comme brouillon</Button>
              <Button>Valider le budget</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
