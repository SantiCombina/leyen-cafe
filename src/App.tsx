import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {Login} from "./views/login";
import {NotFound} from "./views/not-found";
import {Home} from "./views/home";

import {supabase} from "@/supabase/supabase";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                navigate("/login");
            } else {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <div className="min-h-[100dvh] flex flex-col justify-center items-center p-6">
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<NotFound />} path="*" />
            </Routes>
        </div>
    );
}

export default App;
