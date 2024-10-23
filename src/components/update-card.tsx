import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {Minus, Plus} from "lucide-react";
import {useState} from "react";

import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {Modal} from "./modal";

import {cardUpdateSchema, CardUpdateValues} from "@/schemas/card-update-schema";
import {supabase} from "@/supabase/supabase";
import {useLoginStore} from "@/store/login-store";
import {cn} from "@/lib/utils";
import {TablesUpdate} from "@/types/database.types";

export function UpdateCard() {
    const cardData = useLoginStore((state) => state.cardData);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlus, setIsPlus] = useState(true);
    const [openCreateCardModal, setOpenCreateCardModal] = useState(false);

    // const cardAmount = cardData?.amount;

    const methods = useForm<CardUpdateValues>({
        resolver: zodResolver(cardUpdateSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = async (values: CardUpdateValues) => {
        setIsLoading(true);

        if (!cardData) {
            toast.error("No se encontraron datos de la tarjeta");
            setIsLoading(false);

            return;
        }

        const currentAmount = cardData.amount || 0;
        const newAmount = isPlus ? currentAmount + values.amount : currentAmount - values.amount;

        const updateData: TablesUpdate<"cards"> = {
            amount: newAmount,
        };

        const {error} = await supabase.from("cards").update(updateData).eq("id", cardData.id);

        if (error) {
            toast.error("Error al actualizar el saldo de la tarjeta");
        } else {
            toast.success("Saldo actualizado correctamente");
            useLoginStore.getState().updateCardData({...cardData, amount: newAmount});
            setOpenCreateCardModal(false);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <Modal
                buttonText="Actualizar saldo"
                description="Pon el monto a actualizar"
                isLoading={isLoading}
                open={openCreateCardModal}
                setOpen={setOpenCreateCardModal}
                title="Actualizar saldo"
                trigger={<Plus />}
                onAccept={methods.handleSubmit(onSubmit)}
                onCancel={methods.reset}
            >
                <Form {...methods}>
                    <form>
                        <FormField
                            control={methods.control}
                            name="amount"
                            render={({field}) => (
                                <FormItem className="relative w-full">
                                    <FormLabel className="absolute z-10 px-1 text-xs transition-all duration-200 -top-2 left-3 text-primary bg-background">
                                        Monto
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <div className="h-[1rem]">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div className="flex justify-between mt-4">
                    <Button
                        className={cn(
                            isPlus ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-300",
                            "data-[state=closed]:hover:bg-green-300 data-[state=open]:hover:bg-green-600",
                        )}
                        data-state={isPlus ? "open" : "closed"}
                        type="button"
                        onClick={() => setIsPlus(true)}
                    >
                        <Plus className="mr-2" />
                        Sumar
                    </Button>
                    <Button
                        className={cn(
                            !isPlus ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 hover:bg-gray-300",
                            "data-[state=closed]:hover:bg-red-300 data-[state=open]:hover:bg-red-600",
                        )}
                        data-state={isPlus ? "closed" : "open"}
                        type="button"
                        onClick={() => setIsPlus(false)}
                    >
                        <Minus className="mr-2" />
                        Restar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
