import {toast} from "sonner";

import {Button} from "./ui/button";

import {useLoginStore} from "@/store/login-store";
import {supabase} from "@/supabase/supabase";

export function DeleteUser() {
    const session = useLoginStore((state) => state.session);
    const logout = useLoginStore((state) => state.logout);
    const checkUser = useLoginStore((state) => state.checkUser);

    const handleDeleteUser = async () => {
        const {error} = await supabase.from("users").delete().eq("auth_user_id", session?.user.id).select();

        if (error) {
            toast.error("Error al eliminar el usuario");
        } else {
            toast.success("Usuario eliminado correctamente");
            await checkUser();
            logout();
        }
    };

    return (
        <div>
            <Button onClick={handleDeleteUser}>Borrar usuario</Button>
        </div>
    );
}