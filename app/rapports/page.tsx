"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Printer, Loader2 } from "lucide-react"
import { RepartitionChart, EvolutionChart, ComparaisonChart } from "@/components/rapport-charts"
import { useToast } from "@/hooks/use-toast"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"

// Données de test pour les rapports adaptées à l'Algérie
const rapportData = {
  periodes: ["avril2025", "mars2025", "fevrier2025", "t12025", "annee2025"],
  produits: ["cimentPortland", "rondBeton", "ceramiqueSol", "peintureVinylique", "briqueRouge"],
  utilisateurs: ["kbenali", "ahadj", "mcherif", "sboudiaf", "ykaci"],
  budgets: {
    avril2025: {
      global: 12500000,
      cimentPortland: 4000000,
      rondBeton: 3500000,
      ceramiqueSol: 2500000,
      peintureVinylique: 1500000,
      briqueRouge: 1000000,
    },
    mars2025: {
      global: 10000000,
      cimentPortland: 3800000,
      rondBeton: 3200000,
      ceramiqueSol: 2300000,
      peintureVinylique: 1400000,
      briqueRouge: 950000,
    },
    fevrier2025: {
      global: 9500000,
      cimentPortland: 3500000,
      rondBeton: 3000000,
      ceramiqueSol: 2100000,
      peintureVinylique: 1300000,
      briqueRouge: 900000,
    },
  },
  depenses: {
    avril2025: {
      global: 9875000,
      cimentPortland: 4720000,
      rondBeton: 2850000,
      ceramiqueSol: 2500000,
      peintureVinylique: 1350000,
      briqueRouge: 920000,
    },
    mars2025: {
      global: 9800000,
      cimentPortland: 3700000,
      rondBeton: 3400000,
      ceramiqueSol: 2250000,
      peintureVinylique: 1380000,
      briqueRouge: 930000,
    },
    fevrier2025: {
      global: 9300000,
      cimentPortland: 3450000,
      rondBeton: 2950000,
      ceramiqueSol: 2150000,
      peintureVinylique: 1280000,
      briqueRouge: 880000,
    },
  },
  utilisateursData: {
    kbenali: {
      avril2025: 4500000,
      mars2025: 4200000,
      fevrier2025: 4000000,
    },
    ahadj: {
      avril2025: 3000000,
      mars2025: 2800000,
      fevrier2025: 2500000,
    },
    mcherif: {
      avril2025: 2000000,
      mars2025: 1800000,
      fevrier2025: 1800000,
    },
    sboudiaf: {
      avril2025: 1500000,
      mars2025: 1400000,
      fevrier2025: 1300000,
    },
    ykaci: {
      avril2025: 900000,
      mars2025: 850000,
      fevrier2025: 800000,
    },
  },
}

