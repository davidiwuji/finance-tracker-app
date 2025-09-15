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
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Utensils,
  Car,
  Zap,
  Gamepad2,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react"

interface Expense {
  id: string
  name: string
  category: "food" | "transport" | "bills" | "entertainment" | "misc"
  amount: number
  date: Date
  notes?: string
}

interface Budget {
  category: "food" | "transport" | "bills" | "entertainment" | "misc"
  limit: number
  spent: number
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    name: "Grocery Shopping",
    category: "food",
    amount: 85.5,
    date: new Date("2024-01-15"),
    notes: "Weekly groceries",
  },
  {
    id: "2",
    name: "Gas Station",
    category: "transport",
    amount: 45.0,
    date: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Netflix Subscription",
    category: "entertainment",
    amount: 15.99,
    date: new Date("2024-01-13"),
    notes: "Monthly subscription",
  },
  {
    id: "4",
    name: "Electricity Bill",
    category: "bills",
    amount: 120.0,
    date: new Date("2024-01-12"),
  },
  {
    id: "5",
    name: "Coffee Shop",
    category: "food",
    amount: 12.5,
    date: new Date("2024-01-11"),
  },
]

const categoryIcons = {
  food: Utensils,
  transport: Car,
  bills: Zap,
  entertainment: Gamepad2,
  misc: ShoppingBag,
}

const categoryLabels = {
  food: "Food",
  transport: "Transport",
  bills: "Bills",
  entertainment: "Entertainment",
  misc: "Miscellaneous",
}

const categoryColors = {
  food: "bg-green-100 text-green-800",
  transport: "bg-blue-100 text-blue-800",
  bills: "bg-yellow-100 text-yellow-800",
  entertainment: "bg-purple-100 text-purple-800",
  misc: "bg-gray-100 text-gray-800",
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [budgets, setBudgets] = useState<Budget[]>([
    { category: "food", limit: 400, spent: 98 },
    { category: "transport", limit: 200, spent: 45 },
    { category: "bills", limit: 500, spent: 120 },
    { category: "entertainment", limit: 150, spent: 15.99 },
    { category: "misc", limit: 200, spent: 0 },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    name: "",
    category: "food" as Expense["category"],
    amount: "",
    notes: "",
  })

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  const biggestExpense = expenses.reduce((biggest, expense) => (expense.amount > biggest.amount ? expense : biggest))

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        name: newExpense.name,
        category: newExpense.category,
        amount: Number.parseFloat(newExpense.amount),
        date: new Date(),
        notes: newExpense.notes || undefined,
      }
      setExpenses([expense, ...expenses])

      // Update budget spent amount
      setBudgets(
        budgets.map((budget) =>
          budget.category === newExpense.category ? { ...budget, spent: budget.spent + expense.amount } : budget,
        ),
      )

      setNewExpense({ name: "", category: "food", amount: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  const getSpendingByCategory = () => {
    const spending: Record<string, number> = {}
    expenses.forEach((expense) => {
      spending[expense.category] = (spending[expense.category] || 0) + expense.amount
    })
    return spending
  }

  const spendingByCategory = getSpendingByCategory()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">Track your spending and manage your budget</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new expense to track your spending.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Expense Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Grocery Shopping, Gas"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value: Expense["category"]) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="misc">Miscellaneous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about this expense..."
                    value={newExpense.notes}
                    onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddExpense} className="w-full">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${(totalBudget - totalSpent).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Of ${totalBudget} budget</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biggest Expense</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{biggestExpense.name}</div>
              <p className="text-xs text-muted-foreground">${biggestExpense.amount.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Category Spending */}
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Your expenses broken down by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(spendingByCategory).map(([category, amount]) => {
                    const Icon = categoryIcons[category as keyof typeof categoryIcons]
                    const percentage = (amount / totalSpent) * 100
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{categoryLabels[category as keyof typeof categoryLabels]}</p>
                            <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${amount.toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Track your spending against your budget limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map((budget) => {
                    const Icon = categoryIcons[budget.category]
                    const percentage = (budget.spent / budget.limit) * 100
                    const isOverBudget = budget.spent > budget.limit
                    return (
                      <div key={budget.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="font-medium">{categoryLabels[budget.category]}</span>
                          </div>
                          <div className="text-right">
                            <span className={`font-medium ${isOverBudget ? "text-red-600" : ""}`}>
                              ${budget.spent.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground"> / ${budget.limit}</span>
                          </div>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={`h-2 ${isOverBudget ? "[&>div]:bg-red-500" : ""}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span>${(budget.limit - budget.spent).toFixed(2)} remaining</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>All your recorded expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => {
                    const Icon = categoryIcons[expense.category]
                    return (
                      <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{expense.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={categoryColors[expense.category]}>
                                {categoryLabels[expense.category]}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{expense.date.toLocaleDateString()}</span>
                              {expense.notes && (
                                <span className="text-sm text-muted-foreground">• {expense.notes}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">${expense.amount.toFixed(2)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
