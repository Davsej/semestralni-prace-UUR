"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Device } from '@/types/device';

export default function DeviceDeleteComponent({ device }: { device: Device }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const deleteDevice = async () => {
        try {
            const response = await fetch(`/api/devices`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: device.id })
            });

            if (!response.ok) {
                throw new Error('Failed to delete device');
            }

            console.log('Device deleted successfully');
            window.location.href = '/';
        }
        catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const isNameCorrect = inputValue.trim() === device.name;

    return (
        <div className="w-full flex justify-end">
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                Smazat zařízení
            </Button>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Opravdu chcete smazat toto zařízení? Tato akce je nenávratná.
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <p>Zadejte přesný název zařízení <strong>{device.name}</strong> pro potvrzení:</p>
                        <Input
                            placeholder="Zadejte název zařízení"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Zrušit</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={deleteDevice}
                            disabled={!isNameCorrect}
                        >
                            Smazat
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
