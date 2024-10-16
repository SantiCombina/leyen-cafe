import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {supabase} from "@/supabase/supabase";
import {Button} from "@/components/ui/button";

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                navigate("/login");
            }
        });
    }, [navigate]);

    return (
        <div>
            <span>Home</span>
            <Button onClick={() => supabase.auth.signOut()}>Salir</Button>
        </div>
    );
}
