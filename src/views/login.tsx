import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {supabase} from "@/supabase/supabase";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {loginSchema, LoginValues} from "@/schemas/login-schema";

export function Login() {
    const {handleSubmit, register} = useForm<LoginValues>({resolver: zodResolver(loginSchema)});

    const navigate = useNavigate();

    const onSubmit = async (values: LoginValues) => {
        try {
            await supabase.auth.signInWithOtp({
                email: values.email,
                options: {emailRedirectTo: `${window.location.origin}/login`},
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("email")} placeholder="tuemail@sitio.com" type="email" />
                <Button>Enviar</Button>
            </form>
        </div>
    );
}
