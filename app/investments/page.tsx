"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, Coins, Building } from "lucide-react"

interface Investment {
  id: string
  name: string
  type: "stocks" | "crypto" | "bonds" | "real-estate"
  buyPrice: number
  currentPrice: number
  quantity: number
  roi: number
  notes?: string
  lastUpdated: Date
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    name: "Apple Inc. (AAPL)",
    type: "stocks",
    buyPrice: 150.0,
    currentPrice: 185.5,
    quantity: 50,
    roi: 23.67,
    notes: "Long-term tech investment",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Bitcoin (BTC)",
    type: "crypto",
    buyPrice: 35000,
    currentPrice: 42500,
    quantity: 0.5,
    roi: 21.43,
    notes: "Digital gold hedge",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "US Treasury Bonds",
    type: "bonds",
    buyPrice: 1000,
    currentPrice: 1025,
    quantity: 10,
    roi: 2.5,
    notes: "Safe haven investment",
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "REIT Portfolio",
    type: "real-estate",
    buyPrice: 25.0,
    currentPrice: 28.5,
    quantity: 200,
    roi: 14.0,
    notes: "Real estate exposure",
    lastUpdated: new Date(),
  },
]

const investmentTypeIcons = {
  stocks: TrendingUp,
  crypto: Coins,
  bonds: Building,
  "real-estate": Building,
}

const investmentTypeLabels = {
  stocks: "Stocks",
  crypto: "Cryptocurrency",
  bonds: "Bonds",
  "real-estate": "Real Estate",
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    type: "stocks" as Investment["type"],
    buyPrice: "",
    currentPrice: "",
    quantity: "",
    notes: "",
  })

  const totalValue = investments.reduce((sum, inv) => sum + inv.currentPrice * inv.quantity, 0)
  const totalCost = investments.reduce((sum, inv) => sum + inv.buyPrice * inv.quantity, 0)
  const totalGainLoss = totalValue - totalCost
  const totalROI = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  const bestPerforming = investments.reduce((best, inv) => (inv.roi > best.roi ? inv : best))

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.buyPrice && newInvestment.currentPrice && newInvestment.quantity) {
      const buyPrice = Number.parseFloat(newInvestment.buyPrice)
      const currentPrice = Number.parseFloat(newInvestment.currentPrice)
      const roi = ((currentPrice - buyPrice) / buyPrice) * 100

      const investment: Investment = {
        id: Date.now().toString(),
        name: newInvestment.name,
        type: newInvestment.type,
        buyPrice,
        currentPrice,
        quantity: Number.parseFloat(newInvestment.quantity),
        roi,
        notes: newInvestment.notes || undefined,
        lastUpdated: new Date(),
      }
      setInvestments([...investments, investment])
      setNewInvestment({ name: "", type: "stocks", buyPrice: "", currentPrice: "", quantity: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
            <p className="text-muted-foreground">Track your investment portfolio performance</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Investment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Investment</DialogTitle>
                <DialogDescription>Add a new investment to track its performance.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Investment Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Apple Inc. (AAPL), Bitcoin"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Investment Type</Label>
                  <Select
                    value={newInvestment.type}
                    onValueChange={(value: Investment["type"]) => setNewInvestment({ ...newInvestment, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="bonds">Bonds</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">Buy Price ($)</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      placeholder="0.00"
                      value={newInvestment.buyPrice}
                      onChange={(e) => setNewInvestment({ ...newInvestment, buyPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPrice">Current Price ($)</Label>
                    <Input
                      id="currentPrice"
                      type="number"
                      placeholder="0.00"
                      value={newInvestment.currentPrice}
                      onChange={(e) => setNewInvestment({ ...newInvestment, currentPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={newInvestment.quantity}
                    onChange={(e) => setNewInvestment({ ...newInvestment, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Investment thesis, strategy, etc..."
                    value={newInvestment.notes}
                    onChange={(e) => setNewInvestment({ ...newInvestment, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddInvestment} className="w-full">
                  Add Investment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current market value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalROI >= 0 ? "+" : ""}
                {totalROI.toFixed(2)}% return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bestPerforming.name.split(" ")[0]}</div>
              <p className="text-xs text-green-600">+{bestPerforming.roi.toFixed(2)}% ROI</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.length}</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>
        </div>

        {/* Investments List */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Holdings</CardTitle>
            <CardDescription>Your current investment positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => {
                const Icon = investmentTypeIcons[investment.type]
                const totalValue = investment.currentPrice * investment.quantity
                const totalCost = investment.buyPrice * investment.quantity
                const gainLoss = totalValue - totalCost

                return (
                  <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{investment.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{investmentTypeLabels[investment.type]}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {investment.quantity} @ ${investment.currentPrice}
                          </span>
                          {investment.notes && (
                            <span className="text-sm text-muted-foreground">• {investment.notes}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${totalValue.toLocaleString()}</div>
                      <div
                        className={`text-sm flex items-center gap-1 ${
                          investment.roi >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {investment.roi >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {investment.roi >= 0 ? "+" : ""}
                        {investment.roi.toFixed(2)}% (${gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)})
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
