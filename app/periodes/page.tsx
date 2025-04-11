"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Lock, Calendar, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Données initiales pour les périodes
const initialPeriodes = [
  {
    id: 1,
    nom: "Avril 2025",
    dateDebut: "01/04/2025",
    dateFin: "30/04/2025",
    etat: "en cours",
  },
  {
    id: 2,
    nom: "Mars 2025",
    dateDebut: "01/03/2025",
    dateFin: "31/03/2025",
    etat: "en validation",
  },
  {
    id: 3,
    nom: "Février 2025",
    dateDebut: "01/02/2025",
    dateFin: "29/02/2025",
    etat: "clôturée",
  },
]

export default function PeriodesPage() {
  const { toast } = useToast()
  const [periodes, setPeriodes] = useState(initialPeriodes)
  const [nouvellePeriode, setNouvellePeriode] = useState({
    dateDebut: "",
    dateFin: "",
    nom: "",
  })
  const [periodeACloturer, setPeriodeACloturer] = useState(null)
  const [dialogOuvert, setDialogOuvert] = useState(false)
  const [confirmationOuverte, setConfirmationOuverte] = useState(false)

  // Gérer les changements dans le formulaire de nouvelle période
  const handleChange = (e) => {
    const { id, value } = e.target
    setNouvellePeriode((prev) => ({ ...prev, [id]: value }))
  }

  // Créer une nouvelle période
  const creerPeriode = () => {
    if (!nouvellePeriode.dateDebut || !nouvellePeriode.dateFin || !nouvellePeriode.nom) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const newPeriode = {
      id: periodes.length + 1,
      nom: nouvellePeriode.nom,
      dateDebut: nouvellePeriode.dateDebut.split("-").reverse().join("/"),
      dateFin: nouvellePeriode.dateFin.split("-").reverse().join("/"),
      etat: "en cours",
    }

    setPeriodes([newPeriode, ...periodes])
    setNouvellePeriode({ dateDebut: "", dateFin: "", nom: "" })
    setDialogOuvert(false)

    toast({
      title: "Période créée",
      description: `La période ${nouvellePeriode.nom} a été créée avec succès.`,
    })
  }

  // Clôturer une période
  const cloturerPeriode = (id) => {
    setPeriodes(
      periodes.map((periode) => {
        if (periode.id === id) {
          return { ...periode, etat: "clôturée" }
        }
        return periode
      }),
    )
    setPeriodeACloturer(null)
    setConfirmationOuverte(false)

    toast({
      title: "Période clôturée",
      description: `La période a été clôturée avec succès.`,
    })
  }

  // Ouvrir la confirmation de clôture
  const confirmerCloture = (periode) => {
    setPeriodeACloturer(periode)
    setConfirmationOuverte(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des périodes</h1>
          <p className="text-muted-foreground">Gérez les périodes comptables et leur statut</p>
        </div>
        <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle période
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle période</DialogTitle>
              <DialogDescription>Définissez les dates de début et de fin de la période</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Input id="dateDebut" type="date" value={nouvellePeriode.dateDebut} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFin">Date de fin</Label>
                  <Input id="dateFin" type="date" value={nouvellePeriode.dateFin} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la période</Label>
                <Input id="nom" placeholder="ex: Avril 2025" value={nouvellePeriode.nom} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={creerPeriode}>
                Créer la période
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des périodes</CardTitle>
          <CardDescription>Consultez et gérez toutes les périodes comptables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Date de fin</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {periodes.map((periode) => (
                  <TableRow key={periode.id}>
                    <TableCell>{periode.nom}</TableCell>
                    <TableCell>{periode.dateDebut}</TableCell>
                    <TableCell>{periode.dateFin}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          periode.etat === "en cours"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : periode.etat === "en validation"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {periode.etat === "en cours"
                          ? "En cours"
                          : periode.etat === "en validation"
                            ? "En validation"
                            : "Clôturée"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {periode.etat !== "clôturée" ? (
                        <Button variant="outline" size="sm" onClick={() => confirmerCloture(periode)}>
                          <Lock className="mr-2 h-4 w-4" />
                          Clôturer
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <Calendar className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de confirmation de clôture */}
      <Dialog open={confirmationOuverte} onOpenChange={setConfirmationOuverte}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la clôture</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir clôturer la période {periodeACloturer?.nom} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-md">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              La clôture d'une période empêchera toute modification ultérieure des données associées.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="default" onClick={() => periodeACloturer && cloturerPeriode(periodeACloturer.id)}>
              Confirmer la clôture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
