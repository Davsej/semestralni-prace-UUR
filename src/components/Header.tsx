
import { ModeToggle } from "./ModeToggle";
import AboutAplicationDialogButton from "./AboutAplicationDialogButton";

import Link from "next/link"

const Header = () => {
    return (
        <header className="w-full z-50 bg-slate-50 dark:bg-slate-900">
            <div className="container flex justify-between items-center py-4">
                <h1 className="font-medium text-md"><Link href="/">IoT Dashboard</Link></h1>
                <div className="flex flex-row gap-2">
                    <AboutAplicationDialogButton />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header;
