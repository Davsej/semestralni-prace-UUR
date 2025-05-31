"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Plus } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import SensorField from "./SensorField"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

const schema = z.object({
    deviceName: z.string().min(1, "Povinné"),
    deviceId: z.string().min(1, "Povinné"),
    deviceDescription: z.string().optional(),
    sensors: z.array(
        z.object({
            name: z.string().min(1, "Povinné"),
            description: z.string().optional(),
            measurements: z.array(
                z.object({
                    label: z.string().min(1, "Povinné"),
                    unit: z.string().optional(),
                    conversion: z.string().optional(),
                })
            ).min(1, "Přidej alespoň jednu veličinu"),
        })
    ).min(1, "Musí být přidán alespoň jeden senzor"),
});

type FormData = z.infer<typeof schema>;

export default function DeviceForm() {
    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            deviceName: "",
            deviceId: "52",
            deviceDescription: "",
            sensors: [
                {
                    name: "",
                    description: "",
                    measurements: [{ label: "", unit: "", conversion: "y = x" }],
                },
            ],
        },
        mode: "onChange",
    });

    const { control, handleSubmit, setValue, watch, formState, reset } = methods;

    const [successOpen, setSuccessOpen] = useState(false);

    const sensors = watch("sensors");

    const addSensor = () => {
        setValue("sensors", [
            ...sensors,
            {
                name: "",
                description: "",
                measurements: [{ label: "", unit: "", conversion: "y = x" }],
            },
        ]);
    };

    const removeSensor = (index: number) => {
        const updatedSensors = sensors.filter((_, i) => i !== index);
        setValue("sensors", updatedSensors);
    };

    const onSubmit = async (data: FormData) => {
        console.log(data);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        reset();
        setSuccessOpen(true);
    };

    return (
        <>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-start">
                        <FormField
                            control={control}
                            name="deviceName"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Název zařízení</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={control}
                        name="deviceDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Popis zařízení</FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <h2 className="text-xl font-medium mt-2">Senzory</h2>
                    <div className="flex flex-col gap-8">
                        {sensors.map((sensor, index) => (
                            <SensorField
                                key={index}
                                index={index}
                                onRemove={() => removeSensor(index)}
                                canRemove={sensors.length > 1}
                            />
                        ))}
                    </div>

                    <Button
                        variant="link"
                        className="self-end"
                        type="button"
                        onClick={addSensor}
                    >
                        <Plus className="mr-2" /> Přidat senzor
                    </Button>

                    <Button type="submit" className="mt-6" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? "Ukládám..." : "Přidat zařízení"}
                    </Button>
                </form>
            </Form>

            {/* Success Modal */}
            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Zařízení bylo úspěšně přidáno!</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="default">Zavřít</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
