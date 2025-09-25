


import { Clock } from 'lucide-react';

import { cn } from "@/lib/utils"

import { Badge } from '@/components/ui/badge'


interface TimeBadgeProps {
    timestamp: string | Date
    className?: string
    showIcon?: boolean
    variant?: "default" | "ghost"
}

export const TimeBadge = ({ timestamp, className, showIcon = true, variant = "default" }: TimeBadgeProps) => {

    const formatTimestamp = (timestamp: string | Date): string => {
        const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp

        return new Intl.DateTimeFormat("cs-CZ", {
            day: "numeric",
            month: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const formattedTime = formatTimestamp(timestamp)


    if (variant === "default") {

        return (

            <Badge
                variant="outline"
                className={cn(
                    "inline-flex bg-slate-50 dark:bg-slate-700 items-center rounded-full border text-xs font-semibold transition-colors px-3 py-1",
                    className,
                )}
            >
                {showIcon && <Clock className="h-3 w-3" />}
                <span>{formattedTime}</span>
            </Badge>
        )
    } else if (variant === "ghost") {
        return <div className='text-xs text-slate-500 dark:text-slate-300'>{formattedTime}</div>
    }
}