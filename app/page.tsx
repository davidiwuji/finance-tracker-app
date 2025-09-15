import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, PieChart, Plus, Wallet, CreditCard, BookOpen } from "lucide-react"
import { NetWorthChart } from "@/components/charts/net-worth-chart"
import { AssetAllocationChart } from "@/components/charts/asset-allocation-chart"
import { ExpenseBreakdownChart } from "@/components/charts/expense-breakdown-chart"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetch real data from Supabase
  const { data: assets } = await supabase.from("assets").select("*")
  const { data: liabilities } = await supabase.from("liabilities").select("*")
  const { data: expenses } = await supabase.from("expenses").select("*").order("date", { ascending: false }).limit(10)
  const { data: trades } = await supabase
    .from("trades")
    .select("*, trading_strategies(name)")
    .order("entry_date", { ascending: false })
    .limit(5)

  // Calculate totals
  const totalAssets = assets?.reduce((sum, asset) => sum + Number(asset.value), 0) || 0
  const totalLiabilities = liabilities?.reduce((sum, liability) => sum + Number(liability.amount), 0) || 0
  const netWorth = totalAssets - totalLiabilities
  const monthlyExpenses = expenses?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0

  // Calculate trading stats
  const closedTrades = trades?.filter((trade) => trade.status === "closed") || []
  const totalPnL = closedTrades.reduce((sum, trade) => sum + (Number(trade.pnl) || 0), 0)
  const winningTrades = closedTrades.filter((trade) => Number(trade.pnl) > 0)
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0
  const bestTrade = closedTrades.reduce(
    (best, trade) => (Number(trade.pnl) > Number(best?.pnl || 0) ? trade : best),
    null,
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${netWorth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +20.1% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,400.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.5% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+12% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${(assets?.find((a) => a.type === "Stocks")?.value || 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15.3% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Net Worth Growth</CardTitle>
              <CardDescription>Your net worth progression over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <NetWorthChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution of your assets by category</CardDescription>
            </CardHeader>
            <CardContent>
              <AssetAllocationChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses vs Budget</CardTitle>
            <CardDescription>How your spending compares to your budget by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseBreakdownChart />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Quickly add new entries to your financial tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <Plus className="h-5 w-5" />
                Add Asset
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <CreditCard className="h-5 w-5" />
                Add Liability
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <Wallet className="h-5 w-5" />
                Log Expense
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <BookOpen className="h-5 w-5" />
                New Trade Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses?.slice(0, 3).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{expense.description}</p>
                        <p className="text-xs text-muted-foreground">{expense.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">-${Number(expense.amount).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Journal Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month P/L</span>
                  <span className={`text-sm font-medium ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="text-sm font-medium">{winRate.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <span className="text-sm font-medium">{closedTrades.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Trade</span>
                  <span className="text-sm font-medium text-green-600">+${Number(bestTrade?.pnl || 0).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
