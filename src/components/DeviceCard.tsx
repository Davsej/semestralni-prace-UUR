
import { Device } from "@/types/device";

import { StatusBadge } from "@/components/StatusBadge";



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
        <Card className="gap-2 pt-0 overflow-clip">
            <Link href={`/device-detail/${device.id}`}>
                <CardHeader className="flex transition hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50 dark:bg-slate-900 pt-6 border-b pb-6 lg:flex-row flex-col lg:justify-between lg:items-start">
                    <h2 className="text-[1rem] mt-0.5 inline-block mb-1 lg:w-max w-full md:w-auto font-medium leading-[1.15]">{device.name}</h2>
                    <div className="flex gap-2 flex-wrap lg:flex-nowrap ml-auto lg:ml-0">
                        <TimeBadge timestamp={device.lastUpdated} />
                        <StatusBadge status={device.status}></StatusBadge>
                    </div>
                </CardHeader>
            </Link>
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











