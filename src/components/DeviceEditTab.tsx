import React from 'react';
import { Device, DeviceFormData } from "@/types/device";
import { MockData, DataProvider, getDataProvider } from '@/data';
import EditDeviceForm from '@/components/EditDeviceForm';

import DeviceDeleteComponent from '@/components/deviceDeleteComponent';


export const DeviceEditTab = ({ device }: { device: Device }) => {

    const examplePayload = device.sensors.map((sensor) => {
        return {
            sensorId: sensor.id,
            sensorName: sensor.name, // přidané pro komentáře
            channels: sensor.channels, // uložíme si pro pozdější použití
            measurements: sensor.channels.map((channel, index) => {
                return {
                    channelIndex: index,
                    channelName: channel.name, // přidané pro komentáře
                    value: Number((Math.random() * 100).toFixed(2)),
                    timestamp: new Date().toISOString()
                };
            })
        };
    });

    const examplePayloadString = `[
${device.sensors.map((sensor) => {
        const measurements = sensor.channels.map((channel, index) => {
            const value = Number((Math.random() * 100).toFixed(2));
            const timestamp = new Date().toISOString();
            return `        {
            "channelIndex": ${index}, //${channel.name}
            "value": ${value},
            "timestamp": "${timestamp}"
        }`;
        }).join(',\n');

        return `    {
        "sensorId": "${sensor.id}", //${sensor.name}
        "measurements": [
${measurements}
        ]
    }`;
    }).join(',\n')}
]`;





    return (

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <EditDeviceForm device={device} />
            <div>
                <h2 className="text-lg font-semibold mb-4">Napojení zařízení</h2>
                <div className="bg-white text-sm dark:bg-slate-900 rounded-md shadow p-8 mb-8">
                    <p className='mb-4'>
                        <strong>API endpoint:</strong> <code>/api/devices/{device.id}/new-measurement</code>
                    </p>
                    <p className='mb-2'>
                        <strong>Požadovaná struktura posílaných dat:</strong>
                    </p>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {examplePayloadString}
                    </pre>
                </div>

                <div>
                    <DeviceDeleteComponent device={device}></DeviceDeleteComponent>
                </div>
            </div>
        </div >


    );
};