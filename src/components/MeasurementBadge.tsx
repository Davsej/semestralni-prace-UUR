
import { Wind, BatteryIcon, ThermometerIcon, DropletIcon, Info } from 'lucide-react';

import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'


export const MeasurementBadge = ({ unit, value, selected, onClick, index }: { unit: string, value: string, selected: boolean | undefined, onClick: (index: number | undefined) => void | undefined, index: number | undefined }) => {


    const badge = (
        <Badge
            onClick={() => (onClick(index))}
            variant="outline"
            className={cn(
                "inline-flex items-center cursor-pointer transition hover:bg-slate-100 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border lg:text-sm text-xs px-3 py-1",
                selected ? "bg-slate-700 hover:bg-slate-600 dark:text-slate-800 text-white dark:bg-slate-200" : "bg-slate-50 dark:bg-slate-800",
            )}
        >

            <span>{value}<span className={
                cn(
                    "ml-[3px] text-slate-500 dark:text-slate-400 text-xs",
                    selected ? "text-slate-200 dark:text-slate-700" : "text-slate-500 dark:text-slate-400")
            }>{unit}</span></span>
        </Badge >
    )



    return badge
}