import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button";

export function Home() {
    return (
        <div className="min-h-[100dvh] flex justify-center container flex-col">
            <div className="flex flex-col gap-2">
                <div>
                    <h1 className="font-bold text-7xl text-primary">LEYEN CAFE</h1>
                    <p className="">Café de especialidad-Bollería-Pastelería</p>
                </div>
                <Button asChild className="w-fit">
                    <Link to={"/login"}>Entrar</Link>
                </Button>
            </div>
        </div>
    );
}
