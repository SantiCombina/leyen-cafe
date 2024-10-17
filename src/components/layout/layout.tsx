import {Outlet} from "react-router-dom";

import {Navbar} from "./navbar";

export function Layout() {
    return (
        <div className="min-h-[100dvh] text-primary bg-background flex flex-col justify-center items-center">
            <Navbar />
            <Outlet />
        </div>
    );
}
