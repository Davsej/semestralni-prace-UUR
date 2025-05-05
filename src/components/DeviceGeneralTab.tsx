"use client";
import React from 'react';
import { Device } from "@/types/device"; // Adjust the import path as necessary
import { SensorRow } from "@/components/SenzorRow";
import { TimeBadge } from "@/components/TimeBadge";

import { DeviceDetailGraph } from "@/components/DeviceDetailGraph";

export const DeviceGeneralTab = ({ device }: { device: Device }) => {

    const [selectedSensor, setSelectedSensor] = React.useState<number | undefined>(0);
    const [selectedMeasurement, setSelectedMeasurement] = React.useState<number | undefined>(0);

    const handleMeasurementClick = (sensorId: number, measurementId: number) => {
        setSelectedMeasurement(measurementId);
        setSelectedSensor(sensorId);
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
                <div className="flex flex-col ">
                    {device.sensors.map((sensor, index) => {
                        if (selectedSensor == index) {
                            return <SensorRow index={index} selectedMeasurementId={selectedMeasurement} onMeasurementClick={handleMeasurementClick} key={sensor.id} sensor={sensor} />;
                        }

                        return <SensorRow index={index} onMeasurementClick={handleMeasurementClick} key={sensor.id} sensor={sensor} />
                    }

                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-md shadow p-6">
                    <h2 className="mb-4">{
                        (selectedSensor != undefined && selectedMeasurement != undefined) ? (`${device.sensors[selectedSensor].name} - ${device.sensors[selectedSensor].channels[selectedMeasurement].name} (${device.sensors[selectedSensor].channels[selectedMeasurement].unit})`) : "Vyberte měření"
                    }</h2>
                    <div>
                        {(selectedSensor != undefined && selectedMeasurement != undefined) ? (
                            <DeviceDetailGraph data={device.sensors[selectedSensor].channels[selectedMeasurement].measures} unit={device.sensors[selectedSensor].channels[selectedMeasurement].unit} />
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    );
};