"use client";

import React from 'react';
import DeviceForm from '@/components/DeviceForm';
import { Device, DeviceFormData } from '@/types/device';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import Link from 'next/link';

import { Button } from "@/components/ui/button";


export default function AddNewDeviceForm() {
    const [successOpen, setSuccessOpen] = React.useState(false);

    const submitCallback = async (data: DeviceFormData) => {

        try {
            const response = await fetch('/api/devices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response);

            if (!response.ok) {
                throw new Error('Failed to add device');
            }

            const result: Device = await response.json();
            console.log('Device added successfully:', result);
            setSuccessOpen(true); // Open success modal

        }
        catch (error) {
            console.error('Error adding device:', error);
        }
    };

    return (
        <>
            <DeviceForm submitCallback={submitCallback} resetAfterSubmit={true} />

            {/* Success Modal */}
            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Zařízení bylo úspěšně přidáno!</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant='default'>
                            <Link href="/">Zpět na seznam zařízení</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}