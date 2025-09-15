import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { NetWorthChart } from "@/components/charts/net-worth-chart"

const mockNetWorthHistory = [
  { month: "Jan 2024", assets: 45000, liabilities: 15000, netWorth: 30000 },
  { month: "Feb 2024", assets: 47500, liabilities: 14500, netWorth: 33000 },
  { month: "Mar 2024", assets: 49200, liabilities: 14000, netWorth: 35200 },
  { month: "Apr 2024", assets: 51800, liabilities: 13500, netWorth: 38300 },
  { month: "May 2024", assets: 53400, liabilities: 13000, netWorth: 40400 },
  { month: "Jun 2024", assets: 55600, liabilities: 12500, netWorth: 43100 },
]

export default function NetWorthPage() {
  const currentNetWorth = mockNetWorthHistory[mockNetWorthHistory.length - 1]
  const previousNetWorth = mockNetWorthHistory[mockNetWorthHistory.length - 2]
  const monthlyChange = currentNetWorth.netWorth - previousNetWorth.netWorth
  const monthlyChangePercent = (monthlyChange / previousNetWorth.netWorth) * 100

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Net Worth Timeline</h1>
          <p className="text-muted-foreground">Track your net worth growth over time</p>
        </div>

        {/* Current Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Net Worth</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${currentNetWorth.netWorth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">As of {currentNetWorth.month}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
              {monthlyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${monthlyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {monthlyChange >= 0 ? "+" : ""}${monthlyChange.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthlyChangePercent >= 0 ? "+" : ""}
                {monthlyChangePercent.toFixed(2)}% change
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assets vs Liabilities</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentNetWorth.assets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Assets - ${currentNetWorth.liabilities.toLocaleString()} Liabilities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Net Worth Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Net Worth Growth Chart</CardTitle>
            <CardDescription>Visual representation of your financial progress</CardDescription>
          </CardHeader>
          <CardContent>
            <NetWorthChart />
          </CardContent>
        </Card>

        {/* Net Worth History */}
        <Card>
          <CardHeader>
            <CardTitle>Net Worth History</CardTitle>
            <CardDescription>Monthly progression of your financial position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNetWorthHistory.reverse().map((entry, index) => {
                const isLatest = index === 0
                const previousEntry = mockNetWorthHistory[index + 1]
                const change = previousEntry ? entry.netWorth - previousEntry.netWorth : 0
                const changePercent = previousEntry ? (change / previousEntry.netWorth) * 100 : 0

                return (
                  <div key={entry.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{entry.month}</h3>
                        <div className="flex items-center gap-2">
                          {isLatest && <Badge variant="default">Current</Badge>}
                          <span className="text-sm text-muted-foreground">
                            Assets: ${entry.assets.toLocaleString()} | Liabilities: $
                            {entry.liabilities.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${entry.netWorth.toLocaleString()}</div>
                      {previousEntry && (
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            change >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {change >= 0 ? "+" : ""}${change.toLocaleString()} ({changePercent >= 0 ? "+" : ""}
                          {changePercent.toFixed(1)}%)
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
