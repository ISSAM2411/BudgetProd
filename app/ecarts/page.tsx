"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, Filter } from "lucide-react"

// Données de test pour les écarts budgétaires adaptées à l'Algérie
const ecartsData = {
  avril2025: {
    all: [
      {
        id: 1,
        produit: "Ciment Portland",
        type: "produit",
        budget: 4000000,
        reel: 4720000,
        ecartValeur: 720000,
        ecartPourcentage: 18,
        statut: "défavorable",
        sousElements: [
          {
            id: 11,
            nom: "Matières premières",
            budget: 2000000,
            reel: 2400000,
            ecartValeur: 400000,
            ecartPourcentage: 20,
            statut: "défavorable",
          },
          {
            id: 12,
            nom: "Main-d'œuvre",
            budget: 1200000,
            reel: 1450000,
            ecartValeur: 250000,
            ecartPourcentage: 20.8,
            statut: "défavorable",
          },
          {
            id: 13,
            nom: "Charges indirectes",
            budget: 800000,
            reel: 870000,
            ecartValeur: 70000,
            ecartPourcentage: 8.8,
            statut: "défavorable",
          },
        ],
      },
      {
        id: 2,
        produit: "Rond à béton",
        type: "produit",
        budget: 3500000,
        reel: 2850000,
        ecartValeur: -650000,
        ecartPourcentage: -18.6,
        statut: "favorable",
        sousElements: [
          {
            id: 21,
            nom: "Matières premières",
            budget: 1800000,
            reel: 1450000,
            ecartValeur: -350000,
            ecartPourcentage: -19.4,
            statut: "favorable",
          },
          {
            id: 22,
            nom: "Main-d'œuvre",
            budget: 1000000,
            reel: 850000,
            ecartValeur: -150000,
            ecartPourcentage: -15,
            statut: "favorable",
          },
          {
            id: 23,
            nom: "Charges indirectes",
            budget: 700000,
            reel: 550000,
            ecartValeur: -150000,
            ecartPourcentage: -21.4,
            statut: "favorable",
          },
        ],
      },
      {
        id: 3,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2500000,
        reel: 2500000,
        ecartValeur: 0,
        ecartPourcentage: 0,
        statut: "équilibré",
        sousElements: [
          {
            id: 31,
            nom: "Matières premières",
            budget: 1200000,
            reel: 1180000,
            ecartValeur: -20000,
            ecartPourcentage: -1.7,
            statut: "favorable",
          },
          {
            id: 32,
            nom: "Main-d'œuvre",
            budget: 800000,
            reel: 820000,
            ecartValeur: 20000,
            ecartPourcentage: 2.5,
            statut: "défavorable",
          },
          {
            id: 33,
            nom: "Charges indirectes",
            budget: 500000,
            reel: 500000,
            ecartValeur: 0,
            ecartPourcentage: 0,
            statut: "équilibré",
          },
        ],
      },
      {
        id: 4,
        produit: "Peinture Vinylique",
        type: "produit",
        budget: 1500000,
        reel: 1350000,
        ecartValeur: -150000,
        ecartPourcentage: -10,
        statut: "favorable",
        sousElements: [
          {
            id: 41,
            nom: "Matières premières",
            budget: 750000,
            reel: 680000,
            ecartValeur: -70000,
            ecartPourcentage: -9.3,
            statut: "favorable",
          },
          {
            id: 42,
            nom: "Main-d'œuvre",
            budget: 450000,
            reel: 400000,
            ecartValeur: -50000,
            ecartPourcentage: -11.1,
            statut: "favorable",
          },
          {
            id: 43,
            nom: "Charges indirectes",
            budget: 300000,
            reel: 270000,
            ecartValeur: -30000,
            ecartPourcentage: -10,
            statut: "favorable",
          },
        ],
      },
      {
        id: 5,
        produit: "Brique Rouge",
        type: "produit",
        budget: 1000000,
        reel: 920000,
        ecartValeur: -80000,
        ecartPourcentage: -8,
        statut: "favorable",
        sousElements: [
          {
            id: 51,
            nom: "Matières premières",
            budget: 500000,
            reel: 460000,
            ecartValeur: -40000,
            ecartPourcentage: -8,
            statut: "favorable",
          },
          {
            id: 52,
            nom: "Main-d'œuvre",
            budget: 300000,
            reel: 280000,
            ecartValeur: -20000,
            ecartPourcentage: -6.7,
            statut: "favorable",
          },
          {
            id: 53,
            nom: "Charges indirectes",
            budget: 200000,
            reel: 180000,
            ecartValeur: -20000,
            ecartPourcentage: -10,
            statut: "favorable",
          },
        ],
      },
    ],
    cimentPortland: [
      {
        id: 1,
        produit: "Ciment Portland",
        type: "produit",
        budget: 4000000,
        reel: 4720000,
        ecartValeur: 720000,
        ecartPourcentage: 18,
        statut: "défavorable",
        sousElements: [
          {
            id: 11,
            nom: "Matières premières",
            budget: 2000000,
            reel: 2400000,
            ecartValeur: 400000,
            ecartPourcentage: 20,
            statut: "défavorable",
          },
          {
            id: 12,
            nom: "Main-d'œuvre",
            budget: 1200000,
            reel: 1450000,
            ecartValeur: 250000,
            ecartPourcentage: 20.8,
            statut: "défavorable",
          },
          {
            id: 13,
            nom: "Charges indirectes",
            budget: 800000,
            reel: 870000,
            ecartValeur: 70000,
            ecartPourcentage: 8.8,
            statut: "défavorable",
          },
        ],
      },
    ],
    rondBeton: [
      {
        id: 2,
        produit: "Rond à béton",
        type: "produit",
        budget: 3500000,
        reel: 2850000,
        ecartValeur: -650000,
        ecartPourcentage: -18.6,
        statut: "favorable",
        sousElements: [
          {
            id: 21,
            nom: "Matières premières",
            budget: 1800000,
            reel: 1450000,
            ecartValeur: -350000,
            ecartPourcentage: -19.4,
            statut: "favorable",
          },
          {
            id: 22,
            nom: "Main-d'œuvre",
            budget: 1000000,
            reel: 850000,
            ecartValeur: -150000,
            ecartPourcentage: -15,
            statut: "favorable",
          },
          {
            id: 23,
            nom: "Charges indirectes",
            budget: 700000,
            reel: 550000,
            ecartValeur: -150000,
            ecartPourcentage: -21.4,
            statut: "favorable",
          },
        ],
      },
    ],
    ceramiqueSol: [
      {
        id: 3,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2500000,
        reel: 2500000,
        ecartValeur: 0,
        ecartPourcentage: 0,
        statut: "équilibré",
        sousElements: [
          {
            id: 31,
            nom: "Matières premières",
            budget: 1200000,
            reel: 1180000,
            ecartValeur: -20000,
            ecartPourcentage: -1.7,
            statut: "favorable",
          },
          {
            id: 32,
            nom: "Main-d'œuvre",
            budget: 800000,
            reel: 820000,
            ecartValeur: 20000,
            ecartPourcentage: 2.5,
            statut: "défavorable",
          },
          {
            id: 33,
            nom: "Charges indirectes",
            budget: 500000,
            reel: 500000,
            ecartValeur: 0,
            ecartPourcentage: 0,
            statut: "équilibré",
          },
        ],
      },
    ],
    peintureVinylique: [
      {
        id: 4,
        produit: "Peinture Vinylique",
        type: "produit",
        budget: 1500000,
        reel: 1350000,
        ecartValeur: -150000,
        ecartPourcentage: -10,
        statut: "favorable",
        sousElements: [
          {
            id: 41,
            nom: "Matières premières",
            budget: 750000,
            reel: 680000,
            ecartValeur: -70000,
            ecartPourcentage: -9.3,
            statut: "favorable",
          },
          {
            id: 42,
            nom: "Main-d'œuvre",
            budget: 450000,
            reel: 400000,
            ecartValeur: -50000,
            ecartPourcentage: -11.1,
            statut: "favorable",
          },
          {
            id: 43,
            nom: "Charges indirectes",
            budget: 300000,
            reel: 270000,
            ecartValeur: -30000,
            ecartPourcentage: -10,
            statut: "favorable",
          },
        ],
      },
    ],
    briqueRouge: [
      {
        id: 5,
        produit: "Brique Rouge",
        type: "produit",
        budget: 1000000,
        reel: 920000,
        ecartValeur: -80000,
        ecartPourcentage: -8,
        statut: "favorable",
        sousElements: [
          {
            id: 51,
            nom: "Matières premières",
            budget: 500000,
            reel: 460000,
            ecartValeur: -40000,
            ecartPourcentage: -8,
            statut: "favorable",
          },
          {
            id: 52,
            nom: "Main-d'œuvre",
            budget: 300000,
            reel: 280000,
            ecartValeur: -20000,
            ecartPourcentage: -6.7,
            statut: "favorable",
          },
          {
            id: 53,
            nom: "Charges indirectes",
            budget: 200000,
            reel: 180000,
            ecartValeur: -20000,
            ecartPourcentage: -10,
            statut: "favorable",
          },
        ],
      },
    ],
  },
  mars2025: {
    all: [
      {
        id: 6,
        produit: "Ciment Portland",
        type: "produit",
        budget: 3800000,
        reel: 3700000,
        ecartValeur: -100000,
        ecartPourcentage: -2.6,
        statut: "favorable",
        sousElements: [],
      },
      {
        id: 7,
        produit: "Rond à béton",
        type: "produit",
        budget: 3200000,
        reel: 3400000,
        ecartValeur: 200000,
        ecartPourcentage: 6.3,
        statut: "défavorable",
        sousElements: [],
      },
      {
        id: 8,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2300000,
        reel: 2250000,
        ecartValeur: -50000,
        ecartPourcentage: -2.2,
        statut: "favorable",
        sousElements: [],
      },
    ],
    cimentPortland: [
      {
        id: 6,
        produit: "Ciment Portland",
        type: "produit",
        budget: 3800000,
        reel: 3700000,
        ecartValeur: -100000,
        ecartPourcentage: -2.6,
        statut: "favorable",
        sousElements: [],
      },
    ],
    rondBeton: [
      {
        id: 7,
        produit: "Rond à béton",
        type: "produit",
        budget: 3200000,
        reel: 3400000,
        ecartValeur: 200000,
        ecartPourcentage: 6.3,
        statut: "défavorable",
        sousElements: [],
      },
    ],
    ceramiqueSol: [
      {
        id: 8,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2300000,
        reel: 2250000,
        ecartValeur: -50000,
        ecartPourcentage: -2.2,
        statut: "favorable",
        sousElements: [],
      },
    ],
    peintureVinylique: [],
    briqueRouge: [],
  },
  fevrier2025: {
    all: [
      {
        id: 9,
        produit: "Ciment Portland",
        type: "produit",
        budget: 3500000,
        reel: 3450000,
        ecartValeur: -50000,
        ecartPourcentage: -1.4,
        statut: "favorable",
        sousElements: [],
      },
      {
        id: 10,
        produit: "Rond à béton",
        type: "produit",
        budget: 3000000,
        reel: 2950000,
        ecartValeur: -50000,
        ecartPourcentage: -1.7,
        statut: "favorable",
        sousElements: [],
      },
      {
        id: 11,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2100000,
        reel: 2150000,
        ecartValeur: 50000,
        ecartPourcentage: 2.4,
        statut: "défavorable",
        sousElements: [],
      },
    ],
    cimentPortland: [
      {
        id: 9,
        produit: "Ciment Portland",
        type: "produit",
        budget: 3500000,
        reel: 3450000,
        ecartValeur: -50000,
        ecartPourcentage: -1.4,
        statut: "favorable",
        sousElements: [],
      },
    ],
    rondBeton: [
      {
        id: 10,
        produit: "Rond à béton",
        type: "produit",
        budget: 3000000,
        reel: 2950000,
        ecartValeur: -50000,
        ecartPourcentage: -1.7,
        statut: "favorable",
        sousElements: [],
      },
    ],
    ceramiqueSol: [
      {
        id: 11,
        produit: "Céramique Sol",
        type: "produit",
        budget: 2100000,
        reel: 2150000,
        ecartValeur: 50000,
        ecartPourcentage: 2.4,
        statut: "défavorable",
        sousElements: [],
      },
    ],
    peintureVinylique: [],
    briqueRouge: [],
  },
}

