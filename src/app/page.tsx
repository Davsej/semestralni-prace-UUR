"use client"

import { Button } from "@/components/ui/button";
import { DeviceCard } from "@/components/DeviceCard";

import Link from "next/link"

import { DataProvider, MockData } from '@/data';
import { Device } from '@/types/device'

import { Plus } from "lucide-react"


import { Masonry } from 'react-plock';

export default function MainDashboard() {

  const dataProvider: DataProvider = new MockData();
  const devices: Device[] = dataProvider.getDevices();

  return (
    <main>
      <section className="lg:py-18 py-12">
        <div className="container flex lg:flex-row flex-col items-center lg:gap-6 gap-2 mb-12">
          <h1 className="text-2xl font-medium mt-[-4px]">
            Seznam zařízení
          </h1>

          <Button variant={"outline"} size={"sm"} asChild>
            <Link href="/add-new-device"><Plus /> Přidat další</Link>

          </Button>
        </div>
        <div className="container">
          <Masonry
            items={devices}
            config={{
              columns: [1, 2, 3],
              gap: [16, 24, 40],
              media: [567, 768, 1024],
            }}
            render={(device) => (
              <DeviceCard key={device.id} device={device}></DeviceCard>
            )}
          />
        </div>
      </section>
    </main>
  );
}
