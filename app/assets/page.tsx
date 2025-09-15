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
import { Plus, TrendingUp, TrendingDown, DollarSign, Building, Coins, Banknote, Home, Briefcase } from "lucide-react"
import { AssetAllocationChart } from "@/components/charts/asset-allocation-chart"

interface Asset {
  id: string
  name: string
  type: "cash" | "stocks" | "crypto" | "real-estate" | "business"
  value: number
  growthRate?: number
  notes?: string
  lastUpdated: Date
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Savings Account",
    type: "cash",
    value: 15000,
    growthRate: 2.5,
    notes: "Emergency fund",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Apple Stock (AAPL)",
    type: "stocks",
    value: 18500,
    growthRate: 12.3,
    notes: "Long-term investment",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Bitcoin",
    type: "crypto",
    value: 8750,
    growthRate: -5.2,
    notes: "Speculative investment",
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "Rental Property",
    type: "real-estate",
    value: 250000,
    growthRate: 8.1,
    notes: "Downtown apartment",
    lastUpdated: new Date(),
  },
]

const assetTypeIcons = {
  cash: Banknote,
  stocks: TrendingUp,
  crypto: Coins,
  "real-estate": Home,
  business: Briefcase,
}

const assetTypeLabels = {
  cash: "Cash",
  stocks: "Stocks",
  crypto: "Cryptocurrency",
  "real-estate": "Real Estate",
  business: "Business",
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "cash" as Asset["type"],
    value: "",
    growthRate: "",
    notes: "",
  })

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const bestPerforming = assets.reduce((best, asset) =>
    (asset.growthRate || 0) > (best.growthRate || 0) ? asset : best,
  )

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.value) {
      const asset: Asset = {
        id: Date.now().toString(),
        name: newAsset.name,
        type: newAsset.type,
        value: Number.parseFloat(newAsset.value),
        growthRate: newAsset.growthRate ? Number.parseFloat(newAsset.growthRate) : undefined,
        notes: newAsset.notes || undefined,
        lastUpdated: new Date(),
      }
      setAssets([...assets, asset])
      setNewAsset({ name: "", type: "cash", value: "", growthRate: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
            <p className="text-muted-foreground">Manage and track your assets and investments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>Add a new asset to track its value and performance.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Savings Account, Apple Stock"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type</Label>
                  <Select
                    value={newAsset.type}
                    onValueChange={(value: Asset["type"]) => setNewAsset({ ...newAsset, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Current Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="0.00"
                    value={newAsset.value}
                    onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="growthRate">Growth Rate (% per year)</Label>
                  <Input
                    id="growthRate"
                    type="number"
                    placeholder="0.0"
                    value={newAsset.growthRate}
                    onChange={(e) => setNewAsset({ ...newAsset, growthRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about this asset..."
                    value={newAsset.notes}
                    onChange={(e) => setNewAsset({ ...newAsset, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddAsset} className="w-full">
                  Add Asset
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {assets.length} assets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bestPerforming.name}</div>
              <p className="text-xs text-green-600">+{bestPerforming.growthRate}% growth</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Types</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(assets.map((a) => a.type)).size}</div>
              <p className="text-xs text-muted-foreground">Different asset categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Allocation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Visual breakdown of your asset distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetAllocationChart />
          </CardContent>
        </Card>

        {/* Assets List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
            <CardDescription>Overview of all your tracked assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset) => {
                const Icon = assetTypeIcons[asset.type]
                return (
                  <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{asset.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{assetTypeLabels[asset.type]}</Badge>
                          {asset.notes && <span className="text-sm text-muted-foreground">{asset.notes}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${asset.value.toLocaleString()}</div>
                      {asset.growthRate !== undefined && (
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            asset.growthRate >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {asset.growthRate >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {asset.growthRate >= 0 ? "+" : ""}
                          {asset.growthRate}%
                        </div>
                      )}
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
