'use client'
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ButtonLogout() {
    const router = useRouter();
    const userLogout = async () => {

        await authClient.signOut();
        toast.success("Sessão encerrada com sucesso voce será redirecionado para a pagina de login");
        setTimeout(() => {
            router.push("/login");
        }, 3000);


    }
    return (
        <div>
            <Button onClick={userLogout}>Sair</Button>
        </div>
    )
}