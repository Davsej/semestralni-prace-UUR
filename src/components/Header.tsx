
import { ModeToggle } from "./ModeToggle";
import AboutAplicationDialogButton from "./AboutAplicationDialogButton";

import Link from "next/link"
// import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full z-50 border-b dark:border-gray-800 border-gray-100">
            <div className="container flex justify-between items-center py-4">
                <h1 className="font-medium text-md"><Link href="/">

                    <div className="flex items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="4" fill="#F8F9FA" />
                            <path
                                d="M8 16C8 11.5817 11.5817 8 16 8V8C20.4183 8 24 11.5817 24 16V22C24 23.1046 23.1046 24 22 24H10C8.89543 24 8 23.1046 8 22V16Z"
                                stroke="#1E293B"
                                strokeWidth="1.5"
                            />
                            <path d="M12 14V18" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16 12V18" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M20 16V18" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="font-semibold text-slate-800 dark:text-slate-50">IoT Dashboard</span>
                    </div>
                </Link></h1>
                <div className="flex flex-row gap-4">
                    <AboutAplicationDialogButton />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header;
