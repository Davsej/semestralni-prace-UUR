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

import { useRouter } from 'next/navigation';




import { DeviceFormData } from "@/types/device"

const schema = z.object({
    deviceName: z.string().min(1, "Povinné"),
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

export default function DeviceForm({ submitCallback, defaultValues, btnText, resetAfterSubmit }: { submitCallback: (data: FormData) => void, defaultValues?: DeviceFormData, btnText?: string, resetAfterSubmit?: boolean }) {

    const router = useRouter();

    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues || {
            deviceName: "",
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
        await submitCallback(data);
        if (resetAfterSubmit) { //TODO: tady by to chtělo lepší logiku, aby se formulář resetoval a naplnil se ihned lepšími daty, než ho neresetovat. Můžou tam zbýt chyby, kdyby nastal třeba error v ukládání na backendu
            reset();
        }
        router.refresh();
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
                        {formState.isSubmitting ? "Ukládám..." : (btnText || "Přidat zařízení")}
                    </Button>
                </form>
            </Form>


        </>
    );
}
