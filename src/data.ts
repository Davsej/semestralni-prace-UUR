import { Device } from '@/types/device';

export interface DataProvider {
    getDevices(): Device[];
}



export class MockData implements DataProvider {
    getDevices() {
        const devices: Device[] = [
            {
                id: '1',
                name: 'Big freezer',
                lastUpdated: '2023-10-20T12:55:00Z',
                status: 'online',
                sensors: [
                    {
                        id: '1-1',
                        name: 'DHT22 - 1',
                        description: 'Measures temperature and humidity',
                        channels: [
                            {
                                measurementType: 'temperature',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 23.5
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 24.0
                                    }
                                ],
                                unit: '°C'
                            },
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 80
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 78
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        name: 'K33 BLG CO2',
                        description: 'Measures CO2 levels',
                        channels: [
                            {
                                measurementType: 'CO2',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 400
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 420
                                    }
                                ],
                                unit: 'ppm'
                            }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: 'Heat rain',
                lastUpdated: '2023-10-21T14:00:00Z',
                status: 'offline',
                sensors: [
                    {
                        id: '2-1',
                        name: 'Temp 1',
                        description: 'Measures temperature',
                        channels: [
                            {
                                measurementType: 'temperature',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 23.5
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 22.0
                                    }
                                ],
                                unit: '°C'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Humidity Sensor',
                        description: 'Measures humidity',
                        channels: [
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 60
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 65
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Humidity Sensor',
                        description: 'Measures humidity',
                        channels: [
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 60
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 65
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Humidity Sensor',
                        description: 'Measures humidity',
                        channels: [
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 60
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 65
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Humidity Sensor',
                        description: 'Measures humidity',
                        channels: [
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 60
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 65
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: 'Humidity Sensor',
                        description: 'Measures humidity',
                        channels: [
                            {
                                measurementType: 'humidity',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 60
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 65
                                    }
                                ],
                                unit: '%'
                            }
                        ]
                    }
                ]
            },
            {
                id: '3',
                name: 'CO2 Meter',
                lastUpdated: '2023-10-22T09:30:00Z',
                status: 'error',
                sensors: [
                    {
                        id: '3-1',
                        name: 'K33 BLG',
                        description: 'Measures CO2 levels',
                        channels: [
                            {
                                measurementType: 'CO2',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 450
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 460
                                    }
                                ],
                                unit: 'ppm'
                            }
                        ]
                    },
                    {
                        id: '3-2',
                        name: 'CO2 Valve',
                        channels: [
                            {
                                measurementType: 'CO2',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 470
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 480
                                    }
                                ],
                                unit: 'ppm'
                            }
                        ]
                    }
                ]
            },
            {
                id: '4',
                name: 'Weather Station',
                lastUpdated: '2023-10-22T10:00:00Z',
                status: 'online',
                sensors: [
                    {
                        id: '4-1',
                        name: 'Wind Sensor',
                        description: 'Measures wind speed',
                        channels: [
                            {
                                measurementType: 'CO2',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 15
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 20
                                    }
                                ],
                                unit: 'km/h'
                            }
                        ]
                    },
                    {
                        id: '4-2',
                        name: 'Rain Gauge',
                        description: 'Measures rainfall',
                        channels: [
                            {
                                measurementType: 'text',
                                measures: [
                                    {
                                        timestamp: '2023-10-20T12:55:00Z',
                                        value: 5
                                    },
                                    {
                                        timestamp: '2023-10-21T12:55:00Z',
                                        value: 10
                                    }
                                ],
                                unit: 'mm'
                            }
                        ]
                    }
                ]
            }
        ];

        return devices;

    }
}