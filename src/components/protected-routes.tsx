import {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {Spinner} from "./spinner";

import {useLoginStore} from "@/store/login-store";

export function ProtectedRoute() {
    const isLogged = useLoginStore((state) => state.isLogged);
    const loading = useLoginStore((state) => state.loading);
    const checkUser = useLoginStore((state) => state.checkUser);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    if (loading) {
        return <Spinner />;
    }

    if (!isLogged) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
