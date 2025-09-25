import { Device, DeviceFormData } from '@/types/device';
import fs from 'fs';

//NEW nově jsem přidal funkci getDataProvider
export function getDataProvider(): DataProvider {
    return new MockData();
}

export interface DataProvider {
    getDevices(): Device[];
    getDeviceById(id: string): Device | undefined;
    addDevice(device: Device): Device;
    removeDevice(id: string): boolean;
    updateDevice(id: string, updatedDevice: Device): Device | undefined;
}



export class MockData implements DataProvider {

    getDeviceById(id: string): Device | undefined {
        const devices = this.getDevices();
        return devices.find(device => device.id === id);
    }

    getDevices(): Device[] {
        const data = fs.readFileSync('src/devices.json', 'utf-8');
        const devices: Device[] = JSON.parse(data);
        return devices;
    }

    addDevice(device: Device): Device {
        const devices = this.getDevices();
        devices.unshift(device);
        fs.writeFileSync('src/devices.json', JSON.stringify(devices, null, 2));
        return device;
    }

    removeDevice(id: string): boolean {
        const devices = this.getDevices();
        const index = devices.findIndex(device => device.id === id);
        if (index === -1) return false;

        devices.splice(index, 1);
        fs.writeFileSync('src/devices.json', JSON.stringify(devices, null, 2));
        return true;
    }

    updateDevice(id: string, updatedDevice: Device): Device | undefined {
        const devices = this.getDevices();
        const index = devices.findIndex(device => device.id === id);
        if (index === -1) return undefined;

        devices[index] = { ...devices[index], ...updatedDevice };
        fs.writeFileSync('src/devices.json', JSON.stringify(devices, null, 2));
        return devices[index];
    }



}




