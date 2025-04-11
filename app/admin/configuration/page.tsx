"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, Save, AlertTriangle } from "lucide-react"
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

// Données initiales pour la configuration adaptées à l'Algérie
const initialConfig = {
  general: {
    tauxHoraireDefaut: "1200",
    entreprise: "SARL Industrie Algérienne",
    devise: "DA",
  },
  produits: [
    { id: 1, nom: "Ciment Portland", reference: "CIM-POR", description: "Ciment Portland résistant aux sulfates" },
    { id: 2, nom: "Rond à béton", reference: "RAB-12", description: "Rond à béton diamètre 12mm" },
    { id: 3, nom: "Céramique Sol", reference: "CER-SOL", description: "Céramique pour sol intérieur 40x40" },
    { id: 4, nom: "Peinture Vinylique", reference: "PEIN-VIN", description: "Peinture vinylique intérieure" },
    { id: 5, nom: "Brique Rouge", reference: "BR-ROU", description: "Brique rouge standard 30x15x10" },
  ],
  matieres: [
    { id: 1, nom: "Sable fin", unite: "tonne", prix: "3500" },
    { id: 2, nom: "Gravier concassé", unite: "m³", prix: "4200" },
    { id: 3, nom: "Ciment en vrac", unite: "tonne", prix: "15000" },
    { id: 4, nom: "Acier", unite: "tonne", prix: "180000" },
    { id: 5, nom: "Adjuvant béton", unite: "litre", prix: "1200" },
    { id: 6, nom: "Bois de coffrage", unite: "m²", prix: "2800" },
  ],
  charges: [
    { id: 1, nom: "Électricité", description: "Consommation électrique des équipements" },
    { id: 2, nom: "Carburant", description: "Carburant pour véhicules et générateurs" },
    { id: 3, nom: "Location engins", description: "Location d'engins de chantier" },
    { id: 4, nom: "Maintenance", description: "Maintenance des équipements" },
    { id: 5, nom: "Transport", description: "Transport des matériaux" },
    { id: 6, nom: "Assurances", description: "Assurances chantier et responsabilité civile" },
  ],
}

