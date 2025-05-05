"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

import type { Measurement } from "@/types/device"

interface DeviceDetailGraphProps {
    data: Measurement[]
    unit: string
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        const formattedDate = formatDate(label)
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex gap-2 py-1 items-center">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-medium">
                            {entry.value} {unit}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

const formatDate = (timestamp: string | number) => {
    const date = new Date(timestamp)

    const day = date.getDate().toString()
    const month = (date.getMonth() + 1).toString()
    const year = date.getFullYear().toString().slice(-2)

    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

export function DeviceDetailGraph({ data, unit }: DeviceDetailGraphProps) {
    const chartConfig = {
        value: {
            label: unit,
            unit: unit,
        },
    }

    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid vertical={true} />
                <XAxis
                    dataKey="timestamp"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => formatDate(value)}
                    color="var(--custom-graph-axis)"
                />
                <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    width={40}
                    color="var(--custom-graph-axis)"
                />
                <ChartTooltip cursor={false} content={<CustomTooltip unit={unit} />} />

                <Line
                    dataKey="value"
                    stroke="var(--custom-graph-line)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--custom-graph-line)", strokeWidth: 1 }}
                    connectNulls={false}
                    type="linear"
                    activeDot={{ r: 6, fill: "var(--custom-graph-dot-active)", stroke: "white", strokeWidth: 2 }}
                />
            </LineChart>
        </ChartContainer>
    )
}
