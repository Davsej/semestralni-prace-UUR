
import { ModeToggle } from "./ModeToggle";
import AboutAplicationDialogButton from "./AboutAplicationDialogButton";

import Link from "next/link"
import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full z-50 bg-slate-50 dark:bg-slate-900">
            <div className="container flex justify-between items-center py-4">
                <h1 className="font-medium text-md"><Link href="/">

                    <Image src="/logo-dark.png" alt="Logo" width={200} height={40} className="inline-block dark:hidden h-8 w-auto object-contain" />
                    <Image src="/logo-white.png" alt="Logo" width={200} height={40} className="hidden dark:inline-block h-8 w-auto object-contain" />

                </Link></h1>
                <div className="flex flex-row gap-2">
                    <AboutAplicationDialogButton />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header;
