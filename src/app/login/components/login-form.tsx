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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string().trim().min(1, { message: "O email é obrigatório" }).email({ message: "O email é inválido" }),
    password: z.string().trim().min(8, { message: "Sua senha tem que ter no minimo de 8 cracteres" }).max(50, { message: "Sua senha é muito grande" }),
})

export default function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function handleSubmit(values: z.infer<typeof loginSchema>) {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
            },
            {
                onSuccess: () => {
                    toast.success("Login realizado com sucesso");
                    router.push("/dashboard");
                }, onError: () => {
                    toast.error("Ocorreu um erro ao realizar o login, verifique o email ou senha");
                }
            }
        );

    }



    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>
                    Crie uma conta para acessar a plataforma.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <CardContent className="space-y-4">
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
                        <Button className="w-full" type="submit">Entrar</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}