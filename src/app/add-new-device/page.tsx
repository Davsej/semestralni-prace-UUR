

import DeviceForm from "@/components/DeviceForm"
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function AddNewDevice() {
    return (
        <section className="lg:py-18 py-12">

            <div className="container !max-w-[700px]">
                <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-8">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/" className="flex items-center gap-2">
                            <ChevronLeft />
                            Zpět
                        </Link>
                    </Button>
                </div>
                <h1 className="text-2xl font-medium mt-[-4px] mb-8">
                    Přidat nové zařízení
                </h1>
                <DeviceForm></DeviceForm>
            </div>


        </section>
    )
}