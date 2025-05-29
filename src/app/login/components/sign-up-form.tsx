'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
    name: z.string().trim().min(1, { message: "Esse cmapo é obrigatório" }).max(50, { message: "O nome é muito grande" }),
    email: z.string().trim().min(1, { message: "O email é obrigatório" }).email({ message: "O email é inválido" }),
    password: z.string().trim().min(8, { message: "Sua senha tem que ter no minimo de 8 cracteres" }).max(50, { message: "Sua senha é muito grande" }),
})

export default function SignUpForm() {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function handleSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do usuário</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-Mail</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Informe seu email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Informe sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Criar conta</Button>
                </CardFooter>
            </form>
        </Form>
    );
}