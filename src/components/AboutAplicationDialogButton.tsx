
import { DialogTrigger, Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

const AboutAplicationDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline">O aplikaci</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>David Šejna - IoT Dashboard</DialogTitle>
                    <DialogDescription>
                        <p>A22B0465P</p>
                        <p>Semestrální práce UUR 2025</p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}


export default AboutAplicationDialog;
