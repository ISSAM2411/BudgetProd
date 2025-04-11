import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
  Clock,
  BarChart3,
  Percent,
} from "lucide-react"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Dernière mise à jour: 10/04/2025 06:00</span>
        </div>
      </div>

      <Tabs defaultValue="mois" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="mois">Mois</TabsTrigger>
            <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
            <TabsTrigger value="annee">Année</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mois" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget prévisionnel</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 500 000 DA</div>
                <p className="text-xs text-muted-foreground">Pour Avril 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dépenses réelles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9 875 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  <span>-21.0% par rapport au budget</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Écart global</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">-2 625 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>Favorable</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budgets en cours</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>2 alertes de dépassement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nouvelles métriques */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réalisation</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">79.0%</div>
                <div className="mt-2">
                  <Progress value={79.0} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tendance mensuelle</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  <TrendingDown className="inline mr-2 h-5 w-5" />
                  En baisse
                </div>
                <p className="text-xs text-muted-foreground">Dépenses en diminution vs Mars</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prévision fin de mois</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11 200 000 DA</div>
                <div className="flex items-center text-xs text-amber-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+13.4% vs actuel</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficacité budgétaire</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">A+</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>Excellente performance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Alertes de dépassement</AlertTitle>
              <AlertDescription>
                Ciment Portland : Dépassement de 18% du budget prévu pour les matières premières
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-500/50 bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Saisies en attente</AlertTitle>
              <AlertDescription>3 dépenses réelles à saisir pour le Rond à béton avant le 15/04/2025</AlertDescription>
            </Alert>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Statut des budgets par produit</CardTitle>
                <CardDescription>Progression et état des budgets pour le mois en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Ciment Portland</span>
                        <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                          Dépassement
                        </Badge>
                      </div>
                      <span className="text-sm">4 720 000 DA / 4 000 000 DA</span>
                    </div>
                    <Progress value={118} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
                    <p className="text-xs text-muted-foreground">118% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Rond à béton</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">2 850 000 DA / 3 500 000 DA</span>
                    </div>
                    <Progress value={81.4} className="h-2" />
                    <p className="text-xs text-muted-foreground">81.4% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Céramique Sol</span>
                        <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700 border-gray-200">
                          Équilibré
                        </Badge>
                      </div>
                      <span className="text-sm">2 500 000 DA / 2 500 000 DA</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-100" indicatorClassName="bg-gray-500" />
                    <p className="text-xs text-muted-foreground">100% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Peinture Vinylique</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">1 350 000 DA / 1 500 000 DA</span>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-xs text-muted-foreground">90% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Brique Rouge</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">920 000 DA / 1 000 000 DA</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground">92% du budget utilisé</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DashboardCharts />
        </TabsContent>

        <TabsContent value="trimestre" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget prévisionnel</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36 500 000 DA</div>
                <p className="text-xs text-muted-foreground">Pour T2 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dépenses réelles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">29 750 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  <span>-18.5% par rapport au budget</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Écart global</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">-6 750 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>Favorable</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budgets en cours</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>4 alertes de dépassement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nouvelles métriques */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réalisation</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">81.5%</div>
                <div className="mt-2">
                  <Progress value={81.5} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tendance trimestrielle</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  <TrendingDown className="inline mr-2 h-5 w-5" />
                  En baisse
                </div>
                <p className="text-xs text-muted-foreground">Dépenses en diminution vs T1</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prévision fin de trimestre</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33 200 000 DA</div>
                <div className="flex items-center text-xs text-amber-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+11.6% vs actuel</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficacité budgétaire</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">A</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>Très bonne performance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Alertes de dépassement</AlertTitle>
              <AlertDescription>
                Ciment Portland : Dépassement de 15% du budget trimestriel pour les matières premières
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-500/50 bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Saisies en attente</AlertTitle>
              <AlertDescription>7 dépenses réelles à saisir avant la fin du trimestre</AlertDescription>
            </Alert>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Statut des budgets par produit</CardTitle>
                <CardDescription>Progression et état des budgets pour le trimestre en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Ciment Portland</span>
                        <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                          Dépassement
                        </Badge>
                      </div>
                      <span className="text-sm">13 800 000 DA / 12 000 000 DA</span>
                    </div>
                    <Progress value={115} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
                    <p className="text-xs text-muted-foreground">115% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Rond à béton</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">8 250 000 DA / 10 500 000 DA</span>
                    </div>
                    <Progress value={78.6} className="h-2" />
                    <p className="text-xs text-muted-foreground">78.6% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Céramique Sol</span>
                        <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700 border-gray-200">
                          Équilibré
                        </Badge>
                      </div>
                      <span className="text-sm">7 500 000 DA / 7 500 000 DA</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-100" indicatorClassName="bg-gray-500" />
                    <p className="text-xs text-muted-foreground">100% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Peinture Vinylique</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">3 950 000 DA / 4 500 000 DA</span>
                    </div>
                    <Progress value={87.8} className="h-2" />
                    <p className="text-xs text-muted-foreground">87.8% du budget utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Brique Rouge</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">2 750 000 DA / 3 000 000 DA</span>
                    </div>
                    <Progress value={91.7} className="h-2" />
                    <p className="text-xs text-muted-foreground">91.7% du budget utilisé</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="annee" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget prévisionnel</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145 000 000 DA</div>
                <p className="text-xs text-muted-foreground">Pour 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dépenses réelles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48 750 000 DA</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>33.6% du budget annuel consommé</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Écart global</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">-9 500 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  <span>Favorable</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budgets en cours</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>8 alertes de dépassement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nouvelles métriques */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réalisation</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33.6%</div>
                <div className="mt-2">
                  <Progress value={33.6} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Progression normale (T1 + début T2)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tendance annuelle</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  <TrendingDown className="inline mr-2 h-5 w-5" />
                  Sous contrôle
                </div>
                <p className="text-xs text-muted-foreground">Dépenses inférieures aux prévisions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prévision annuelle</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">138 500 000 DA</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  <span>-4.5% vs budget initial</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficacité budgétaire</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">A-</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>Bonne performance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Alertes de dépassement</AlertTitle>
              <AlertDescription>
                Ciment Portland : Dépassement de 15% du budget annuel prévu pour les matières premières
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-500/50 bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Révision budgétaire</AlertTitle>
              <AlertDescription>Révision budgétaire semestrielle prévue pour le 30/06/2025</AlertDescription>
            </Alert>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Statut des budgets par produit</CardTitle>
                <CardDescription>Progression et état des budgets pour l'année en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Ciment Portland</span>
                        <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                          Dépassement
                        </Badge>
                      </div>
                      <span className="text-sm">22 500 000 DA / 48 000 000 DA</span>
                    </div>
                    <Progress value={46.9} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      46.9% du budget annuel utilisé (risque de dépassement)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Rond à béton</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">12 500 000 DA / 42 000 000 DA</span>
                    </div>
                    <Progress value={29.8} className="h-2" />
                    <p className="text-xs text-muted-foreground">29.8% du budget annuel utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Céramique Sol</span>
                        <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700 border-gray-200">
                          Normal
                        </Badge>
                      </div>
                      <span className="text-sm">9 750 000 DA / 30 000 000 DA</span>
                    </div>
                    <Progress value={32.5} className="h-2" />
                    <p className="text-xs text-muted-foreground">32.5% du budget annuel utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Peinture Vinylique</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">5 300 000 DA / 18 000 000 DA</span>
                    </div>
                    <Progress value={29.4} className="h-2" />
                    <p className="text-xs text-muted-foreground">29.4% du budget annuel utilisé</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">Brique Rouge</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          Économie
                        </Badge>
                      </div>
                      <span className="text-sm">3 670 000 DA / 12 000 000 DA</span>
                    </div>
                    <Progress value={30.6} className="h-2" />
                    <p className="text-xs text-muted-foreground">30.6% du budget annuel utilisé</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
