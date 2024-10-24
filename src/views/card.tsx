import {Button} from "@/components/ui/button";
import {useLoginStore} from "@/store/login-store";
import {UpdateCard} from "@/components/update-card";
import {CardForm} from "@/components/card-form";

export function Card() {
    const cardData = useLoginStore((state) => state.cardData);
    const userData = useLoginStore((state) => state.userData);

    return (
        <div
            className="flex justify-center flex-col items-center p-12 border-2 border-white/20 bg-transparent w-full sm:max-w-[425px] sm:rounded-3xl gap-4 backdrop-blur-[25px]"
            style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
        >
            <span className="text-xl font-semibold">Bienvenido</span>
            {cardData && userData ? (
                <div className="flex flex-col items-end justify-between h-[50dvh]">
                    <div
                        className="flex flex-col justify-between bg-lime-400 text-white p-6 rounded-lg w-[300px] h-[180px]"
                        style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
                    >
                        <div className="flex flex-col items-end w-full font-semibold leading-3">
                            <UpdateCard />
                            <span>Saldo</span>
                            <span className="text-lg">{cardData.amount}</span>
                        </div>
                        <span className="text-lg font-bold"> {`${userData?.first_name} ${userData?.last_name}`}</span>
                    </div>
                    <Button disabled className="w-fit">
                        Solicitar tarjeta física
                    </Button>
                </div>
            ) : (
                <CardForm />
            )}
        </div>
    );
}
