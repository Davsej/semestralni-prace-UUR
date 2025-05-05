import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Measurement } from "@/types/device"

type SensorFieldProps = {
    index: number
    onRemove: () => void
    canRemove: boolean
}

export default function SensorField({ index, onRemove, canRemove }: SensorFieldProps) {
    const { control, watch, setValue } = useFormContext()

    const measurements = watch(`sensors.${index}.measurements`) || []

    const addMeasurement = () => {
        const updatedMeasurements = [
            ...measurements,
            { label: "", unit: "", conversion: "y = x" },
        ]
        setValue(`sensors.${index}.measurements`, updatedMeasurements)
    }

    const removeMeasurement = (mIndex: number) => {
        const updatedMeasurements = measurements.filter((_: Measurement, i: number) => i !== mIndex)
        setValue(`sensors.${index}.measurements`, updatedMeasurements)
    }

    return (
        <Card className="relative">
            <CardHeader className="pb-2">
                <CardTitle>Senzor {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <FormField
                    control={control}
                    name={`sensors.${index}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Název senzoru</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name={`sensors.${index}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Popis senzoru</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    {measurements.map((measurement: Measurement, mIndex: number) => {
                        const showRemove = measurements.length > 1

                        return (
                            <div key={mIndex} className="grid md:grid-cols-12 gap-2 relative items-start">
                                <FormField
                                    control={control}
                                    name={`sensors.${index}.measurements.${mIndex}.label`}
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-3">
                                            {mIndex === 0 && <FormLabel>Veličina</FormLabel>}
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`sensors.${index}.measurements.${mIndex}.unit`}
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-3">
                                            {mIndex === 0 && <FormLabel>Jednotka</FormLabel>}
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`sensors.${index}.measurements.${mIndex}.conversion`}
                                    render={({ field }) => (
                                        <FormItem className={showRemove ? "md:col-span-5" : "md:col-span-6"}>
                                            {mIndex === 0 && <FormLabel>Přepočet</FormLabel>}
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {showRemove && (
                                    <div className="md:col-span-1 flex justify-end items-center h-full">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() => removeMeasurement(mIndex)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <Button
                    type="button"
                    variant="link"
                    className="self-end"
                    onClick={addMeasurement}
                >
                    <Plus className="mr-2 w-4 h-4" /> Přidat veličinu
                </Button>

                {canRemove && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive"
                        onClick={onRemove}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
