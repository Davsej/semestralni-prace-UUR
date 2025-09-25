import Link from "next/link"

import { DataProvider, MockData } from '@/data';
import { Device } from '@/types/device'

import { Button } from "@/components/ui/button";

import { StatusBadge } from "@/components/StatusBadge";
import { DeviceGeneralTab } from "@/components/DeviceGeneralTab"
import { DeviceHistoryTab } from "@/components/DeviceHistoryTab"
import { DeviceEditTab } from "@/components/DeviceEditTab"

import { Badge } from "@/components/ui/badge";

import { ChevronLeft } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDataProvider } from "@/data";

// import { TimeBadge } from "@/components/TimeBadge"
// import { SensorRow } from "@/components/SenzorRow"
type Params = Promise<{ id: string }>


export default async function Page({ params }: { params: Params }) {

    const { id } = await params;
    const deviceId = id;
    const dataProvider: DataProvider = getDataProvider();
    const device: Device | undefined = dataProvider.getDeviceById(deviceId);

    if (!device) {
        return (
            <main>
                <section className="lg:py-18 py-12">
                    <div className="container flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-12">
                        <h1 className="text-2xl font-medium mt-[-4px]">
                            Zařízení nenalezeno
                        </h1>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <ChevronLeft />
                                Zpět
                            </Link>
                        </Button>
                    </div>

                </section>
            </main>
        )

    }

    return (
        <main>
            <section className="lg:py-18 py-12 lg:pt-12">
                <div className="container mb-10">
                    <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-8">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <ChevronLeft />
                                Zpět
                            </Link>
                        </Button>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-2">
                        <h1 className="text-2xl font-medium mt-[-4px]">
                            {device.name}
                        </h1>
                        <div className="flex gap-2 flex-wrap lg:flex-nowrap ml-auto lg:ml-0">
                            <Badge variant="outline" className="inline-flex bg-white dark:bg-slate-700 items-center rounded-full border text-xs font-semibold transition-colors px-3 py-1">ID: {device.id}</Badge>
                            <StatusBadge status={device.status}></StatusBadge>
                        </div>
                    </div>
                    <p className="max-w-[20rem] text-sm text-slate-500">{device.description}</p>
                </div>
                <div className="container">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="cursor-pointer mb-8 bg-slate-50 p-0.5 h-auto dark:bg-slate-800 rounded-md">
                            <TabsTrigger
                                value="overview"
                                className="cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md px-4 py-3 text-sm font-medium"
                            >
                                Přehled
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md px-4 py-3 text-sm font-medium"
                            >
                                Historie měření a export
                            </TabsTrigger>
                            <TabsTrigger
                                value="edit"
                                className="cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md px-4 py-3 text-sm font-medium"
                            >
                                Nastavení
                            </TabsTrigger>

                        </TabsList>
                        <TabsContent value="overview">
                            <DeviceGeneralTab device={device} />
                        </TabsContent>
                        <TabsContent value="history">
                            <DeviceHistoryTab
                                device={device}
                            />
                        </TabsContent>
                        <TabsContent value="edit">
                            <DeviceEditTab
                                device={device}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </main>
    )

}