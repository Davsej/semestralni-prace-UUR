import { Sensor } from "@/types/device";



import { Info } from 'lucide-react';

import { MeasurementBadge } from "@/components/MeasurementBadge"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const SensorRow = ({ sensor }: { sensor: Sensor }) => {
    return (
        <div className="p-2 py-3 last:border-0 last:pb-0 border-b border-gray-200 dark:border-gray-700 flex flex-row justify-between">

            {
                !sensor.description &&
                <span className="text-[14px]">{sensor.name}</span>
            }
            {
                sensor.description &&
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex cursor-pointer gap-1.5 flex-row w-full lg:w-auto items-center">
                            <span className="text-[14px]">{sensor.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ">
                                <Info size={10} />
                            </span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-32 text-[10px]">
                        <p>{sensor.description}</p>
                    </TooltipContent>
                </Tooltip>
            }

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