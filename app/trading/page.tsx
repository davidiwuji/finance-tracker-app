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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Target,
  BookOpen,
  CheckCircle,
  BarChart3,
} from "lucide-react"
import { TradingPerformanceChart } from "@/components/charts/trading-performance-chart"

interface Trade {
  id: string
  symbol: string
  type: "buy" | "sell"
  strategy: string
  entryPrice: number
  exitPrice?: number
  quantity: number
  date: Date
  exitDate?: Date
  pnl?: number
  notes?: string
  status: "open" | "closed"
}

interface Strategy {
  id: string
  name: string
  description: string
  rules: string[]
}

const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    type: "buy",
    strategy: "Momentum Trading",
    entryPrice: 185.5,
    exitPrice: 192.3,
    quantity: 10,
    date: new Date("2024-01-15"),
    exitDate: new Date("2024-01-18"),
    pnl: 68,
    status: "closed",
    notes: "Strong earnings momentum",
  },
  {
    id: "2",
    symbol: "TSLA",
    type: "buy",
    strategy: "Breakout Trading",
    entryPrice: 248.2,
    quantity: 5,
    date: new Date("2024-01-14"),
    status: "open",
    notes: "Breaking resistance level",
  },
  {
    id: "3",
    symbol: "MSFT",
    type: "sell",
    strategy: "Mean Reversion",
    entryPrice: 420.1,
    exitPrice: 415.8,
    quantity: 8,
    date: new Date("2024-01-12"),
    exitDate: new Date("2024-01-13"),
    pnl: -34.4,
    status: "closed",
    notes: "Overbought conditions",
  },
]

const mockStrategies: Strategy[] = [
  {
    id: "1",
    name: "Momentum Trading",
    description: "Trading stocks with strong price momentum and volume",
    rules: [
      "Stock must be above 20-day moving average",
      "Volume must be 1.5x average daily volume",
      "RSI between 50-70",
      "Stop loss at 2% below entry",
      "Take profit at 5% above entry",
    ],
  },
  {
    id: "2",
    name: "Breakout Trading",
    description: "Trading breakouts from key resistance levels",
    rules: [
      "Price breaks above resistance with volume",
      "Wait for pullback to retest breakout level",
      "Enter on bounce from support",
      "Stop loss below support level",
      "Target 2:1 risk-reward ratio",
    ],
  },
  {
    id: "3",
    name: "Mean Reversion",
    description: "Trading oversold/overbought conditions",
    rules: [
      "RSI below 30 (oversold) or above 70 (overbought)",
      "Price at key support/resistance level",
      "Look for reversal candlestick patterns",
      "Tight stop loss (1-2%)",
      "Quick profit taking (3-5%)",
    ],
  },
]