export default function RapportsPage() {
  const { toast } = useToast()
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [isExportingExcel, setIsExportingExcel] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  // États pour les filtres
  const [periodeGlobal, setPeriodeGlobal] = useState("avril2025")
  const [periodeProduit, setPeriodeProduit] = useState("avril2025")
  const [periodeUtilisateur, setPeriodeUtilisateur] = useState("avril2025")
  const [produitSelectionne, setProduitSelectionne] = useState("cimentPortland")
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState("kbenali")

  // États pour les données filtrées
  const [budgetGlobal, setBudgetGlobal] = useState(rapportData.budgets[periodeGlobal].global)
  const [depensesGlobal, setDepensesGlobal] = useState(rapportData.depenses[periodeGlobal].global)
  const [budgetProduit, setBudgetProduit] = useState(rapportData.budgets[periodeProduit][produitSelectionne])
  const [depensesProduit, setDepensesProduit] = useState(rapportData.depenses[periodeProduit][produitSelectionne])
  const [depensesUtilisateur, setDepensesUtilisateur] = useState(
    rapportData.utilisateursData[utilisateurSelectionne][periodeUtilisateur],
  )

  // Mettre à jour les données lorsque les filtres changent
  useEffect(() => {
    setBudgetGlobal(rapportData.budgets[periodeGlobal].global)
    setDepensesGlobal(rapportData.depenses[periodeGlobal].global)
  }, [periodeGlobal])

  useEffect(() => {
    setBudgetProduit(rapportData.budgets[periodeProduit][produitSelectionne])
    setDepensesProduit(rapportData.depenses[periodeProduit][produitSelectionne])
  }, [periodeProduit, produitSelectionne])

  useEffect(() => {
    setDepensesUtilisateur(rapportData.utilisateursData[utilisateurSelectionne][periodeUtilisateur])
  }, [periodeUtilisateur, utilisateurSelectionne])

  // Fonction d'exportation en PDF
  const exportToPDF = async (containerSelector: string, filename: string) => {
    setIsExportingPDF(true)
    try {
      const container = document.querySelector(containerSelector) as HTMLElement
      if (!container) {
        throw new Error("Container not found")
      }

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${filename}.pdf`)

      toast({
        title: "Exportation réussie",
        description: "Le rapport a été exporté en PDF avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue pendant l'exportation du PDF.",
        variant: "destructive",
      })
      console.error("PDF export error:", error)
    } finally {
      setIsExportingPDF(false)
    }
  }

  // Fonction d'exportation en Excel
  const exportToExcel = (data: any[], filename: string) => {
    setIsExportingExcel(true)
    try {
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport")

      // Sauvegarder le fichier
      XLSX.writeFile(workbook, `${filename}.xlsx`)

      toast({
        title: "Exportation réussie",
        description: "Le rapport a été exporté en Excel avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue pendant l'exportation Excel.",
        variant: "destructive",
      })
      console.error("Excel export error:", error)
    } finally {
      setIsExportingExcel(false)
    }
  }

  // Exemple de données pour l'export Excel
  const getReportData = (type = "global") => {
    if (type === "global") {
      return [
        {
          Catégorie: "Matières premières",
          Budget: Math.round(budgetGlobal * 0.45),
          Dépenses: Math.round(depensesGlobal * 0.47),
          Écart: Math.round(depensesGlobal * 0.47 - budgetGlobal * 0.45),
          "Écart %": (((depensesGlobal * 0.47 - budgetGlobal * 0.45) / (budgetGlobal * 0.45)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Main-d'œuvre",
          Budget: Math.round(budgetGlobal * 0.35),
          Dépenses: Math.round(depensesGlobal * 0.33),
          Écart: Math.round(depensesGlobal * 0.33 - budgetGlobal * 0.35),
          "Écart %": (((depensesGlobal * 0.33 - budgetGlobal * 0.35) / (budgetGlobal * 0.35)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Charges indirectes",
          Budget: Math.round(budgetGlobal * 0.2),
          Dépenses: Math.round(depensesGlobal * 0.2),
          Écart: Math.round(depensesGlobal * 0.2 - budgetGlobal * 0.2),
          "Écart %": (((depensesGlobal * 0.2 - budgetGlobal * 0.2) / (budgetGlobal * 0.2)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Total",
          Budget: budgetGlobal,
          Dépenses: depensesGlobal,
          Écart: depensesGlobal - budgetGlobal,
          "Écart %": (((depensesGlobal - budgetGlobal) / budgetGlobal) * 100).toFixed(1) + "%",
        },
      ]
    } else if (type === "produit") {
      return [
        {
          Catégorie: "Matières premières",
          Budget: Math.round(budgetProduit * 0.45),
          Dépenses: Math.round(depensesProduit * 0.47),
          Écart: Math.round(depensesProduit * 0.47 - budgetProduit * 0.45),
          "Écart %":
            (((depensesProduit * 0.47 - budgetProduit * 0.45) / (budgetProduit * 0.45)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Main-d'œuvre",
          Budget: Math.round(budgetProduit * 0.35),
          Dépenses: Math.round(depensesProduit * 0.33),
          Écart: Math.round(depensesProduit * 0.33 - budgetProduit * 0.35),
          "Écart %":
            (((depensesProduit * 0.33 - budgetProduit * 0.35) / (budgetProduit * 0.35)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Charges indirectes",
          Budget: Math.round(budgetProduit * 0.2),
          Dépenses: Math.round(depensesProduit * 0.2),
          Écart: Math.round(depensesProduit * 0.2 - budgetProduit * 0.2),
          "Écart %": (((depensesProduit * 0.2 - budgetProduit * 0.2) / (budgetProduit * 0.2)) * 100).toFixed(1) + "%",
        },
        {
          Catégorie: "Total",
          Budget: budgetProduit,
          Dépenses: depensesProduit,
          Écart: depensesProduit - budgetProduit,
          "Écart %": (((depensesProduit - budgetProduit) / budgetProduit) * 100).toFixed(1) + "%",
        },
      ]
    } else {
      return [
        {
          Utilisateur: getUtilisateurNom(utilisateurSelectionne),
          Période: getPeriodeNom(periodeUtilisateur),
          "Total dépenses": depensesUtilisateur,
        },
      ]
    }
  }

  // Fonction d'impression
  const printReport = (containerSelector: string) => {
    setIsPrinting(true)
    try {
      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        throw new Error("Impossible d'ouvrir la fenêtre d'impression")
      }

      const container = document.querySelector(containerSelector) as HTMLElement
      if (!container) {
        throw new Error("Container not found")
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>Rapport BudgetProd</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .chart-container { margin-bottom: 20px; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Rapport BudgetProd - ${getPeriodeNom(periodeGlobal)}</h1>
            <div>${container.innerHTML}</div>
          </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()

      // Imprimer après le chargement des images
      printWindow.addEventListener(
        "load",
        () => {
          printWindow.print()
          printWindow.close()
        },
        { once: true },
      )

      toast({
        title: "Impression lancée",
        description: "La fenêtre d'impression a été ouverte.",
      })
    } catch (error) {
      toast({
        title: "Erreur d'impression",
        description: "Une erreur est survenue pendant l'impression.",
        variant: "destructive",
      })
      console.error("Print error:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  // Fonctions utilitaires pour obtenir les noms formatés
  const getPeriodeNom = (periode: string) => {
    switch (periode) {
      case "avril2025":
        return "Avril 2025"
      case "mars2025":
        return "Mars 2025"
      case "fevrier2025":
        return "Février 2025"
      case "t12025":
        return "T1 2025"
      case "annee2025":
        return "Année 2025"
      default:
        return periode
    }
  }

  const getUtilisateurNom = (utilisateur: string) => {
    switch (utilisateur) {
      case "kbenali":
        return "Karim Benali"
      case "ahadj":
        return "Amina Hadj"
      case "mcherif":
        return "Mohamed Cherif"
      case "sboudiaf":
        return "Samira Boudiaf"
      case "ykaci":
        return "Yacine Kaci"
      default:
        return utilisateur
    }
  }

  const getProduitNom = (produit: string) => {
    switch (produit) {
      case "cimentPortland":
        return "Ciment Portland"
      case "rondBeton":
        return "Rond à béton"
      case "ceramiqueSol":
        return "Céramique Sol"
      case "peintureVinylique":
        return "Peinture Vinylique"
      case "briqueRouge":
        return "Brique Rouge"
      default:
        return produit
    }
  }

  // Calculer l'écart global
  const ecartGlobal = depensesGlobal - budgetGlobal
  const ecartPourcentageGlobal = ((ecartGlobal / budgetGlobal) * 100).toFixed(2)

  // Calculer l'écart pour le produit
  const ecartProduit = depensesProduit - budgetProduit
  const ecartPourcentageProduit = ((ecartProduit / budgetProduit) * 100).toFixed(2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rapports & exportation</h1>
        <p className="text-muted-foreground">Générez et exportez des rapports détaillés</p>
      </div>

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">Rapport global</TabsTrigger>
          <TabsTrigger value="produit">Rapport par produit</TabsTrigger>
          <TabsTrigger value="utilisateur">Rapport par utilisateur</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapport global par période</CardTitle>
              <CardDescription>Générez un rapport complet pour une période spécifique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={periodeGlobal} onValueChange={setPeriodeGlobal}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avril2025">Avril 2025</SelectItem>
                    <SelectItem value="mars2025">Mars 2025</SelectItem>
                    <SelectItem value="fevrier2025">Février 2025</SelectItem>
                    <SelectItem value="t12025">T1 2025</SelectItem>
                    <SelectItem value="annee2025">Année 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div id="rapport-global" className="rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Budget prévisionnel</div>
                    <div className="text-2xl font-bold">{budgetGlobal.toLocaleString()} DA</div>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Dépenses réelles</div>
                    <div className="text-2xl font-bold">{depensesGlobal.toLocaleString()} DA</div>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Écart global</div>
                    <div
                      className={`text-2xl font-bold ${ecartGlobal < 0 ? "text-green-600" : ecartGlobal > 0 ? "text-red-600" : ""}`}
                    >
                      {ecartGlobal > 0 ? "+" : ""}
                      {ecartGlobal.toLocaleString()} DA ({ecartGlobal < 0 ? "" : "+"}
                      {ecartPourcentageGlobal}%)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Répartition des dépenses</h3>
                    <div className="chart-container">
                      <RepartitionChart />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Évolution mensuelle</h3>
                    <div className="chart-container">
                      <EvolutionChart />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Comparaison par produit</h3>
                    <div className="chart-container">
                      <ComparaisonChart />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() => exportToPDF("#rapport-global", `rapport-global-${periodeGlobal}`)}
                disabled={isExportingPDF}
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter en PDF
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => exportToExcel(getReportData("global"), `rapport-global-${periodeGlobal}`)}
                disabled={isExportingExcel}
              >
                {isExportingExcel ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter en Excel
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => printReport("#rapport-global")} disabled={isPrinting}>
                {isPrinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Préparation...
                  </>
                ) : (
                  <>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="produit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapport par produit</CardTitle>
              <CardDescription>Générez un rapport détaillé pour un produit spécifique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={produitSelectionne} onValueChange={setProduitSelectionne}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Produit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cimentPortland">Ciment Portland</SelectItem>
                    <SelectItem value="rondBeton">Rond à béton</SelectItem>
                    <SelectItem value="ceramiqueSol">Céramique Sol</SelectItem>
                    <SelectItem value="peintureVinylique">Peinture Vinylique</SelectItem>
                    <SelectItem value="briqueRouge">Brique Rouge</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodeProduit} onValueChange={setPeriodeProduit}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avril2025">Avril 2025</SelectItem>
                    <SelectItem value="mars2025">Mars 2025</SelectItem>
                    <SelectItem value="fevrier2025">Février 2025</SelectItem>
                    <SelectItem value="t12025">T1 2025</SelectItem>
                    <SelectItem value="annee2025">Année 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div id="rapport-produit" className="rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Budget prévisionnel</div>
                    <div className="text-2xl font-bold">{budgetProduit.toLocaleString()} DA</div>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Dépenses réelles</div>
                    <div className="text-2xl font-bold">{depensesProduit.toLocaleString()} DA</div>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Écart</div>
                    <div
                      className={`text-2xl font-bold ${ecartProduit < 0 ? "text-green-600" : ecartProduit > 0 ? "text-red-600" : ""}`}
                    >
                      {ecartProduit > 0 ? "+" : ""}
                      {ecartProduit.toLocaleString()} DA ({ecartProduit < 0 ? "" : "+"}
                      {ecartPourcentageProduit}%)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Détail des dépenses par catégorie</h3>
                    <div className="chart-container">
                      <RepartitionChart />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() =>
                  exportToPDF("#rapport-produit", `rapport-${getProduitNom(produitSelectionne)}-${periodeProduit}`)
                }
                disabled={isExportingPDF}
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter en PDF
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  exportToExcel(
                    getReportData("produit"),
                    `rapport-${getProduitNom(produitSelectionne)}-${periodeProduit}`,
                  )
                }
                disabled={isExportingExcel}
              >
                {isExportingExcel ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter en Excel
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => printReport("#rapport-produit")} disabled={isPrinting}>
                {isPrinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Préparation...
                  </>
                ) : (
                  <>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="utilisateur" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapport par utilisateur</CardTitle>
              <CardDescription>Générez un rapport des dépenses saisies par utilisateur</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={utilisateurSelectionne} onValueChange={setUtilisateurSelectionne}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kbenali">Karim Benali</SelectItem>
                    <SelectItem value="ahadj">Amina Hadj</SelectItem>
                    <SelectItem value="mcherif">Mohamed Cherif</SelectItem>
                    <SelectItem value="sboudiaf">Samira Boudiaf</SelectItem>
                    <SelectItem value="ykaci">Yacine Kaci</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodeUtilisateur} onValueChange={setPeriodeUtilisateur}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avril2025">Avril 2025</SelectItem>
                    <SelectItem value="mars2025">Mars 2025</SelectItem>
                    <SelectItem value="fevrier2025">Février 2025</SelectItem>
                    <SelectItem value="t12025">T1 2025</SelectItem>
                    <SelectItem value="annee2025">Année 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div id="rapport-utilisateur" className="rounded-md border p-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Dépenses saisies par {getUtilisateurNom(utilisateurSelectionne)} pour{" "}
                      {getPeriodeNom(periodeUtilisateur)}
                    </div>
                    <div className="text-2xl font-bold">{depensesUtilisateur.toLocaleString()} DA</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Répartition des dépenses par produit</h3>
                    <div className="chart-container">
                      <ComparaisonChart />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() =>
                  exportToPDF(
                    "#rapport-utilisateur",
                    `rapport-${getUtilisateurNom(utilisateurSelectionne)}-${periodeUtilisateur}`,
                  )
                }
                disabled={isExportingPDF}
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter en PDF
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  exportToExcel(
                    getReportData("utilisateur"),
                    `rapport-${getUtilisateurNom(utilisateurSelectionne)}-${periodeUtilisateur}`,
                  )
                }
                disabled={isExportingExcel}
              >
                {isExportingExcel ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportation...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter en Excel
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => printReport("#rapport-utilisateur")} disabled={isPrinting}>
                {isPrinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Préparation...
                  </>
                ) : (
                  <>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
