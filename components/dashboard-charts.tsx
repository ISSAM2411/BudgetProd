"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Types pour les données
type EvolutionDataItem = {
  mois: string
  previsionnel: number
  reel: number
}

type RepartitionDataItem = {
  name: string
  value: number
  color: string
}

type ComparaisonDataItem = {
  produit: string
  previsionnel: number
  reel: number
}

type TendancesDataItem = {
  mois: string
  ecart: number
  taux: number
}

// Données pour le graphique d'évolution des dépenses par produit
const evolutionData: EvolutionDataItem[] = [
  { mois: "Jan", previsionnel: 9500000, reel: 9200000 },
  { mois: "Fév", previsionnel: 8800000, reel: 8500000 },
  { mois: "Mar", previsionnel: 10000000, reel: 9800000 },
  { mois: "Avr", previsionnel: 12500000, reel: 9875000 },
  { mois: "Mai", previsionnel: 11000000, reel: 0 },
  { mois: "Juin", previsionnel: 11500000, reel: 0 },
]

// Données pour le graphique de répartition des dépenses
const repartitionData: RepartitionDataItem[] = [
  { name: "Matières premières", value: 4500000, color: "#0ea5e9" },
  { name: "Main-d'œuvre", value: 3000000, color: "#8b5cf6" },
  { name: "Charges indirectes", value: 2375000, color: "#f59e0b" },
]

// Données pour le graphique de comparaison par produit
const comparaisonData: ComparaisonDataItem[] = [
  { produit: "Ciment Portland", previsionnel: 4000000, reel: 4720000 },
  { produit: "Rond à béton", previsionnel: 3500000, reel: 2850000 },
  { produit: "Céramique Sol", previsionnel: 2500000, reel: 2500000 },
  { produit: "Peinture Vinylique", previsionnel: 1500000, reel: 1350000 },
  { produit: "Brique Rouge", previsionnel: 1000000, reel: 920000 },
]

// Données pour les tendances mensuelles
const tendancesData: TendancesDataItem[] = [
  { mois: "Jan", ecart: -3, taux: 97 },
  { mois: "Fév", ecart: -3.4, taux: 96.6 },
  { mois: "Mar", ecart: -2, taux: 98 },
  { mois: "Avr", ecart: -21, taux: 79 },
]

// Formater les nombres en milliers de DA
const formatNumberToDA = (value: number): string => {
  return `${(value / 1000).toFixed(0)} k DA`
}

export function DashboardCharts() {
  // État pour le filtre de produit
  const [selectedProduct, setSelectedProduct] = useState<string>("all")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Évolution des dépenses</CardTitle>
              <CardDescription>Comparaison entre prévisionnel et réel</CardDescription>
            </div>
            <Select defaultValue="all" value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les produits" />
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
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis tickFormatter={formatNumberToDA} />
                  <Tooltip formatter={(value: number) => [`${value.toLocaleString()} DA`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="previsionnel" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="reel" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              {selectedProduct !== "all"
                ? `Évolution des dépenses pour ${selectedProduct}`
                : "Évolution des dépenses pour tous les produits"}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <CardDescription>Par catégorie pour la période actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={repartitionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {repartitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value.toLocaleString()} DA`, "Montant"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparaison" className="space-y-4">
        <TabsList>
          <TabsTrigger value="comparaison">Comparaison par produit</TabsTrigger>
          <TabsTrigger value="tendances">Tendances mensuelles</TabsTrigger>
        </TabsList>

        <TabsContent value="comparaison">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison prévisionnel vs réel</CardTitle>
              <CardDescription>Par produit pour la période actuelle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparaisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="produit" />
                    <YAxis tickFormatter={formatNumberToDA} />
                    <Tooltip formatter={(value: number) => [`${value.toLocaleString()} DA`, ""]} />
                    <Legend />
                    <Bar dataKey="previsionnel" fill="#0ea5e9" />
                    <Bar dataKey="reel" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendances">
          <Card>
            <CardHeader>
              <CardTitle>Tendances mensuelles</CardTitle>
              <CardDescription>Évolution des écarts et taux de réalisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tendancesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ecart" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="taux" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
