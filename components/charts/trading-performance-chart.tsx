"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan 1", pnl: 0, cumulative: 0 },
  { date: "Jan 5", pnl: 150, cumulative: 150 },
  { date: "Jan 10", pnl: -75, cumulative: 75 },
  { date: "Jan 15", pnl: 220, cumulative: 295 },
  { date: "Jan 20", pnl: -45, cumulative: 250 },
  { date: "Jan 25", pnl: 180, cumulative: 430 },
  { date: "Jan 30", pnl: 95, cumulative: 525 },
]

export function TradingPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Cumulative P&L</span>
                      <span className="font-bold">${payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="cumulative"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "var(--color-primary)", opacity: 0.25 },
          }}
          style={{
            stroke: "var(--color-primary)",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
