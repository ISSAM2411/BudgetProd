"use client"

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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Données pour le graphique de répartition des dépenses
const repartitionData = [
  { name: "Matières premières", value: 4500000, color: "#0ea5e9" },
  { name: "Main-d'œuvre", value: 3000000, color: "#8b5cf6" },
  { name: "Charges indirectes", value: 2375000, color: "#f59e0b" },
]

// Données pour l'évolution mensuelle
const evolutionData = [
  { mois: "Jan", budget: 9500000, depenses: 9200000 },
  { mois: "Fév", budget: 8800000, depenses: 8500000 },
  { mois: "Mar", budget: 10000000, depenses: 9800000 },
  { mois: "Avr", budget: 12500000, depenses: 9875000 },
]

// Données pour la comparaison par produit
const comparaisonData = [
  { produit: "Ciment Portland", budget: 4000000, depenses: 4720000 },
  { produit: "Rond à béton", budget: 3500000, depenses: 2850000 },
  { produit: "Céramique Sol", budget: 2500000, depenses: 2500000 },
  { produit: "Peinture Vinylique", budget: 1500000, depenses: 1350000 },
  { produit: "Brique Rouge", budget: 1000000, depenses: 920000 },
]

// Formater les nombres en milliers de DA
const formatNumberToDA = (value) => {
  return `${(value / 1000).toFixed(0)} k DA`
}

export function RepartitionChart() {
  return (
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
          <Tooltip formatter={(value) => [`${value.toLocaleString()} DA`, "Montant"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EvolutionChart() {
  return (
    <ChartContainer
      config={{
        budget: {
          label: "Budget prévisionnel",
          color: "hsl(var(--chart-1))",
        },
        depenses: {
          label: "Dépenses réelles",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={evolutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis tickFormatter={formatNumberToDA} />
          <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value.toLocaleString()} DA`, ""]} />
          <Legend />
          <Line type="monotone" dataKey="budget" stroke="var(--color-budget)" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="depenses" stroke="var(--color-depenses)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function ComparaisonChart() {
  return (
    <ChartContainer
      config={{
        budget: {
          label: "Budget prévisionnel",
          color: "hsl(var(--chart-1))",
        },
        depenses: {
          label: "Dépenses réelles",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparaisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="produit" />
          <YAxis tickFormatter={formatNumberToDA} />
          <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value.toLocaleString()} DA`, ""]} />
          <Legend />
          <Bar dataKey="budget" fill="var(--color-budget)" />
          <Bar dataKey="depenses" fill="var(--color-depenses)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
