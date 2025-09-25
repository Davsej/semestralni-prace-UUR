"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import type { Measurement } from "@/types/device";
import { ChartContainer } from "@/components/ui/chart";

interface SeriesItem {
    name: string;
    unit?: string;
    data: Measurement[];
}

import React from "react";

interface DeviceDetailGraphProps {
    series: SeriesItem[];
}

const formatDate = (timestamp: string | number) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: any[];
    label?: string | number;
}) => {
    if (active && payload && payload.length) {
        const formattedDate = formatDate(label);
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm text-sm">
                <p className="text-xs text-muted-foreground mb-1">{formattedDate}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.name}: {entry.value} {entry.unit || ""}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function DeviceDetailGraph({ series }: DeviceDetailGraphProps) {
    const mergedData: Record<string, any> = {};

    series.forEach(({ name, data }) => {
        data.forEach(measure => {
            if (!mergedData[measure.timestamp]) {
                mergedData[measure.timestamp] = { timestamp: measure.timestamp };
            }
            mergedData[measure.timestamp][name] = measure.value;
        });
    });

    const chartData = Object.values(mergedData).sort((a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return (
        <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatDate}
                        tickLine
                        axisLine
                        tickMargin={8}
                    />
                    <YAxis tickLine axisLine tickMargin={8} width={40} />
                    <RechartsTooltip content={<CustomTooltip />} />

                    {series.map((s, i) => {
                        const key = `series_${i}`
                        return <Line
                            key={key}
                            type="linear"
                            dataKey={s.name}
                            name={s.name}
                            stroke={`hsl(${i * 60}, 70%, 50%)`} // Generate a color based on index
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                            connectNulls
                        />
                    })}
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
