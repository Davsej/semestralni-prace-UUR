export type DeviceStatus = 'online' | 'offline' | 'error';


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
    name?: string
    measures: Measurement[] | [];
    unit: string;
}

export interface Measurement {
    timestamp: TimestampString;
    value: number | "N/A";
    conversion?: string;
}



export interface DeviceFormData {
    deviceName: string;
    deviceDescription?: string;
    sensors?: {
        name: string;
        description?: string;
        measurements?: {
            label: string;
            unit?: string;
            conversion?: string;
        }[];
    }[];
}