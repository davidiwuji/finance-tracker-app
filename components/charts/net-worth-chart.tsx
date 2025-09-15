"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", netWorth: 30000, assets: 45000, liabilities: 15000 },
  { month: "Feb", netWorth: 33000, assets: 47500, liabilities: 14500 },
  { month: "Mar", netWorth: 35200, assets: 49200, liabilities: 14000 },
  { month: "Apr", netWorth: 38300, assets: 51800, liabilities: 13500 },
  { month: "May", netWorth: 40400, assets: 53400, liabilities: 13000 },
  { month: "Jun", netWorth: 43100, assets: 55600, liabilities: 12500 },
]

export function NetWorthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Net Worth</span>
                      <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
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
          dataKey="netWorth"
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
