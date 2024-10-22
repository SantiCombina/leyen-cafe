import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {cardRequestSchema, CardRequestValues} from "@/schemas/card-request-schema";
import {useLoginStore} from "@/store/login-store";
import {supabase} from "@/supabase/supabase";
import {Modal} from "@/components/modal";

const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {month: "2-digit", year: "2-digit"}).replace(",", "");
};

export function Home() {
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [dniFocused, setDniFocused] = useState(false);
    const [cellphoneFocused, setCellphoneFocused] = useState(false);
    const [streetFocused, setStreetFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openCreateCardModal, setCreateCardModalOpen] = useState(false);

    const session = useLoginStore((state) => state.session);
    const cardData = useLoginStore((state) => state.cardData);
    const userData = useLoginStore((state) => state.userData);
    const checkUser = useLoginStore().checkUser;

    const methods = useForm<CardRequestValues>({
        resolver: zodResolver(cardRequestSchema),
        defaultValues: {
            email: session?.user.email ?? "",
            first_name: "",
            last_name: "",
            dni: "",
            cellphone: "",
            street: "",
        },
    });

    const onSubmit = async (values: CardRequestValues) => {
        setIsLoading(true);

        const {data, error} = await supabase
            .from("users")
            .update({
                dni: values.dni,
                first_name: values.first_name,
                last_name: values.last_name,
                cellphone: values.cellphone,
                street: values.street,
            })
            .eq("auth_user_id", session?.user.id)
            .select();

        if (error) {
            toast.error("Error al actualizar los datos del usuario");
        } else {
            const {error} = await supabase
                .from("cards")
                .insert([{amount: 0, user_id: data[0]?.id}])
                .select();

            if (error) {
                toast.error("Error al crear la tarjeta");
            } else {
                toast.success("Tarjeta creada correctamente");
                checkUser();
                setCreateCardModalOpen(false);
            }
        }

        setIsLoading(false);
    };

    return (
        <div
            className="flex justify-center flex-col items-center px-10 py-14 border-2 border-white/20 bg-transparent w-[350px] rounded-3xl gap-4 backdrop-blur-[25px]"
            style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
        >
            <span className="text-xl font-semibold">Bienvenido</span>
            {cardData && userData ? (
                <div className="flex flex-col justify-between bg-gradient-to-r from-amber-900 via-orange-500 to-orange-400 text-white h-full p-2 gap-12 rounded-md w-full">
                    <div className="w-full text-start font-bold">{userData.full_name}</div>
                    <div className="flex justify-between text-xs">
                        <div className="flex flex-col">
                            <span className="tiny">desde</span>
                            <span className="text-start">{formatDate(cardData.created_at)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span>Saldo</span>
                            <span className="text-end">{cardData.amount}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <Modal
                    buttonText="Activar tarjeta"
                    description="Para activar tu tarjeta, completá los siguientes datos"
                    isLoading={isLoading}
                    open={openCreateCardModal}
                    setOpen={setCreateCardModalOpen}
                    title="Activar tarjeta"
                    trigger={<Button>Activar tarjeta de socio</Button>}
                    onAccept={methods.handleSubmit(onSubmit)}
                    onCancel={methods.reset}
                >
                    <Form {...methods}>
                        <form className="w-full space-y-3">
                            <FormField
                                control={methods.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel className="absolute z-10 px-1 text-xs transition-all duration-200 -top-2 left-3 text-primary bg-background">
                                            Email *
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} disabled />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel
                                            className={cn(
                                                firstNameFocused || field.value
                                                    ? "-translate-y-5 bg-background px-1 text-xs"
                                                    : "",
                                                "absolute left-3 top-3 text-primary transition-all duration-200",
                                            )}
                                        >
                                            Nombre *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setFirstNameFocused(false)}
                                                onFocus={() => setFirstNameFocused(true)}
                                            />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel
                                            className={cn(
                                                lastNameFocused || field.value
                                                    ? "-translate-y-5 bg-background px-1 text-xs"
                                                    : "",
                                                "absolute left-3 top-3 text-primary transition-all duration-200",
                                            )}
                                        >
                                            Apellido *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setLastNameFocused(false)}
                                                onFocus={() => setLastNameFocused(true)}
                                            />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="dni"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel
                                            className={cn(
                                                dniFocused || field.value
                                                    ? "-translate-y-5 bg-background px-1 text-xs"
                                                    : "",
                                                "absolute left-3 top-3 text-primary transition-all duration-200",
                                            )}
                                        >
                                            DNI *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setDniFocused(false)}
                                                onFocus={() => setDniFocused(true)}
                                            />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="cellphone"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel
                                            className={cn(
                                                cellphoneFocused || field.value
                                                    ? "-translate-y-5 bg-background px-1 text-xs"
                                                    : "",
                                                "absolute left-3 top-3 text-primary transition-all duration-200",
                                            )}
                                        >
                                            Celular
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setCellphoneFocused(false)}
                                                onFocus={() => setCellphoneFocused(true)}
                                            />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="street"
                                render={({field}) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel
                                            className={cn(
                                                streetFocused || field.value
                                                    ? "-translate-y-5 bg-background px-1 text-xs"
                                                    : "",
                                                "absolute left-3 top-3 text-primary transition-all duration-200",
                                            )}
                                        >
                                            Calle
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onBlur={() => setStreetFocused(false)}
                                                onFocus={() => setStreetFocused(true)}
                                            />
                                        </FormControl>
                                        <div className="h-[1rem]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </Modal>
            )}
        </div>
    );
}
