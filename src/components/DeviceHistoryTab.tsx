"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

import { useState } from "react"

import { Device } from '@/types/device'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CombinedRecord = {
    timestamp: string
    [measurementLabel: string]: number | string
}

export function mapDeviceToCombinedRecords(device: Device): CombinedRecord[] {
    const recordsMap: Map<string, CombinedRecord> = new Map()

    for (const sensor of device.sensors) {
        for (const channel of sensor.channels) {
            const sensorName = sensor.name ?? "Senzor"
            const channelName = channel.name ?? "Veličina"
            const label = `${sensorName} – ${channelName} (${channel.unit})`

            for (const measure of channel.measures) {
                if (measure.value === "N/A") continue

                const existing = recordsMap.get(measure.timestamp) || { timestamp: measure.timestamp }
                existing[label] = measure.value
                recordsMap.set(measure.timestamp, existing)
            }
        }
    }

    const recordsArray = Array.from(recordsMap.values())

    return recordsArray.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
}


export function getColumnsFromDevice(device: Device): ColumnDef<CombinedRecord>[] {
    const base: ColumnDef<CombinedRecord>[] = [
        {
            header: "Čas",
            accessorKey: "timestamp",
            cell: ({ getValue }) => new Date(getValue() as string).toLocaleString("cs-CZ"),
        },
    ]

    const labels = new Set<string>()

    for (const sensor of device.sensors) {
        for (const channel of sensor.channels) {
            const sensorName = sensor.name ?? "Senzor"
            const channelName = channel.name ?? "Veličina"
            const label = `${sensorName} – ${channelName} (${channel.unit})`
            labels.add(label)
        }
    }

    for (const label of labels) {
        base.push({
            header: label,
            accessorKey: label,
        })
    }

    return base
}

export function DeviceHistoryTab({ device }: { device: Device }) {
    const data = mapDeviceToCombinedRecords(device)
    const columns = getColumnsFromDevice(device)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleExport = (fromDate: string, toDate: string) => {
        console.log("Export od:", fromDate)
        console.log("Export do:", toDate)
        // TODO: add CSV export logic here
    }

    const ExportDialog = () => {
        const [from, setFrom] = useState("")
        const [to, setTo] = useState("")

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Exportovat data</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export dat</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="from">Od</Label>
                            <Input
                                type="datetime-local"
                                id="from"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="to">Do</Label>
                            <Input
                                type="datetime-local"
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => handleExport(from, to)}>Exportovat</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <ExportDialog />
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
