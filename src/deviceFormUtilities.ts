
import { Device, DeviceFormData } from '@/types/device';

function generateMeasures(startDate: string, numPoints: number, min: number, max: number, stepMinutes = 60) {
    const measures = [];
    const date = new Date(startDate);

    for (let i = 0; i < numPoints; i++) {
        measures.push({
            timestamp: date.toISOString(),
            value: +(Math.random() * (max - min) + min).toFixed(2)
        });
        date.setMinutes(date.getMinutes() + stepMinutes);
    }

    return measures;
}
//device for persisting IDs
export function formDataToDevice(data: DeviceFormData, device?: Device): Device {
    const time = new Date().toISOString();

    return {
        id: device?.id || Math.random().toString(36).substring(2, 15),
        name: data.deviceName || 'Nové zařízení',
        description: data.deviceDescription || '',
        lastUpdated: time,
        status: 'offline',
        sensors: data.sensors?.map((sensor) => {
            const matchingSensor = device?.sensors?.find(s => s.name === sensor.name); //TODO: podle jména senzoru zajišťuji, aby zůstali zachovány ID -> není to dobrý přístup, protože nemohu přejmenovat senzor, aniž by se nezměnilo ID, ale pro jednoduchost to stačí
            return {
                id: matchingSensor?.id || Math.random().toString(36).substring(2, 15),
                name: sensor.name || 'Nový senzor',
                description: sensor.description || '',
                channels: sensor.measurements?.map(measurement => {
                    const matchingChannel = matchingSensor?.channels?.find( //TODO: zde platí to samé co výše
                        c => c.name === measurement.label
                    );

                    return {
                        name: measurement.label || 'Nová veličina',
                        unit: measurement.unit || '',
                        measures: matchingChannel?.measures || generateMeasures(time, 20, 15, 30),
                    };
                }) || []
            };
        }) || []
    };
}


export function deviceToFormData(device: Device): DeviceFormData {
    return {
        deviceName: device.name,
        deviceDescription: device.description,
        sensors: device.sensors.map(sensor => ({
            name: sensor.name,
            description: sensor.description,
            measurements: sensor.channels.map(channel => ({
                label: channel.name,
                unit: channel.unit,
                conversion: channel.measures.length > 0 ? 'y = x' : undefined // Placeholder for conversion
            }))
        }))
    };
}