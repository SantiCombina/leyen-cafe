import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useLoginStore} from "@/store/login-store";

export function Login() {
    const loginGoogle = useLoginStore((state) => state.loginGoogle);

    return (
        <div
            className="flex justify-center flex-col items-center px-10 py-14 border-2 border-white/20 bg-transparent w-[350px] rounded-3xl text-primary gap-3 backdrop-blur-[25px]"
            style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
        >
            <span className="text-xl font-semibold">Inicia sesión!</span>
            <Button
                className="flex w-full justify-center items-center gap-2 rounded-lg text-primary bg-[#EFEFEF] hover:bg-[#dcd8d5]"
                onClick={loginGoogle}
            >
                <img alt="Google icon" src="/google.svg" />
                Continuar con Google
            </Button>
            <span className="flex w-full py-2 gap-2 items-center after:w-full after:h-[1px] after:bg-primary after:content-['']" />
            <Input placeholder="Usuario" />
            <Input placeholder="Contraseña" type="password" />
            <Button className="w-full bg-primary hover:bg-primary/90">Iniciar</Button>
        </div>
    );
}