export default function EcartsPage() {
  const [periode, setPeriode] = useState("avril2025")
  const [produit, setProduit] = useState("all")
  const [ecarts, setEcarts] = useState(ecartsData[periode][produit])

  // Fonction pour calculer les totaux
  const calculerTotaux = (elements) => {
    if (!elements || elements.length === 0) return { budget: 0, reel: 0, ecartValeur: 0, ecartPourcentage: 0 }

    const totaux = elements.reduce(
      (acc, element) => {
        return {
          budget: acc.budget + element.budget,
          reel: acc.reel + element.reel,
          ecartValeur: acc.ecartValeur + element.ecartValeur,
        }
      },
      { budget: 0, reel: 0, ecartValeur: 0 },
    )

    totaux.ecartPourcentage =
      totaux.budget > 0 ? Number.parseFloat(((totaux.ecartValeur / totaux.budget) * 100).toFixed(2)) : 0

    totaux.statut = totaux.ecartValeur > 0 ? "défavorable" : totaux.ecartValeur < 0 ? "favorable" : "équilibré"

    return totaux
  }

  // Mettre à jour les écarts lorsque les filtres changent
  const handlePeriodeChange = (value) => {
    setPeriode(value)
    setEcarts(ecartsData[value][produit])
  }

  const handleProduitChange = (value) => {
    setProduit(value)
    setEcarts(ecartsData[periode][value])
  }

  // Calculer les totaux pour l'affichage
  const totaux = calculerTotaux(ecarts)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Écarts budgétaires</h1>
        <p className="text-muted-foreground">Analysez les écarts entre budgets prévisionnels et dépenses réelles</p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={periode} onValueChange={handlePeriodeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="avril2025">Avril 2025</SelectItem>
            <SelectItem value="mars2025">Mars 2025</SelectItem>
            <SelectItem value="fevrier2025">Février 2025</SelectItem>
          </SelectContent>
        </Select>

        <Select value={produit} onValueChange={handleProduitChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Produit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les produits</SelectItem>
            <SelectItem value="cimentPortland">Ciment Portland</SelectItem>
            <SelectItem value="rondBeton">Rond à béton</SelectItem>
            <SelectItem value="ceramiqueSol">Céramique Sol</SelectItem>
            <SelectItem value="peintureVinylique">Peinture Vinylique</SelectItem>
            <SelectItem value="briqueRouge">Brique Rouge</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Écarts budgétaires -{" "}
              {periode === "avril2025" ? "Avril 2025" : periode === "mars2025" ? "Mars 2025" : "Février 2025"}
            </CardTitle>
            <CardDescription>Comparaison entre budget prévisionnel et dépenses réelles</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Filter className="h-4 w-4" />
            {produit === "all"
              ? "Tous les produits"
              : produit === "cimentPortland"
                ? "Ciment Portland"
                : produit === "rondBeton"
                  ? "Rond à béton"
                  : produit === "ceramiqueSol"
                    ? "Céramique Sol"
                    : produit === "peintureVinylique"
                      ? "Peinture Vinylique"
                      : "Brique Rouge"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Élément</TableHead>
                  <TableHead>Budget prévisionnel</TableHead>
                  <TableHead>Réalisé</TableHead>
                  <TableHead>Écart (valeur)</TableHead>
                  <TableHead>Écart (%)</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ecarts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Aucune donnée disponible pour cette sélection
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {ecarts.map((element) => (
                      <>
                        <TableRow key={element.id} className="font-medium bg-muted/50">
                          <TableCell>{element.produit}</TableCell>
                          <TableCell>{element.budget.toLocaleString()} DA</TableCell>
                          <TableCell>{element.reel.toLocaleString()} DA</TableCell>
                          <TableCell>
                            {element.ecartValeur > 0 ? "+" : ""}
                            {element.ecartValeur.toLocaleString()} DA
                          </TableCell>
                          <TableCell>
                            {element.ecartPourcentage > 0 ? "+" : ""}
                            {element.ecartPourcentage}%
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                element.statut === "défavorable"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : element.statut === "favorable"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-gray-50 text-gray-700 border-gray-200"
                              }
                            >
                              {element.statut === "défavorable" ? (
                                <ArrowUpIcon className="mr-1 h-3 w-3" />
                              ) : element.statut === "favorable" ? (
                                <ArrowDownIcon className="mr-1 h-3 w-3" />
                              ) : (
                                <MinusIcon className="mr-1 h-3 w-3" />
                              )}
                              {element.statut.charAt(0).toUpperCase() + element.statut.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                        {element.sousElements &&
                          element.sousElements.map((sousElement) => (
                            <TableRow key={sousElement.id}>
                              <TableCell className="pl-8">{sousElement.nom}</TableCell>
                              <TableCell>{sousElement.budget.toLocaleString()} DA</TableCell>
                              <TableCell>{sousElement.reel.toLocaleString()} DA</TableCell>
                              <TableCell>
                                {sousElement.ecartValeur > 0 ? "+" : ""}
                                {sousElement.ecartValeur.toLocaleString()} DA
                              </TableCell>
                              <TableCell>
                                {sousElement.ecartPourcentage > 0 ? "+" : ""}
                                {sousElement.ecartPourcentage}%
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    sousElement.statut === "défavorable"
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : sousElement.statut === "favorable"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                  }
                                >
                                  {sousElement.statut === "défavorable" ? (
                                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                                  ) : sousElement.statut === "favorable" ? (
                                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                                  ) : (
                                    <MinusIcon className="mr-1 h-3 w-3" />
                                  )}
                                  {sousElement.statut.charAt(0).toUpperCase() + sousElement.statut.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                      </>
                    ))}

                    <TableRow className="font-bold bg-muted">
                      <TableCell>TOTAL</TableCell>
                      <TableCell>{totaux.budget.toLocaleString()} DA</TableCell>
                      <TableCell>{totaux.reel.toLocaleString()} DA</TableCell>
                      <TableCell>
                        {totaux.ecartValeur > 0 ? "+" : ""}
                        {totaux.ecartValeur.toLocaleString()} DA
                      </TableCell>
                      <TableCell>
                        {totaux.ecartPourcentage > 0 ? "+" : ""}
                        {totaux.ecartPourcentage}%
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            totaux.statut === "défavorable"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : totaux.statut === "favorable"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {totaux.statut === "défavorable" ? (
                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                          ) : totaux.statut === "favorable" ? (
                            <ArrowDownIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <MinusIcon className="mr-1 h-3 w-3" />
                          )}
                          {totaux.statut.charAt(0).toUpperCase() + totaux.statut.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
