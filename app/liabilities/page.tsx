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
import { Plus, CreditCard, AlertTriangle, Calendar, DollarSign, Home, GraduationCap } from "lucide-react"
import { LiabilityBreakdownChart } from "@/components/charts/liability-breakdown-chart"

interface Liability {
  id: string
  name: string
  type: "loan" | "credit-card" | "mortgage" | "bills" | "other"
  amount: number
  interestRate?: number
  dueDate?: Date
  monthlyPayment?: number
  notes?: string
  lastUpdated: Date
}

const mockLiabilities: Liability[] = [
  {
    id: "1",
    name: "Credit Card",
    type: "credit-card",
    amount: 2500,
    interestRate: 18.9,
    monthlyPayment: 150,
    notes: "Main credit card",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Car Loan",
    type: "loan",
    amount: 18000,
    interestRate: 4.5,
    monthlyPayment: 380,
    dueDate: new Date("2027-06-15"),
    notes: "Honda Civic 2022",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Student Loan",
    type: "loan",
    amount: 35000,
    interestRate: 6.2,
    monthlyPayment: 295,
    notes: "Federal student loan",
    lastUpdated: new Date(),
  },
]

const liabilityTypeIcons = {
  loan: GraduationCap,
  "credit-card": CreditCard,
  mortgage: Home,
  bills: Calendar,
  other: AlertTriangle,
}

const liabilityTypeLabels = {
  loan: "Loan",
  "credit-card": "Credit Card",
  mortgage: "Mortgage",
  bills: "Bills",
  other: "Other",
}

export default function LiabilitiesPage() {
  const [liabilities, setLiabilities] = useState<Liability[]>(mockLiabilities)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newLiability, setNewLiability] = useState({
    name: "",
    type: "credit-card" as Liability["type"],
    amount: "",
    interestRate: "",
    monthlyPayment: "",
    notes: "",
  })

  const totalDebt = liabilities.reduce((sum, liability) => sum + liability.amount, 0)
  const monthlyPayments = liabilities.reduce((sum, liability) => sum + (liability.monthlyPayment || 0), 0)
  const highestDebt = liabilities.reduce((highest, liability) =>
    liability.amount > highest.amount ? liability : highest,
  )

  const handleAddLiability = () => {
    if (newLiability.name && newLiability.amount) {
      const liability: Liability = {
        id: Date.now().toString(),
        name: newLiability.name,
        type: newLiability.type,
        amount: Number.parseFloat(newLiability.amount),
        interestRate: newLiability.interestRate ? Number.parseFloat(newLiability.interestRate) : undefined,
        monthlyPayment: newLiability.monthlyPayment ? Number.parseFloat(newLiability.monthlyPayment) : undefined,
        notes: newLiability.notes || undefined,
        lastUpdated: new Date(),
      }
      setLiabilities([...liabilities, liability])
      setNewLiability({ name: "", type: "credit-card", amount: "", interestRate: "", monthlyPayment: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Liabilities</h1>
            <p className="text-muted-foreground">Track and manage your debts and financial obligations</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Liability
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Liability</DialogTitle>
                <DialogDescription>Add a new debt or financial obligation to track.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Liability Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Credit Card, Car Loan"
                    value={newLiability.name}
                    onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Liability Type</Label>
                  <Select
                    value={newLiability.type}
                    onValueChange={(value: Liability["type"]) => setNewLiability({ ...newLiability, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="loan">Loan</SelectItem>
                      <SelectItem value="mortgage">Mortgage</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Owed ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newLiability.amount}
                    onChange={(e) => setNewLiability({ ...newLiability, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    placeholder="0.0"
                    value={newLiability.interestRate}
                    onChange={(e) => setNewLiability({ ...newLiability, interestRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    placeholder="0.00"
                    value={newLiability.monthlyPayment}
                    onChange={(e) => setNewLiability({ ...newLiability, monthlyPayment: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about this liability..."
                    value={newLiability.notes}
                    onChange={(e) => setNewLiability({ ...newLiability, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddLiability} className="w-full">
                  Add Liability
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalDebt.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {liabilities.length} liabilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total monthly obligations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Debt</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highestDebt.name}</div>
              <p className="text-xs text-red-600">${highestDebt.amount.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Liability Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Liability Breakdown</CardTitle>
            <CardDescription>Visual breakdown of your debt distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <LiabilityBreakdownChart />
          </CardContent>
        </Card>

        {/* Liabilities List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Liabilities</CardTitle>
            <CardDescription>Overview of all your debts and financial obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liabilities.map((liability) => {
                const Icon = liabilityTypeIcons[liability.type]
                return (
                  <div key={liability.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{liability.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">{liabilityTypeLabels[liability.type]}</Badge>
                          {liability.interestRate && (
                            <span className="text-sm text-muted-foreground">{liability.interestRate}% APR</span>
                          )}
                          {liability.notes && (
                            <span className="text-sm text-muted-foreground">• {liability.notes}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-red-600">${liability.amount.toLocaleString()}</div>
                      {liability.monthlyPayment && (
                        <div className="text-sm text-muted-foreground">${liability.monthlyPayment}/month</div>
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
