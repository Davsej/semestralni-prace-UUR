import { Device } from '@/types/device';

export interface DataProvider {
    getDevices(): Device[];
    getDeviceById(id: string): Device | undefined;
}

function generateMeasures(startDate: string, numPoints: number, min: number, max: number, stepMinutes = 60) {
    const measures = [];
    let date = new Date(startDate);

    for (let i = 0; i < numPoints; i++) {
        measures.push({
            timestamp: date.toISOString(),
            value: +(Math.random() * (max - min) + min).toFixed(2)
        });
        date.setMinutes(date.getMinutes() + stepMinutes);
    }

    return measures;
}

export class MockData implements DataProvider {

    getDeviceById(id: string): Device | undefined {
        const devices = this.getDevices();
        return devices.find(device => device.id === id);
    }

    getDevices(): Device[] {
        const devices: Device[] = [
            {
                id: '1',
                name: 'Velký mrazák',
                lastUpdated: '2023-10-20T12:55:00Z',
                status: 'online',
                description: 'Mrazák používaný pro skladování potravin a simulaci nízkých teplot.',
                sensors: [
                    {
                        id: '1-1',
                        name: 'DHT22',
                        description: 'Senzor měřící teplotu a vlhkost uvnitř mrazáku.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 20, 30)
                            },
                            {
                                measurementType: 'humidity',
                                unit: '%',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 50, 90)
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        name: 'K33 BLG',
                        description: 'Senzor pro měření koncentrace CO₂ ve vzduchu.',
                        channels: [
                            {
                                measurementType: 'CO2',
                                unit: 'ppm',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 400, 500)
                            }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: 'Klimatická komora',
                lastUpdated: '2023-10-21T14:00:00Z',
                status: 'offline',
                description: 'Zařízení simulující změny teploty a vlhkosti během dešťových podmínek.',
                sensors: [
                    {
                        id: '2-1',
                        name: 'Teplotní senzor 1',
                        description: 'Senzor měřící teplotu okolního prostředí.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 15, 25)
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Teplotní senzor 2',
                        description: 'Senzor měřící teplotu okolního prostředí.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 15, 25)
                            }
                        ]
                    },
                    {
                        id: '2-3',
                        name: 'Teplotní senzor 3',
                        description: 'Senzor měřící teplotu okolního prostředí.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 15, 25)
                            }
                        ]
                    },
                    {
                        id: '2-4',
                        name: 'Teplotní senzor 4',
                        description: 'Senzor měřící teplotu okolního prostředí.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 15, 25)
                            }
                        ]
                    },
                    {
                        id: '2-5',
                        name: 'Teplotní senzor 5',
                        description: 'Senzor měřící teplotu okolního prostředí.',
                        channels: [
                            {
                                measurementType: 'temperature',
                                unit: '°C',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 15, 25)
                            }
                        ]
                    },
                    {
                        id: '2-6',
                        name: 'Senzor vlhkosti',
                        channels: [
                            {
                                measurementType: 'humidity',
                                unit: '%',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 50, 90)
                            }
                        ]
                    }
                ]
            },
            {
                id: '3',
                name: 'Měřič CO₂',
                lastUpdated: '2023-10-22T09:30:00Z',
                status: 'error',
                sensors: [
                    {
                        id: '3-1',
                        name: 'K33 BLG',
                        description: 'Hlavní senzor sledující koncentraci CO₂.',
                        channels: [
                            {
                                measurementType: 'CO2',
                                unit: 'ppm',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 400, 500)
                            }
                        ]
                    },
                    {
                        id: '3-2',
                        name: 'CO₂ ventil',
                        description: 'Senzor sledující stav ventilu na vstupu/výstupu CO₂.',
                        channels: [
                            {
                                measurementType: 'CO2',
                                unit: 'ppm',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 400, 500)
                            }
                        ]
                    }
                ]
            },
            {
                id: '4',
                name: 'Meteostanice',
                lastUpdated: '2023-10-22T10:00:00Z',
                status: 'online',
                description: 'Stanice sledující aktuální povětrnostní podmínky.',
                sensors: [
                    {
                        id: '4-1',
                        name: 'Senzor větru',
                        description: 'Senzor měřící rychlost větru.',
                        channels: [
                            {
                                measurementType: 'windSpeed',
                                unit: 'km/h',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 5, 30)
                            }
                        ]
                    },
                    {
                        id: '4-2',
                        name: 'Dešťový senzor',
                        description: 'Senzor zaznamenávající množství srážek.',
                        channels: [
                            {
                                measurementType: 'rainfall',
                                unit: 'mm',
                                measures: generateMeasures('2023-10-20T00:00:00Z', 20, 0, 20)
                            }
                        ]
                    }
                ]
            }
        ];

        return devices;
    }
}
