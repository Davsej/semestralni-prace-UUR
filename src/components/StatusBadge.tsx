import { Device, DeviceStatus, Sensor, MeasurementType } from "@/types/device";



import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'


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
                "bg-slate-50 text-slate-800 dark:text-slate-100 dark:bg-slate-800",
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