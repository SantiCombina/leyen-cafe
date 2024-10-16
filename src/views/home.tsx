import {Button} from "@/components/ui/button";
import {supabase} from "@/supabase/supabase";

export function Home() {
    return (
        <div>
            <span>Home</span>
            <Button onClick={() => supabase.auth.signOut()}>Salir</Button>
        </div>
    );
}
