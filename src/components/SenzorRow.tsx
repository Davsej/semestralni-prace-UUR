import { Sensor } from "@/types/device";



import { Info } from 'lucide-react';

import { MeasurementBadge } from "@/components/MeasurementBadge"

import {
    Tooltip,
    TooltipContent,
    // TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const SensorRow = ({ sensor, selectedChannels, index, onMeasurementClick }: { sensor: Sensor, selectedChannels?: { sensorIndex: number; channelIndex: number; }[] | undefined, index: number | undefined, onMeasurementClick?: (sensorIndex: number, value: number) => void | undefined }) => {


    const handleMeasurementClick = (MeasurementIndex: number | undefined) => {
        if (MeasurementIndex !== undefined && index !== undefined && onMeasurementClick) {
            onMeasurementClick(index, MeasurementIndex);
        }
    };

    return (
        <div className="p-2 py-3 last:border-0 last:pb-0 border-b border-slate-200 dark:border-slate-700 flex flex-row justify-between">

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
                {sensor.channels.map((channel, channelIndex) => (
                    <div key={channel.name} className="flex justify-between items-center">
                        <MeasurementBadge
                            onClick={() => handleMeasurementClick(channelIndex)}
                            index={channelIndex}
                            selected={selectedChannels?.some(sel =>
                                sel.sensorIndex === index && sel.channelIndex === channelIndex
                            )}
                            value={channel.measures.length > 0 ? `${channel.measures[0].value}` : "N/A"}
                            unit={channel.unit}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}