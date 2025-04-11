"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, FileEdit, Trash2, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Données de test pour les dépenses adaptées à l'Algérie
const initialDepenses = [
  {
    id: "DEP-001",
    produit: "Ciment Portland",
    categorie: "Matières",
    designation: "Ciment en vrac",
    montant: 1250000,
    date: "05/04/2025",
    utilisateur: "Karim Benali",
  },
  {
    id: "DEP-002",
    produit: "Rond à béton",
    categorie: "Main-d'œuvre",
    designation: "Heures production",
    montant: 850000,
    date: "06/04/2025",
    utilisateur: "Amina Hadj",
  },
  {
    id: "DEP-003",
    produit: "Ciment Portland",
    categorie: "Charges",
    designation: "Électricité",
    montant: 320000,
    date: "07/04/2025",
    utilisateur: "Mohamed Cherif",
  },
  {
    id: "DEP-004",
    produit: "Céramique Sol",
    categorie: "Matières",
    designation: "Sable fin",
    montant: 450000,
    date: "08/04/2025",
    utilisateur: "Samira Boudiaf",
  },
  {
    id: "DEP-005",
    produit: "Peinture Vinylique",
    categorie: "Charges",
    designation: "Maintenance",
    montant: 280000,
    date: "09/04/2025",
    utilisateur: "Karim Benali",
  },
  {
    id: "DEP-006",
    produit: "Brique Rouge",
    categorie: "Matières",
    designation: "Argile",
    montant: 380000,
    date: "10/04/2025",
    utilisateur: "Yacine Kaci",
  },
  {
    id: "DEP-007",
    produit: "Rond à béton",
    categorie: "Charges",
    designation: "Carburant",
    montant: 175000,
    date: "11/04/2025",
    utilisateur: "Amina Hadj",
  },
  {
    id: "DEP-008",
    produit: "Céramique Sol",
    categorie: "Main-d'œuvre",
    designation: "Heures production",
    montant: 620000,
    date: "12/04/2025",
    utilisateur: "Mohamed Cherif",
  },
]

export default function DepensesPage() {
  const { toast } = useToast()
  const [depenses, setDepenses] = useState(initialDepenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategorie, setFilterCategorie] = useState("toutes")
  const [filterProduit, setFilterProduit] = useState("tous")
  const [depenseToDelete, setDepenseToDelete] = useState<string | null>(null)
  const [detailDepense, setDetailDepense] = useState<any | null>(null)

  // Fonction de recherche et filtrage
  const filteredDepenses = depenses.filter((depense) => {
    const matchesSearch =
      searchTerm === "" ||
      depense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depense.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depense.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depense.utilisateur.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategorie = filterCategorie === "toutes" || depense.categorie === filterCategorie
    const matchesProduit = filterProduit === "tous" || depense.produit === filterProduit

    return matchesSearch && matchesCategorie && matchesProduit
  })

  // Fonction pour supprimer une dépense
  const deleteDepense = (id: string) => {
    setDepenses(depenses.filter((depense) => depense.id !== id))
    toast({
      title: "Dépense supprimée",
      description: `La dépense ${id} a été supprimée avec succès.`,
    })
    setDepenseToDelete(null)
  }

  // Fonction pour afficher les détails d'une dépense
  const viewDepenseDetails = (depense: any) => {
    setDetailDepense(depense)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dépenses Réelles</h1>
          <p className="text-muted-foreground">Suivez et gérez les dépenses réelles de production</p>
        </div>
        <Button asChild>
          <Link href="/depenses/nouvelle">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle dépense
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des dépenses</CardTitle>
          <CardDescription>Consultez et gérez toutes les dépenses enregistrées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategorie} onValueChange={setFilterCategorie}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toutes">Toutes les catégories</SelectItem>
                  <SelectItem value="Matières">Matières</SelectItem>
                  <SelectItem value="Main-d'œuvre">Main-d'œuvre</SelectItem>
                  <SelectItem value="Charges">Charges</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterProduit} onValueChange={setFilterProduit}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Produit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les produits</SelectItem>
                  <SelectItem value="Ciment Portland">Ciment Portland</SelectItem>
                  <SelectItem value="Rond à béton">Rond à béton</SelectItem>
                  <SelectItem value="Céramique Sol">Céramique Sol</SelectItem>
                  <SelectItem value="Peinture Vinylique">Peinture Vinylique</SelectItem>
                  <SelectItem value="Brique Rouge">Brique Rouge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredDepenses.length} dépense{filteredDepenses.length !== 1 ? "s" : ""} trouvée
              {filteredDepenses.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Désignation</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucune dépense trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepenses.map((depense) => (
                    <TableRow key={depense.id}>
                      <TableCell>{depense.id}</TableCell>
                      <TableCell>{depense.produit}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            depense.categorie === "Matières"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : depense.categorie === "Main-d'œuvre"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-purple-50 text-purple-700 border-purple-200"
                          }
                        >
                          {depense.categorie}
                        </Badge>
                      </TableCell>
                      <TableCell>{depense.designation}</TableCell>
                      <TableCell>{depense.montant.toLocaleString()} DA</TableCell>
                      <TableCell>{depense.date}</TableCell>
                      <TableCell>{depense.utilisateur}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => viewDepenseDetails(depense)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/depenses/edit/${depense.id}`}>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Modifier
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDepenseToDelete(depense.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={depenseToDelete !== null} onOpenChange={(open) => !open && setDepenseToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la dépense {depenseToDelete} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => depenseToDelete && deleteDepense(depenseToDelete)}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de détails de la dépense */}
      <Dialog open={detailDepense !== null} onOpenChange={(open) => !open && setDetailDepense(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de la dépense {detailDepense?.id}</DialogTitle>
            <DialogDescription>Informations détaillées sur la dépense réelle</DialogDescription>
          </DialogHeader>
          {detailDepense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Produit</h3>
                  <p>{detailDepense.produit}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Catégorie</h3>
                  <p>
                    <Badge
                      variant="outline"
                      className={
                        detailDepense.categorie === "Matières"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : detailDepense.categorie === "Main-d'œuvre"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                      }
                    >
                      {detailDepense.categorie}
                    </Badge>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Désignation</h3>
                  <p>{detailDepense.designation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Montant</h3>
                  <p>{detailDepense.montant.toLocaleString()} DA</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p>{detailDepense.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Utilisateur</h3>
                  <p>{detailDepense.utilisateur}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Informations complémentaires</h3>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">
                    Cette dépense a été enregistrée dans le cadre du budget prévisionnel {detailDepense.produit} pour la
                    période d'Avril 2025.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
            {detailDepense && (
              <Button asChild>
                <Link href={`/depenses/edit/${detailDepense.id}`}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Modifier
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
