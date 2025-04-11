"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, FileEdit, Trash2, Eye } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Données de test pour les budgets adaptées à l'Algérie
const initialBudgets = [
  {
    id: "BUD-001",
    produit: "Ciment Portland",
    periode: "Avril 2025",
    quantite: 500,
    total: 4000000,
    createur: "Karim Benali",
    etat: "validé",
  },
  {
    id: "BUD-002",
    produit: "Rond à béton",
    periode: "Avril 2025",
    quantite: 300,
    total: 3500000,
    createur: "Amina Hadj",
    etat: "brouillon",
  },
  {
    id: "BUD-003",
    produit: "Céramique Sol",
    periode: "Avril 2025",
    quantite: 200,
    total: 2500000,
    createur: "Mohamed Cherif",
    etat: "archivé",
  },
  {
    id: "BUD-004",
    produit: "Ciment Portland",
    periode: "Mars 2025",
    quantite: 450,
    total: 3800000,
    createur: "Karim Benali",
    etat: "validé",
  },
  {
    id: "BUD-005",
    produit: "Peinture Vinylique",
    periode: "Avril 2025",
    quantite: 150,
    total: 1500000,
    createur: "Samira Boudiaf",
    etat: "brouillon",
  },
  {
    id: "BUD-006",
    produit: "Brique Rouge",
    periode: "Avril 2025",
    quantite: 100,
    total: 1000000,
    createur: "Yacine Kaci",
    etat: "validé",
  },
  {
    id: "BUD-007",
    produit: "Rond à béton",
    periode: "Mars 2025",
    quantite: 280,
    total: 3200000,
    createur: "Amina Hadj",
    etat: "validé",
  },
  {
    id: "BUD-008",
    produit: "Céramique Sol",
    periode: "Mars 2025",
    quantite: 180,
    total: 2300000,
    createur: "Mohamed Cherif",
    etat: "validé",
  },
]

export default function BudgetsPage() {
  const { toast } = useToast()
  const [budgets, setBudgets] = useState(initialBudgets)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProduit, setFilterProduit] = useState("tous")
  const [filterEtat, setFilterEtat] = useState("tous")
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null)
  const [detailBudget, setDetailBudget] = useState<any | null>(null)

  // Fonction de recherche et filtrage
  const filteredBudgets = budgets.filter((budget) => {
    const matchesSearch =
      searchTerm === "" ||
      budget.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.periode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.createur.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProduit = filterProduit === "tous" || budget.produit === filterProduit
    const matchesEtat = filterEtat === "tous" || budget.etat === filterEtat

    return matchesSearch && matchesProduit && matchesEtat
  })

  // Fonction pour supprimer un budget
  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
    toast({
      title: "Budget supprimé",
      description: `Le budget ${id} a été supprimé avec succès.`,
    })
    setBudgetToDelete(null)
  }

  // Fonction pour afficher les détails d'un budget
  const viewBudgetDetails = (budget: any) => {
    setDetailBudget(budget)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets prévisionnels</h1>
          <p className="text-muted-foreground">Gérez vos budgets prévisionnels de production</p>
        </div>
        <Button asChild>
          <Link href="/budgets/nouveau">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau budget
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des budgets</CardTitle>
          <CardDescription>Consultez et gérez tous vos budgets prévisionnels</CardDescription>
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
              <Select value={filterEtat} onValueChange={setFilterEtat}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="État" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les états</SelectItem>
                  <SelectItem value="brouillon">Brouillon</SelectItem>
                  <SelectItem value="validé">Validé</SelectItem>
                  <SelectItem value="archivé">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredBudgets.length} budget{filteredBudgets.length !== 1 ? "s" : ""} trouvé
              {filteredBudgets.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Total budget</TableHead>
                  <TableHead>Créé par</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBudgets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun budget trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBudgets.map((budget) => (
                    <TableRow key={budget.id}>
                      <TableCell>{budget.id}</TableCell>
                      <TableCell>{budget.produit}</TableCell>
                      <TableCell>{budget.periode}</TableCell>
                      <TableCell>{budget.quantite}</TableCell>
                      <TableCell>{budget.total.toLocaleString()} DA</TableCell>
                      <TableCell>{budget.createur}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            budget.etat === "validé"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : budget.etat === "brouillon"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {budget.etat.charAt(0).toUpperCase() + budget.etat.slice(1)}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => viewBudgetDetails(budget)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild disabled={budget.etat === "archivé"}>
                              <Link href={`/budgets/edit/${budget.id}`}>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Modifier
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setBudgetToDelete(budget.id)}
                              disabled={budget.etat === "archivé"}
                              className="text-red-600"
                            >
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
      <Dialog open={budgetToDelete !== null} onOpenChange={(open) => !open && setBudgetToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le budget {budgetToDelete} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => budgetToDelete && deleteBudget(budgetToDelete)}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de détails du budget */}
      <Dialog open={detailBudget !== null} onOpenChange={(open) => !open && setDetailBudget(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails du budget {detailBudget?.id}</DialogTitle>
            <DialogDescription>Informations détaillées sur le budget prévisionnel</DialogDescription>
          </DialogHeader>
          {detailBudget && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Produit</h3>
                  <p>{detailBudget.produit}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Période</h3>
                  <p>{detailBudget.periode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Quantité</h3>
                  <p>{detailBudget.quantite}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total budget</h3>
                  <p>{detailBudget.total.toLocaleString()} DA</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Créé par</h3>
                  <p>{detailBudget.createur}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">État</h3>
                  <Badge
                    variant="outline"
                    className={
                      detailBudget.etat === "validé"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : detailBudget.etat === "brouillon"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {detailBudget.etat.charAt(0).toUpperCase() + detailBudget.etat.slice(1)}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Répartition des coûts</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="text-xs text-muted-foreground">Matières premières</div>
                    <div className="text-lg font-medium">
                      {Math.round(detailBudget.total * 0.45).toLocaleString()} DA
                    </div>
                    <div className="text-xs text-muted-foreground">45%</div>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="text-xs text-muted-foreground">Main-d'œuvre</div>
                    <div className="text-lg font-medium">
                      {Math.round(detailBudget.total * 0.35).toLocaleString()} DA
                    </div>
                    <div className="text-xs text-muted-foreground">35%</div>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="text-xs text-muted-foreground">Charges indirectes</div>
                    <div className="text-lg font-medium">
                      {Math.round(detailBudget.total * 0.2).toLocaleString()} DA
                    </div>
                    <div className="text-xs text-muted-foreground">20%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
            {detailBudget && detailBudget.etat !== "archivé" && (
              <Button asChild>
                <Link href={`/budgets/edit/${detailBudget.id}`}>
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
