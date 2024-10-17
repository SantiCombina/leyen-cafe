import {Outlet} from "react-router-dom";

import {Navbar} from "./navbar";

export function Layout() {
    return (
        <div className="min-h-[100dvh] items-center justify-center text-primary bg-background flex flex-col">
            <Navbar />
            <div className="container flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}
