import Link from "next/link"

import { DataProvider, MockData } from '@/data';
import { Device } from '@/types/device'

import { Button } from "@/components/ui/button";

import { StatusBadge } from "@/components/StatusBadge";
import { DeviceGeneralTab } from "@/components/DeviceGeneralTab"
import { DeviceHistoryTab } from "@/components/DeviceHistoryTab"

import { Badge } from "@/components/ui/badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




// import { TimeBadge } from "@/components/TimeBadge"
// import { SensorRow } from "@/components/SenzorRow"


export default function Page({ params }: { params: { id: string } }) {

    const deviceId = params.id;
    const dataProvider: DataProvider = new MockData();
    const device: Device | undefined = dataProvider.getDeviceById(deviceId);

    if (!device) {
        return (
            <main>
                <section className="lg:py-18 py-12">
                    <div className="container flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-12">
                        <h1 className="text-2xl font-medium mt-[-4px]">
                            Zařízení nenalezeno
                        </h1>
                        <Button variant={"outline"} size={"sm"} asChild>
                            <Link href="/">Zpět</Link>
                        </Button>
                    </div>

                </section>
            </main>
        )

    }

    return (
        <main>
            <section className="lg:py-18 py-12">
                <div className="container mb-10">
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
                                Historie měření
                            </TabsTrigger>
                            <TabsTrigger
                                value="configuration"
                                className="cursor-pointer data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md px-4 py-3 text-sm font-medium"
                            >
                                Konfigurace zařízení
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <DeviceGeneralTab device={device} />
                        </TabsContent>
                        <TabsContent value="history">
                            <DeviceHistoryTab
                                columns={[]}
                                data={[]}
                            />
                        </TabsContent>
                        <TabsContent value="configuration">
                            <p className="text-sm text-slate-500">Zde bude obsah pro záložku Konfigurace zařízení.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </main>
    )

}