'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { CardContent, CardFooter } from "@/components/ui/card"
import { createClinic } from "../../../actions/create-clinic"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect-error"

const clinicSchema = z.object({
    name: z.string().trim().min(2, { message: "Sua senha tem que ter no minimo de 2 caracteres" }).max(50, { message: "Nome muito grande" }),
})
export default function ClinicFormPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof clinicSchema>>({
        resolver: zodResolver(clinicSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleSubmit = async (values: z.infer<typeof clinicSchema>) => {
        try {
            await createClinic(values.name)
            toast.success("Clinica cadastrada com sucesso")
            form.reset()
            router.push("/dashboard")
        } catch (error) {
            if (isRedirectError(error)) {
                return
            }
            toast.error("Erro ao cadastrar clinica")
        }
    }
    return (
        <Dialog open>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Clinica</DialogTitle>
                        <DialogDescription>
                            Adicione uma clinica para continuar.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da clinica</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome da clinica" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Adicionando..." : "Adicionar"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>

                </DialogContent>
            </form>
        </Dialog>
    )
}