export default function TradingJournalPage() {
  const [trades, setTrades] = useState<Trade[]>(mockTrades)
  const [strategies] = useState<Strategy[]>(mockStrategies)
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false)
  const [newTrade, setNewTrade] = useState({
    symbol: "",
    type: "buy" as Trade["type"],
    strategy: "",
    entryPrice: "",
    quantity: "",
    notes: "",
  })

  const totalPnL = trades.filter((t) => t.pnl !== undefined).reduce((sum, trade) => sum + (trade.pnl || 0), 0)
  const winningTrades = trades.filter((t) => t.pnl && t.pnl > 0).length
  const totalClosedTrades = trades.filter((t) => t.status === "closed").length
  const winRate = totalClosedTrades > 0 ? (winningTrades / totalClosedTrades) * 100 : 0
  const bestTrade = trades.reduce((best, trade) => ((trade.pnl || 0) > (best.pnl || 0) ? trade : best), trades[0])

  const handleAddTrade = () => {
    if (newTrade.symbol && newTrade.entryPrice && newTrade.quantity && newTrade.strategy) {
      const trade: Trade = {
        id: Date.now().toString(),
        symbol: newTrade.symbol.toUpperCase(),
        type: newTrade.type,
        strategy: newTrade.strategy,
        entryPrice: Number.parseFloat(newTrade.entryPrice),
        quantity: Number.parseInt(newTrade.quantity),
        date: new Date(),
        status: "open",
        notes: newTrade.notes || undefined,
      }
      setTrades([trade, ...trades])
      setNewTrade({ symbol: "", type: "buy", strategy: "", entryPrice: "", quantity: "", notes: "" })
      setIsAddTradeOpen(false)
    }
  }

  const closeTrade = (tradeId: string, exitPrice: number) => {
    setTrades(
      trades.map((trade) => {
        if (trade.id === tradeId) {
          const pnl =
            trade.type === "buy"
              ? (exitPrice - trade.entryPrice) * trade.quantity
              : (trade.entryPrice - exitPrice) * trade.quantity
          return {
            ...trade,
            exitPrice,
            exitDate: new Date(),
            pnl,
            status: "closed" as const,
          }
        }
        return trade
      }),
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trading Journal</h1>
            <p className="text-muted-foreground">Track your trades, strategies, and performance</p>
          </div>
          <Dialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Trade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trade</DialogTitle>
                <DialogDescription>Record a new trade entry in your journal.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., AAPL, TSLA"
                    value={newTrade.symbol}
                    onChange={(e) => setNewTrade({ ...newTrade, symbol: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Trade Type</Label>
                  <Select
                    value={newTrade.type}
                    onValueChange={(value: Trade["type"]) => setNewTrade({ ...newTrade, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy (Long)</SelectItem>
                      <SelectItem value="sell">Sell (Short)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select
                    value={newTrade.strategy}
                    onValueChange={(value) => setNewTrade({ ...newTrade, strategy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategies.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.name}>
                          {strategy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entryPrice">Entry Price ($)</Label>
                    <Input
                      id="entryPrice"
                      type="number"
                      placeholder="0.00"
                      value={newTrade.entryPrice}
                      onChange={(e) => setNewTrade({ ...newTrade, entryPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={newTrade.quantity}
                      onChange={(e) => setNewTrade({ ...newTrade, quantity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Trade rationale, setup, etc..."
                    value={newTrade.notes}
                    onChange={(e) => setNewTrade({ ...newTrade, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddTrade} className="w-full">
                  Add Trade
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Performance Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {winningTrades}/{totalClosedTrades} trades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trades.length}</div>
              <p className="text-xs text-muted-foreground">{trades.filter((t) => t.status === "open").length} open</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Trade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${bestTrade?.pnl?.toFixed(2) || "0.00"}</div>
              <p className="text-xs text-muted-foreground">{bestTrade?.symbol || "N/A"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Trading Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Performance</CardTitle>
            <CardDescription>Your cumulative P&L over time</CardDescription>
          </CardHeader>
          <CardContent>
            <TradingPerformanceChart />
          </CardContent>
        </Card>

        <Tabs defaultValue="trades" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="trades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>All your recorded trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            trade.type === "buy" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {trade.type === "buy" ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{trade.symbol}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={trade.status === "open" ? "default" : "secondary"}>{trade.status}</Badge>
                            <span className="text-sm text-muted-foreground">{trade.strategy}</span>
                            <span className="text-sm text-muted-foreground">
                              {trade.quantity} shares @ ${trade.entryPrice}
                            </span>
                          </div>
                          {trade.notes && <p className="text-sm text-muted-foreground mt-1">{trade.notes}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        {trade.status === "closed" && trade.pnl !== undefined ? (
                          <div
                            className={`text-lg font-semibold ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              const exitPrice = prompt("Enter exit price:")
                              if (exitPrice) {
                                closeTrade(trade.id, Number.parseFloat(exitPrice))
                              }
                            }}
                          >
                            Close Trade
                          </Button>
                        )}
                        <div className="text-xs text-muted-foreground">{trade.date.toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {strategies.map((strategy) => (
                <Card key={strategy.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {strategy.name}
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Rules:</h4>
                      <ul className="space-y-1">
                        {strategy.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Calendar</CardTitle>
                <CardDescription>View your trades by date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {trades
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((trade) => (
                      <div key={trade.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{trade.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {trade.type === "buy" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className="font-medium">{trade.symbol}</span>
                        </div>
                        <Badge variant={trade.status === "open" ? "default" : "secondary"}>{trade.status}</Badge>
                        {trade.pnl !== undefined && (
                          <span className={`text-sm font-medium ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
