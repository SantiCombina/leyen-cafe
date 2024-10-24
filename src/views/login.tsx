import {useState} from "react";
import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useLoginStore} from "@/store/login-store";
import {cn} from "@/lib/utils";

export function Login() {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginGoogle = useLoginStore((state) => state.loginGoogle);

    return (
        <div className="min-h-[100dvh] flex justify-center items-center container">
            <div
                className="flex justify-center flex-col items-center p-12 border-2 border-white/20 bg-transparent w-full sm:max-w-[425px] sm:rounded-3xl text-primary gap-4 backdrop-blur-[25px]"
                style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
            >
                <span className="text-xl font-semibold">Iniciar sesión</span>
                <Button
                    className="flex w-full justify-center items-center gap-2 rounded-lg text-primary bg-[#EFEFEF] hover:bg-[#dcd8d5]"
                    onClick={loginGoogle}
                >
                    <img alt="Google icon" src="/google.svg" />
                    Continuar con Google
                </Button>
                <span className="flex w-full py-2 gap-2 items-center after:w-full after:h-[1px] after:bg-primary/50 after:content-['']" />
                <div className="relative w-full">
                    <Label
                        className={cn(
                            emailFocused || email ? "-translate-y-5 bg-background px-1 text-xs" : "",
                            "absolute left-3 top-3 text-primary transition-all duration-200",
                        )}
                        htmlFor="email"
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        value={email}
                        onBlur={() => setEmailFocused(false)}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                    />
                </div>
                <div className="relative w-full">
                    <Label
                        className={cn(
                            passwordFocused || password ? "-translate-y-5 bg-background px-1 text-xs" : "",
                            "absolute left-3 top-3 text-primary transition-all duration-200",
                        )}
                        htmlFor="password"
                    >
                        Contraseña
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                    />
                </div>
                <Button className="w-full">Iniciar</Button>
                <footer className="flex -mt-2 text-sm">
                    <p>¿Olvidaste tu contraseña? Haz click aquí.</p>
                </footer>
                <Button asChild className="w-full" variant={"outline"}>
                    <Link to={"/"}>Volver al inicio</Link>
                </Button>
            </div>
        </div>
    );
}