export default function ConfigurationPage() {
  const { toast } = useToast()
  const [config, setConfig] = useState(initialConfig)
  const [activeTab, setActiveTab] = useState("general")
  const [dialogAjoutProduitOuvert, setDialogAjoutProduitOuvert] = useState(false)
  const [dialogAjoutMatiereOuvert, setDialogAjoutMatiereOuvert] = useState(false)
  const [dialogAjoutChargeOuvert, setDialogAjoutChargeOuvert] = useState(false)
  const [dialogSuppressionOuvert, setDialogSuppressionOuvert] = useState(false)
  const [elementASupprimer, setElementASupprimer] = useState(null)
  const [typeElementASupprimer, setTypeElementASupprimer] = useState("")

  // Nouveaux éléments
  const [nouveauProduit, setNouveauProduit] = useState({ nom: "", reference: "", description: "" })
  const [nouvelleMatiere, setNouvelleMatiere] = useState({ nom: "", unite: "", prix: "" })
  const [nouvelleCharge, setNouvelleCharge] = useState({ nom: "", description: "" })

  // Gérer les changements dans les paramètres généraux
  const handleChangeGeneral = (e) => {
    const { id, value } = e.target
    setConfig((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [id]: value,
      },
    }))
  }

  // Enregistrer les paramètres généraux
  const enregistrerParametresGeneraux = () => {
    // Ici, dans une application réelle, vous enverriez les données au serveur
    // Pour simuler une sauvegarde, nous allons ajouter un délai
    const boutonEnregistrer = document.querySelector("button:has(.save-icon)")
    if (boutonEnregistrer) {
      boutonEnregistrer.setAttribute("disabled", "true")
      boutonEnregistrer.innerHTML = '<span class="animate-spin mr-2">⏳</span> Enregistrement...'
    }

    setTimeout(() => {
      // Réinitialiser le bouton
      if (boutonEnregistrer) {
        boutonEnregistrer.removeAttribute("disabled")
        boutonEnregistrer.innerHTML =
          '<svg class="mr-2 h-4 w-4 save-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>Enregistrer'
      }

      // Sauvegarder dans le localStorage pour simuler une persistance
      localStorage.setItem("budgetprod_config", JSON.stringify(config))

      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres généraux ont été enregistrés avec succès.",
      })
    }, 1000)
  }

  // Gérer les changements dans le formulaire de nouveau produit
  const handleChangeProduit = (e) => {
    const { id, value } = e.target
    setNouveauProduit((prev) => ({ ...prev, [id]: value }))
  }

  // Gérer les changements dans le formulaire de nouvelle matière
  const handleChangeMatiere = (e) => {
    const { id, value } = e.target
    setNouvelleMatiere((prev) => ({ ...prev, [id]: value }))
  }

  // Gérer les changements dans le formulaire de nouvelle charge
  const handleChangeCharge = (e) => {
    const { id, value } = e.target
    setNouvelleCharge((prev) => ({ ...prev, [id]: value }))
  }

  // Ajouter un nouveau produit
  const ajouterProduit = () => {
    if (!nouveauProduit.nom || !nouveauProduit.reference) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newProduit = {
      id: config.produits.length + 1,
      ...nouveauProduit,
    }

    setConfig((prev) => ({
      ...prev,
      produits: [...prev.produits, newProduit],
    }))
    setNouveauProduit({ nom: "", reference: "", description: "" })
    setDialogAjoutProduitOuvert(false)

    toast({
      title: "Produit ajouté",
      description: `Le produit ${nouveauProduit.nom} a été ajouté avec succès.`,
    })
  }

  // Ajouter une nouvelle matière
  const ajouterMatiere = () => {
    if (!nouvelleMatiere.nom || !nouvelleMatiere.unite || !nouvelleMatiere.prix) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newMatiere = {
      id: config.matieres.length + 1,
      ...nouvelleMatiere,
    }

    setConfig((prev) => ({
      ...prev,
      matieres: [...prev.matieres, newMatiere],
    }))
    setNouvelleMatiere({ nom: "", unite: "", prix: "" })
    setDialogAjoutMatiereOuvert(false)

    toast({
      title: "Matière ajoutée",
      description: `La matière ${nouvelleMatiere.nom} a été ajoutée avec succès.`,
    })
  }

  // Ajouter une nouvelle charge
  const ajouterCharge = () => {
    if (!nouvelleCharge.nom) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newCharge = {
      id: config.charges.length + 1,
      ...nouvelleCharge,
    }

    setConfig((prev) => ({
      ...prev,
      charges: [...prev.charges, newCharge],
    }))
    setNouvelleCharge({ nom: "", description: "" })
    setDialogAjoutChargeOuvert(false)

    toast({
      title: "Charge ajoutée",
      description: `La charge ${nouvelleCharge.nom} a été ajoutée avec succès.`,
    })
  }

  // Ouvrir le dialogue de confirmation de suppression
  const confirmerSuppression = (element, type) => {
    setElementASupprimer(element)
    setTypeElementASupprimer(type)
    setDialogSuppressionOuvert(true)
  }

  // Supprimer un élément
  const supprimerElement = () => {
    if (typeElementASupprimer === "produit") {
      setConfig((prev) => ({
        ...prev,
        produits: prev.produits.filter((p) => p.id !== elementASupprimer.id),
      }))
      toast({
        title: "Produit supprimé",
        description: `Le produit ${elementASupprimer.nom} a été supprimé.`,
      })
    } else if (typeElementASupprimer === "matiere") {
      setConfig((prev) => ({
        ...prev,
        matieres: prev.matieres.filter((m) => m.id !== elementASupprimer.id),
      }))
      toast({
        title: "Matière supprimée",
        description: `La matière ${elementASupprimer.nom} a été supprimée.`,
      })
    } else if (typeElementASupprimer === "charge") {
      setConfig((prev) => ({
        ...prev,
        charges: prev.charges.filter((c) => c.id !== elementASupprimer.id),
      }))
      toast({
        title: "Charge supprimée",
        description: `La charge ${elementASupprimer.nom} a été supprimée.`,
      })
    }
    setDialogSuppressionOuvert(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuration système</h1>
        <p className="text-muted-foreground">Configurez les paramètres globaux de l'application</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="produits">Produits</TabsTrigger>
          <TabsTrigger value="matieres">Matières premières</TabsTrigger>
          <TabsTrigger value="charges">Charges</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les paramètres de base du système</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tauxHoraireDefaut">Taux horaire par défaut (DA)</Label>
                <Input
                  id="tauxHoraireDefaut"
                  type="number"
                  value={config.general.tauxHoraireDefaut}
                  onChange={handleChangeGeneral}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entreprise">Nom de l'entreprise</Label>
                <Input id="entreprise" value={config.general.entreprise} onChange={handleChangeGeneral} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="devise">Devise</Label>
                <Input id="devise" value={config.general.devise} onChange={handleChangeGeneral} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={enregistrerParametresGeneraux}>
                <Save className="mr-2 h-4 w-4 save-icon" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="produits" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Produits</CardTitle>
                <CardDescription>Gérez la liste des produits disponibles</CardDescription>
              </div>
              <Button onClick={() => setDialogAjoutProduitOuvert(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du produit</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {config.produits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Aucun produit disponible.
                        </TableCell>
                      </TableRow>
                    ) : (
                      config.produits.map((produit) => (
                        <TableRow key={produit.id}>
                          <TableCell>{produit.nom}</TableCell>
                          <TableCell>{produit.reference}</TableCell>
                          <TableCell>{produit.description}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => confirmerSuppression(produit, "produit")}
                              >
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
        </TabsContent>

        <TabsContent value="matieres" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Matières premières</CardTitle>
                <CardDescription>Gérez la liste des matières premières et leurs prix par défaut</CardDescription>
              </div>
              <Button onClick={() => setDialogAjoutMatiereOuvert(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une matière
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de la matière</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Prix unitaire par défaut (DA)</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {config.matieres.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Aucune matière première disponible.
                        </TableCell>
                      </TableRow>
                    ) : (
                      config.matieres.map((matiere) => (
                        <TableRow key={matiere.id}>
                          <TableCell>{matiere.nom}</TableCell>
                          <TableCell>{matiere.unite}</TableCell>
                          <TableCell>{matiere.prix}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => confirmerSuppression(matiere, "matiere")}
                              >
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
        </TabsContent>

        <TabsContent value="charges" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Charges indirectes</CardTitle>
                <CardDescription>Gérez la liste des types de charges indirectes</CardDescription>
              </div>
              <Button onClick={() => setDialogAjoutChargeOuvert(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une charge
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de la charge</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {config.charges.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          Aucune charge indirecte disponible.
                        </TableCell>
                      </TableRow>
                    ) : (
                      config.charges.map((charge) => (
                        <TableRow key={charge.id}>
                          <TableCell>{charge.nom}</TableCell>
                          <TableCell>{charge.description}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => confirmerSuppression(charge, "charge")}
                              >
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
        </TabsContent>
      </Tabs>

      {/* Dialogue d'ajout de produit */}
      <Dialog open={dialogAjoutProduitOuvert} onOpenChange={setDialogAjoutProduitOuvert}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouveau produit</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom du produit</Label>
              <Input id="nom" value={nouveauProduit.nom} onChange={handleChangeProduit} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Référence</Label>
              <Input id="reference" value={nouveauProduit.reference} onChange={handleChangeProduit} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={nouveauProduit.description} onChange={handleChangeProduit} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAjoutProduitOuvert(false)}>
              Annuler
            </Button>
            <Button onClick={ajouterProduit}>Ajouter le produit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout de matière */}
      <Dialog open={dialogAjoutMatiereOuvert} onOpenChange={setDialogAjoutMatiereOuvert}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle matière</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer une nouvelle matière première</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de la matière</Label>
              <Input id="nom" value={nouvelleMatiere.nom} onChange={handleChangeMatiere} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unite">Unité</Label>
              <Input id="unite" value={nouvelleMatiere.unite} onChange={handleChangeMatiere} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prix">Prix unitaire par défaut (DA)</Label>
              <Input id="prix" type="number" value={nouvelleMatiere.prix} onChange={handleChangeMatiere} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAjoutMatiereOuvert(false)}>
              Annuler
            </Button>
            <Button onClick={ajouterMatiere}>Ajouter la matière</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'ajout de charge */}
      <Dialog open={dialogAjoutChargeOuvert} onOpenChange={setDialogAjoutChargeOuvert}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle charge</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer une nouvelle charge indirecte</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de la charge</Label>
              <Input id="nom" value={nouvelleCharge.nom} onChange={handleChangeCharge} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={nouvelleCharge.description} onChange={handleChangeCharge} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAjoutChargeOuvert(false)}>
              Annuler
            </Button>
            <Button onClick={ajouterCharge}>Ajouter la charge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={dialogSuppressionOuvert} onOpenChange={setDialogSuppressionOuvert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {elementASupprimer && (
            <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">
                Vous êtes sur le point de supprimer{" "}
                {typeElementASupprimer === "produit"
                  ? "le produit"
                  : typeElementASupprimer === "matiere"
                    ? "la matière"
                    : "la charge"}{" "}
                {elementASupprimer.nom}.
              </p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={supprimerElement}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
