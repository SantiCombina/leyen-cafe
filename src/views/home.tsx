import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useLoginStore} from "@/store/login-store";
import {cardRequestSchema, CardRequestValues} from "@/schemas/card-request-schema";
import {supabase} from "@/supabase/supabase";

export function Home() {
    const session = useLoginStore((state) => state.session);
    const logout = useLoginStore((state) => state.logout);

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
        const {data, error, status} = await supabase
            .from("cards")
            .insert([{dni: values.dni, amount: 0}])
            .select();

        if (data) {
            const {data: user_data, error} = await supabase
                .from("users")
                .insert([{...values, card_id: data[0].id, id: session?.user.id}])
                .select();
        }

        console.log(data);
    };

    return (
        <div
            className="flex justify-center flex-col items-center px-10 py-14 border-2 border-white/20 bg-transparent w-[350px] rounded-3xl gap-3 backdrop-blur-[25px]"
            style={{boxShadow: "0 0 10px rgba(0, 0, 0, .2)"}}
        >
            <span>Bienvenido</span>
            <Form {...methods}>
                <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormField
                        control={methods.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="first_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="last_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="dni"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>DNI</FormLabel>
                                <FormControl>
                                    <Input placeholder="00.000.000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="cellphone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Celular</FormLabel>
                                <FormControl>
                                    <Input placeholder="0000 0000000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="street"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Calle</FormLabel>
                                <FormControl>
                                    <Input placeholder="Calle 123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">
                        Darme de alta
                    </Button>
                </form>
            </Form>
            <Button onClick={logout}>Salir</Button>
        </div>
    );
}
