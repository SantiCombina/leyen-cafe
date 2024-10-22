import {create} from "zustand";
import {Session} from "@supabase/supabase-js";

import {supabase} from "@/supabase/supabase";
import {Database} from "@/types/database.types";

type UserData = {
    first_name: string;
    last_name: string;
    full_name: string;
};

interface LoginStore {
    session: Session | null | undefined;
    isLogged: boolean;
    loading: boolean;
    cardData: undefined | Database["public"]["Tables"]["cards"]["Row"];
    userData: undefined | UserData;
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
    userData: undefined,

    getUserCard: async () => {
        set({loading: true});
        const {data} = await supabase
            .from("users")
            .select("first_name, last_name, cards(*)")
            .eq("auth_user_id", get().session?.user.id)
            .single();

        if (data) {
            const {first_name, last_name, cards} = data;
            const full_name = `${first_name} ${last_name}`;

            set({
                userData: {first_name, last_name, full_name},
                cardData: cards[0],
            });
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
