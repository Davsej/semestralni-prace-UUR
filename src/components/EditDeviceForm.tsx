"use client";

import React from 'react';
import DeviceForm from '@/components/DeviceForm';
import { Device } from '@/types/device';

import { DeviceFormData } from '@/types/device';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";

import { getDataProvider } from "@/data";

import { deviceToFormData, formDataToDevice } from '@/deviceFormUtilities';

export default function EditDeviceForm({ device }: { device: Device }) {

    const [successOpen, setSuccessOpen] = React.useState(false);

    const formData: DeviceFormData = deviceToFormData(device);

    const submitCallback = async (data: DeviceFormData) => {
        try {
            const response = await fetch(`/api/devices`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: device.id,
                    device: data,
                })
            });

            console.log('Response status:', response);

            if (!response.ok) {
                throw new Error('Failed to update device');
            }

            const result: Device = await response.json();
            console.log('Device updated successfully:', result);
            setSuccessOpen(true); // Open success modal
        }
        catch (error) {
            console.error('Error updated device:', error);
        }
    };

    return (
        <div>
            <h2 className='text-lg font-semibold mb-6'>Upravit zařízení</h2>
            <DeviceForm submitCallback={submitCallback} defaultValues={formData} btnText={"Uložit"} />
            {/* Success Modal */}
            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Změny byly uloženy!</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="default">Zavřít</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}