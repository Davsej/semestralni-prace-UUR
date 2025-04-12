
import { Device, DeviceStatus, Sensor, MeasurementType } from "@/types/device";


import { Wifi, WifiOff, AlertTriangle, Clock, MessageSquare, Hash, Wind, BatteryIcon, ThermometerIcon, DropletIcon, Info } from 'lucide-react';

import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const DeviceCard = ({ device }: { device: Device }) => {
    return <>
        <Card className="gap-2 pt-0 overflow-clip">
            <CardHeader className="flex bg-slate-50 dark:bg-slate-900 pt-6 border-b pb-6 lg:flex-row flex-col lg:justify-between lg:items-center">
                <div className="text-xl mb-1 lg:mt-0 lg:w-max w-full md:w-auto font-medium">{device.name}</div>
                <div className="flex gap-2 w-max flex-wrap lg:flex-nowrap">
                    <TimeBadge timestamp={device.lastUpdated} />
                    <StatusBadge status={device.status}></StatusBadge>
                </div>
            </CardHeader>
            <CardContent>
                {
                    device.sensors.map((sensor) => (
                        <SensorRow key={sensor.id} sensor={sensor} />
                    ))
                }
            </CardContent>
        </Card>
    </>
}

export const SensorRow = ({ sensor }: { sensor: Sensor }) => {
    return (
        <div className="p-2 py-3 last:border-0 last:pb-0 border-b border-gray-200 dark:border-gray-700 flex flex-row justify-between">
            <div className="flex gap-1.5 flex-row w-full lg:w-auto items-center">
                <span className="lg:text-[16px] text-[14px] ">{sensor.name}</span>
                {
                    sensor.description &&
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="mt-1 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                <Info size={10} />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>{sensor.description}</p>
                        </TooltipContent>
                    </Tooltip>
                }

            </div>
            <div className="flex flex-row gap-2 flex-wrap justify-end lg:flex-nowrap">
                {sensor.channels.map((channel) => (
                    <div key={channel.measurementType} className="flex justify-between items-center">
                        <MeasurementBadge type={channel.measurementType} value={channel.measures.length > 0 ? `${channel.measures[0].value}` : "N/A"} unit={channel.unit} />
                    </div>
                ))}
            </div>
        </div>
    )
}


export const MeasurementBadge = ({ type, unit, value }: { type: MeasurementType, unit: string, value: string }) => {

    const measurementConfig = {
        humidity: {
            icon: DropletIcon,
        },
        temperature: {
            icon: ThermometerIcon,
        },
        battery: {
            icon: BatteryIcon,
        },
        CO2: {
            icon: Wind,
        },
        number: {
            icon: null,
        },
        text: {
            icon: null,
        }
    }

    const config = measurementConfig[type];
    const Icon = config.icon;

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                "inline-flex items-center bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border lg:text-sm text-xs font-semibold transition-colors px-3 py-1",
            )}
        >
            {Icon && <Icon />}
            <span>{value}<span className="ml-[3px] text-slate-500 dark:text-slate-400 text-xs">{unit}</span></span>
        </Badge>
    )



    return badge
}

interface TimeBadgeProps {
    timestamp: string | Date
    className?: string
    showIcon?: boolean
}

export const TimeBadge = ({ timestamp, className, showIcon = true }: TimeBadgeProps) => {

    const formatTimestamp = (timestamp: string | Date): string => {
        const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp

        return new Intl.DateTimeFormat("cs-CZ", {
            day: "2-digit",
            month: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const formattedTime = formatTimestamp(timestamp)

    return (
        <Badge
            variant="outline"
            className={cn(
                "inline-flex bg-white dark:bg-slate-700 items-center rounded-full border text-xs font-semibold transition-colors px-3 py-1",
                className,
            )}
        >
            {showIcon && <Clock className="h-3 w-3" />}
            <span>{formattedTime}</span>
        </Badge>
    )
}


export const StatusBadge = ({ status }: { status: DeviceStatus }) => {
    // Define status configurations
    const statusConfig = {
        online: {
            label: "Online",
            icon: Wifi,
            customClass: "bg-green-100 dark:bg-green-700 dark:text-green-200 text-green-800",
        },
        offline: {
            label: "Offline",
            icon: WifiOff,
            customClass:
                "bg-slate-100 text-slate-800 dark:text-slate-100 dark:bg-slate-800",
        },
        error: {
            label: "Error",
            icon: AlertTriangle,
            customClass: "bg-red-100 dark:text-red-200 dark:bg-red-800 text-red-800  ",
        },

    }
    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <Badge
            variant="outline"
            className={cn("inline-flex items-center rounded-full border text-xs font-semibold transition-colors px-3 py-1", config.customClass)}
        >
            <Icon className="h-3.5 w-3.5" />
            <span>{config.label}</span>
        </Badge>
    )
}
