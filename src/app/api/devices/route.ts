import { Device } from "@/types/device";
import { getDataProvider } from "@/data";
import { formDataToDevice } from "@/deviceFormUtilities";
import { DataProvider } from "@/data";

export async function POST(request: Request) {
    //add new device
    const body = await request.json();
    const DataProvider: DataProvider = getDataProvider();

    const device: Device = formDataToDevice(body);

    const addedDevice = DataProvider.addDevice(device);

    return new Response(JSON.stringify(addedDevice), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });

}


export async function PATCH(request: Request) {
    //update device
    const body = await request.json();

    const id = body.id;
    if (!id) {
        return new Response(JSON.stringify({ error: "Device ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }


    const DataProvider: DataProvider = getDataProvider();

    const existingDevice = DataProvider.getDeviceById(id);
    if (!existingDevice) {
        return new Response(JSON.stringify({ error: "Device not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const device: Device = formDataToDevice(body.device, existingDevice);
    const updatedDevice = DataProvider.updateDevice(device.id, device);

    if (!updatedDevice) {
        return new Response(JSON.stringify({ error: "Device not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify(updatedDevice), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}


export async function DELETE(request: Request) {
    const body = await request.json();
    const id = body.id;

    if (!id) {
        return new Response(JSON.stringify({ error: "Device ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const DataProvider: DataProvider = getDataProvider();
    const success = DataProvider.removeDevice(id);

    if (!success) {
        return new Response(JSON.stringify({ error: "Device not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({ message: "Device deleted successfully" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}