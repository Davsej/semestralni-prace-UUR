"use client";

import React from 'react';
import { DeviceCard } from '@/components/DeviceCard';
import { Masonry } from 'react-plock';
import { Device } from '@/types/device';

export function DeviceGrid({ devices }: { devices: Device[] }) {
    return (
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
    );
}