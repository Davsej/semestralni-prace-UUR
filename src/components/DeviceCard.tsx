
import { Device } from "@/types/device";

import { StatusBadge } from "@/components/StatusBadge";

import { cn } from "@/lib/utils"


import { TimeBadge } from "@/components/TimeBadge"
import { SensorRow } from "@/components/SenzorRow"

import Link from "next/link";

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
        <Card className="gap-2 pt-0 overflow-clip border border-slate-200  dark:border-slate-700 shadow-sm rounded-lg">
            <Link href={`/device-detail/${device.id}`}>
                <CardHeader className={cn("flex transition border-b border-slate-200  [&:hover_h2]:underline dark:border-slate-700 pt-6 pb-4 flex-col lg:justify-between lg:items-start",
                    device.status === "online" && false && "bg-[#f7fff9] hover:bg-[hsl(135,100%,96%)] dark:bg-[#0e170e] hover:dark:bg-[#1a2b1a]",
                    device.status === "error" && false && "bg-[#fff5f5] hover:bg-[hsl(0,100%,97%)] dark:bg-[#281515] dark:hover:bg-[#3b1f1f]",
                    device.status === "offline" && false && "bg-[#fcfeff] hover:bg-[hsl(200,100%,98%)] dark:bg-[#0c111f] dark:hover:bg-[#1a1f2e]",
                )}>
                    <h2 className="inline-block mb-2 lg:w-max w-full md:w-auto text-lg font-semibold leading-[1.15]">{device.name}</h2>
                    <div className="flex gap-3 flex-wrap lg:flex-nowrap items-center ml-auto lg:ml-0">
                        <TimeBadge variant="ghost" timestamp={device.lastUpdated} />
                        <StatusBadge status={device.status}></StatusBadge>
                    </div>
                </CardHeader>
            </Link>
            <CardContent>
                {
                    device.sensors.map((sensor) => (
                        <SensorRow
                            key={sensor.id}
                            sensor={sensor}
                            index={device.sensors.indexOf(sensor)}

                        />
                    ))
                }
            </CardContent>
        </Card>
    </>
}











