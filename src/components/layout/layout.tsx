import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-[100dvh] text-primary bg-background flex flex-col justify-center items-center">
            <Outlet />
        </div>
    );
}
