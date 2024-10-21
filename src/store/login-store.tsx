import {create} from "zustand";
import {Session} from "@supabase/supabase-js";
import {toast} from "sonner";

import {supabase} from "@/supabase/supabase";
import {Database} from "@/types/database.types";

interface LoginStore {
    session: Session | null | undefined;
    isLogged: boolean;
    loading: boolean;
    cardData: undefined | Database["public"]["Tables"]["cards"]["Row"];
    loginGoogle: () => void;
    logout: () => void;
    checkUser: () => void;
    getUserCard: () => void;
}

export const useLoginStore = create<LoginStore>()((set, get) => ({
    session: undefined,
    isLogged: false,
    loading: true,
    cardData: undefined,

    getUserCard: async () => {
        set({loading: true});
        const {data, error} = await supabase
            .from("users")
            .select("*, cards(*)")
            .eq("auth_user_id", get().session?.user.id)
            .single();

        if (data) {
            set({cardData: data.cards[0]});
        }
        if (error) {
            toast.error("Error al obtener los datos de la tarjeta");
        }

        set({loading: false});
    },
    checkUser: async () => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                set({session: session, isLogged: true});
            } else if (event === "INITIAL_SESSION") {
                get().getUserCard();
            } else if (event === "SIGNED_OUT") {
                set({session: null, isLogged: false, loading: false});
            }
        });
    },
    loginGoogle: async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {prompt: "select_account"},
                redirectTo: "http://localhost:5173/",
            },
        });
        set({
            isLogged: true,
            loading: false,
        });
    },
    logout: async () => {
        set({
            loading: true,
        });
        await supabase.auth.signOut();
        set({
            isLogged: false,
            loading: false,
        });
    },
}));
