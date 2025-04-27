export type DeviceStatus = 'online' | 'offline' | 'error';

export type MeasurementType = 'humidity' | 'temperature' | 'battery' | 'CO2' | 'rainfall' | 'windSpeed' | 'number' | 'text';

type TimestampString = string; // ISO timestamp

export interface Device {
    id: string;
    name: string;
    description?: string;
    lastUpdated: TimestampString;
    status: DeviceStatus;
    sensors: Sensor[];
}

export interface Sensor {
    id: string;
    name: string;
    description?: string;
    channels: SenzorChannel[]; //každý senzor může měřit více veličin, v kódu jako kanály senzoru
}

export interface SenzorChannel {
    measurementType: MeasurementType;
    measures: Measurement[];
    unit: string;
}

export interface Measurement {
    timestamp: TimestampString;
    value: number | "N/A";
}