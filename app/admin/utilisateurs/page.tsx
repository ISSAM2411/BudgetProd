"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileEdit, Trash2, UserPlus, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données initiales pour les utilisateurs
const initialUtilisateurs = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@exemple.com",
    role: "administrateur",
    statut: "actif",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@exemple.com",
    role: "comptable",
    statut: "actif",
  },
  {
    id: 3,
    nom: "Durand",
    prenom: "Pierre",
    email: "pierre.durand@exemple.com",
    role: "responsable",
    statut: "inactif",
  },
  {
    id: 4,
    nom: "Lefebvre",
    prenom: "Sophie",
    email: "sophie.lefebvre@exemple.com",
    role: "comptable",
    statut: "actif",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [utilisateurs, setUtilisateurs] = useState(initialUtilisateurs)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogCreationOuvert, setDialogCreationOuvert] = useState(false)
  const [dialogEditionOuvert, setDialogEditionOuvert] = useState(false)
  const [dialogSuppressionOuvert, setDialogSuppressionOuvert] = useState(false)
  const [utilisateurAEditer, setUtilisateurAEditer] = useState(null)
  const [utilisateurASupprimer, setUtilisateurASupprimer] = useState(null)
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "comptable",
    statut: "actif",
  })

  // Filtrer les utilisateurs en fonction du terme de recherche
  const utilisateursFiltres = utilisateurs.filter(
    (utilisateur) =>
      utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utilisateur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utilisateur.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Gérer les changements dans le formulaire de nouvel utilisateur
  const handleChangeNouvelUtilisateur = (e) => {
    const { id, value } = e.target
    setNouvelUtilisateur((prev) => ({ ...prev, [id]: value }))
  }

  // Gérer les changements de sélection
  const handleSelectChange = (field, value) => {
    setNouvelUtilisateur((prev) => ({ ...prev, [field]: value }))
  }

  // Gérer les changements dans le formulaire d'édition
  const handleChangeEdition = (e) => {
    const { id, value } = e.target
    setUtilisateurAEditer((prev) => ({ ...prev, [id]: value }))
  }

  // Gérer les changements de sélection pour l'édition
  const handleSelectChangeEdition = (field, value) => {
    setUtilisateurAEditer((prev) => ({ ...prev, [field]: value }))
  }

  // Créer un nouvel utilisateur
  const creerUtilisateur = () => {
    if (!nouvelUtilisateur.nom || !nouvelUtilisateur.prenom || !nouvelUtilisateur.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newUser = {
      id: utilisateurs.length + 1,
      ...nouvelUtilisateur,
    }

    setUtilisateurs([...utilisateurs, newUser])
    setNouvelUtilisateur({
      nom: "",
      prenom: "",
      email: "",
      role: "comptable",
      statut: "actif",
    })
    setDialogCreationOuvert(false)

    toast({
      title: "Utilisateur créé",
      description: `L'utilisateur ${nouvelUtilisateur.prenom} ${nouvelUtilisateur.nom} a été créé avec succès.`,
    })
  }

  // Ouvrir le dialogue d'édition
  const ouvrirEdition = (utilisateur) => {
    setUtilisateurAEditer({ ...utilisateur })
    setDialogEditionOuvert(true)
  }

  // Mettre à jour un utilisateur
  const mettreAJourUtilisateur = () => {
    if (!utilisateurAEditer.nom || !utilisateurAEditer.prenom || !utilisateurAEditer.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    setUtilisateurs(utilisateurs.map((user) => (user.id === utilisateurAEditer.id ? utilisateurAEditer : user)))
    setDialogEditionOuvert(false)

    toast({
      title: "Utilisateur mis à jour",
      description: `Les informations de ${utilisateurAEditer.prenom} ${utilisateurAEditer.nom} ont été mises à jour.`,
    })
  }

  // Ouvrir le dialogue de suppression
  const confirmerSuppression = (utilisateur) => {
    setUtilisateurASupprimer(utilisateur)
    setDialogSuppressionOuvert(true)
  }

  // Supprimer un utilisateur
  const supprimerUtilisateur = () => {
    setUtilisateurs(utilisateurs.filter((user) => user.id !== utilisateurASupprimer.id))
    setDialogSuppressionOuvert(false)

    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur ${utilisateurASupprimer.prenom} ${utilisateurASupprimer.nom} a été supprimé.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs et leurs accès</p>
        </div>
        <Button onClick={() => setDialogCreationOuvert(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Consultez et gérez tous les utilisateurs de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {utilisateursFiltres.length} utilisateur{utilisateursFiltres.length !== 1 ? "s" : ""} trouvé
              {utilisateursFiltres.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utilisateursFiltres.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  utilisateursFiltres.map((utilisateur) => (
                    <TableRow key={utilisateur.id}>
                      <TableCell>{utilisateur.nom}</TableCell>
                      <TableCell>{utilisateur.prenom}</TableCell>
                      <TableCell>{utilisateur.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            utilisateur.role === "administrateur"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : utilisateur.role === "comptable"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                          }
                        >
                          {utilisateur.role === "administrateur"
                            ? "Administrateur"
                            : utilisateur.role === "comptable"
                              ? "Comptable"
                              : "Responsable Production"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            utilisateur.statut === "actif"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {utilisateur.statut === "actif" ? "Actif" : "Désactivé"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => ouvrirEdition(utilisateur)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmerSuppression(utilisateur)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de création d'utilisateur */}
      <Dialog open={dialogCreationOuvert} onOpenChange={setDialogCreationOuvert}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouvel utilisateur</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={nouvelUtilisateur.prenom} onChange={handleChangeNouvelUtilisateur} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={nouvelUtilisateur.nom} onChange={handleChangeNouvelUtilisateur} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={nouvelUtilisateur.email} onChange={handleChangeNouvelUtilisateur} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select value={nouvelUtilisateur.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrateur">Administrateur</SelectItem>
                  <SelectItem value="comptable">Comptable</SelectItem>
                  <SelectItem value="responsable">Responsable Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select value={nouvelUtilisateur.statut} onValueChange={(value) => handleSelectChange("statut", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Désactivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogCreationOuvert(false)}>
              Annuler
            </Button>
            <Button onClick={creerUtilisateur}>Créer l'utilisateur</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition d'utilisateur */}
      <Dialog open={dialogEditionOuvert} onOpenChange={setDialogEditionOuvert}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier un utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur</DialogDescription>
          </DialogHeader>
          {utilisateurAEditer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" value={utilisateurAEditer.prenom} onChange={handleChangeEdition} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" value={utilisateurAEditer.nom} onChange={handleChangeEdition} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={utilisateurAEditer.email} onChange={handleChangeEdition} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={utilisateurAEditer.role}
                  onValueChange={(value) => handleSelectChangeEdition("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrateur">Administrateur</SelectItem>
                    <SelectItem value="comptable">Comptable</SelectItem>
                    <SelectItem value="responsable">Responsable Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={utilisateurAEditer.statut}
                  onValueChange={(value) => handleSelectChangeEdition("statut", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Désactivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogEditionOuvert(false)}>
              Annuler
            </Button>
            <Button onClick={mettreAJourUtilisateur}>Enregistrer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={dialogSuppressionOuvert} onOpenChange={setDialogSuppressionOuvert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {utilisateurASupprimer && (
            <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">
                Vous êtes sur le point de supprimer l'utilisateur {utilisateurASupprimer.prenom}{" "}
                {utilisateurASupprimer.nom}.
              </p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={supprimerUtilisateur}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
