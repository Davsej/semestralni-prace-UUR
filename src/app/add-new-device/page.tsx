

import DeviceForm from "@/components/DeviceForm"


export default function AddNewDevice() {
    return (
        <section className="lg:py-18 py-12">
            <div className="container !max-w-[700px]">
                <h1 className="text-2xl font-medium mt-[-4px] mb-8">
                    Přidat nové zařízení
                </h1>
                <DeviceForm></DeviceForm>
            </div>


        </section>
    )
}