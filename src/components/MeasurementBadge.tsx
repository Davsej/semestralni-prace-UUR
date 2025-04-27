import { MeasurementType } from "@/types/device";

import { Wind, BatteryIcon, ThermometerIcon, DropletIcon, Info } from 'lucide-react';

import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'


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
            icon: null,
        },
        number: {
            icon: null,
        },
        text: {
            icon: null,
        },
        rainfall: {
            icon: DropletIcon,
        },
        windSpeed: {
            icon: Wind,
        },
    }


    const config = measurementConfig[type];


    const Icon = config.icon;

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                "inline-flex items-center cursor-pointer transition hover:bg-slate-100 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border lg:text-sm text-xs font-semibold transition-colors px-3 py-1",
            )}
        >
            {Icon && <Icon />}
            <span>{value}<span className="ml-[3px] text-slate-500 dark:text-slate-400 text-xs">{unit}</span></span>
        </Badge>
    )



    return badge
}