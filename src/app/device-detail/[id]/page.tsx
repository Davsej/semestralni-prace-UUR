import Link from "next/link"

import { DataProvider, MockData } from '@/data';
import { Device } from '@/types/device'

import { Button } from "@/components/ui/button";

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
                <div className="container flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-12">
                    <h1 className="text-2xl font-medium mt-[-4px]">
                        {device.name}
                    </h1>

                </div>
                <div className="container">

                </div>
            </section>
        </main>
    )

}