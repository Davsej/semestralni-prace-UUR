
import { DialogTrigger, Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
// import { Button } from "./ui/button";

const AboutAplicationDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="text-sm text-slate-700 dark:text-slate-50 cursor-pointer">
                    O aplikaci
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>David Šejna - IoT Dashboard</DialogTitle>
                    <DialogDescription>
                        <p>A24B0465P</p>
                        <p>Semestrální práce UUR 2025</p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}


export default AboutAplicationDialog;
