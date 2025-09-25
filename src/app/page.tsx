
import { Button } from "@/components/ui/button";
import { DeviceCard } from "@/components/DeviceCard";

import Link from "next/link"

import { DataProvider, getDataProvider, MockData } from '@/data';
import { Device } from '@/types/device'

import { Plus } from "lucide-react"


import { Masonry } from 'react-plock';
import { DeviceGrid } from "@/components/DeviceGrid";

export default function MainDashboard() {

  const dataProvider: DataProvider = getDataProvider();
  const devices: Device[] = dataProvider.getDevices();

  return (
    <main>
      <section className="lg:py-18 py-12">
        <div className="container flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-12">
          <h1 className="text-2xl font-medium mt-[-4px]">
            Seznam zařízení
          </h1>

          <Button variant={"outline"} size={"sm"} asChild>
            <Link href="/add-new-device"><Plus /> Přidat nové</Link>

          </Button>
        </div>
        <div className="container">
          <DeviceGrid devices={devices} />
        </div>
      </section>
    </main>
  );
}
