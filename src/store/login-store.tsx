import {create} from "zustand";
import {Session} from "@supabase/supabase-js";

import {supabase} from "@/supabase/supabase";
import {Database} from "@/types/database.types";
import {DEV_URL, ENVIRONMENT, PROD_URL} from "@/settings/config";

interface LoginStore {
    session: Session | null | undefined;
    isLogged: boolean;
    loading: boolean;
    userData: undefined | Database["public"]["Tables"]["users"]["Row"];
    cardData: undefined | Database["public"]["Tables"]["cards"]["Row"];
    loginGoogle: () => void;
    logout: () => void;
    checkUser: () => void;
    getUserCard: () => void;
    updateCardData: (updatedCard: Database["public"]["Tables"]["cards"]["Row"] | undefined) => void;
}

const environment = {
    dev: DEV_URL,
    prod: PROD_URL,
};

export const useLoginStore = create<LoginStore>()((set, get) => ({
    session: undefined,
    isLogged: false,
    loading: true,
    cardData: undefined,
    userData: undefined,
    updateCardData: (updatedCard) => {
        set({cardData: updatedCard});
    },
    getUserCard: async () => {
        set({loading: true});
        const {data, error} = await supabase
            .from("users")
            .select("*,  cards(*), roles(*)")
            .eq("auth_user_id", get().session?.user.id)
            .single();

        if (error) {
            set({loading: false});

            return;
        }

        if (data) {
            const {id, first_name, last_name, email, dni, cellphone, street, cards} = data;

            set({
                userData: {
                    id,
                    first_name,
                    last_name,
                    email,
                    dni,
                    cellphone,
                    street,
                    auth_user_id: data.auth_user_id,
                    created_at: data.created_at,
                    role_id: data.role_id,
                },
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
                redirectTo: `${environment[ENVIRONMENT]}/card`,
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
