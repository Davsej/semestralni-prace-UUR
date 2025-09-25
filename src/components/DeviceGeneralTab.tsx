"use client";
import React from 'react';
import { Device } from "@/types/device"; // Adjust the import path as necessary
import { SensorRow } from "@/components/SenzorRow";
import { TimeBadge } from "@/components/TimeBadge";

import { DeviceDetailGraph } from "@/components/DeviceDetailGraph";
import { MeasurementBadge } from './MeasurementBadge';

export const DeviceGeneralTab = ({ device }: { device: Device }) => {

    const [selectedChannels, setSelectedChannels] = React.useState<{ sensorIndex: number; channelIndex: number; }[]>([{ sensorIndex: 0, channelIndex: 0 }]);


    const [selectedUnit, setSelectedUnit] = React.useState<string>("");


    const unitCounts: Record<string, number> = {};

    device.sensors.forEach(sensor => {
        sensor.channels.forEach(channel => {
            if (channel.measures.length > 0) {
                if (channel.unit == "") return;
                unitCounts[channel.unit] = (unitCounts[channel.unit] || 0) + 1;
            }
        });
    });

    const availableChannelsWithSameUnit: string[] = Object.entries(unitCounts)
        .filter(([_, count]) => count >= 2)
        .map(([unit]) => unit);

    const handleMeasurementClick = (sensorIndex: number, channelIndex: number) => {
        setSelectedChannels([{ sensorIndex, channelIndex }]);
        setSelectedUnit("");
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-md shadow bg-white dark:bg-slate-900 p-6">
                <div className="flex flex-row gap-2 mb-2 flex-wrap justify-start lg:flex-nowrap">
                    <h2>Poslední naměřené hodnoty</h2>
                    <TimeBadge timestamp={device.lastUpdated} />
                </div>
                <div className='ml-auto text-[10px] text-slate-500'>
                    Kliknutím na veličinu ji zobrazíte v grafu
                </div>
                <div className="flex flex-col mb-12">
                    {device.sensors.map((sensor, index) => {
                        return <SensorRow index={index} selectedChannels={selectedChannels} onMeasurementClick={handleMeasurementClick} key={sensor.id} sensor={sensor} />;
                    }

                    )}
                </div>

                {availableChannelsWithSameUnit.length > 0 && <div>
                    <h2 className='mb-2' >Chci v grafu zobrazit všechny měření vybrané veličiny:</h2>
                    <div className='flex flex-row gap-2 flex-wrap justify-start lg:flex-nowrap'>
                        {availableChannelsWithSameUnit.map((unit, index) => (
                            <MeasurementBadge
                                key={unit}
                                value={unit}
                                index={index}
                                unit={""}
                                selected={unit == selectedUnit}
                                onClick={() => {
                                    if (selectedUnit == unit) {
                                        setSelectedUnit("");
                                        setSelectedChannels([]);
                                    } else {
                                        setSelectedUnit(unit);

                                        const matchingChannels = device.sensors.flatMap((sensor, sensorIndex) =>
                                            sensor.channels.map((channel, channelIndex) =>
                                                channel.measures.length > 0 && channel.unit === unit
                                                    ? { sensorIndex, channelIndex }
                                                    : null
                                            ).filter(Boolean) // odstraní null hodnoty
                                        );

                                        setSelectedChannels(matchingChannels as { sensorIndex: number; channelIndex: number }[]);
                                    }

                                }}
                            ></MeasurementBadge>
                        ))}
                    </div>
                </div>}

            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 h-full rounded-md shadow p-6">
                    <h2 className="mb-4">
                        {selectedChannels.length > 0
                            ? selectedChannels.map(sel =>
                                `${device.sensors[sel.sensorIndex].name} – ${device.sensors[sel.sensorIndex].channels[sel.channelIndex].name}`
                            ).join(', ')
                            : 'Vyberte veličinu, kterou chcete zobrazit v grafu'}
                    </h2>
                    <div>
                        {selectedChannels.length > 0 && (
                            <DeviceDetailGraph
                                series={selectedChannels.map(sel => ({
                                    name: `${device.sensors[sel.sensorIndex].name} – ${device.sensors[sel.sensorIndex].channels[sel.channelIndex].name}`,
                                    unit: device.sensors[sel.sensorIndex].channels[sel.channelIndex].unit,
                                    data: device.sensors[sel.sensorIndex].channels[sel.channelIndex].measures,
                                }))}
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};