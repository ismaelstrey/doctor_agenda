'use client'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ButtonExit() {
    const router = useRouter();
    const userLogout = async () => {

        await authClient.signOut();
        toast.success("Sessão encerrada com sucesso voce será redirecionado para a pagina de login");
        setTimeout(() => {
            router.push("/login");
        }, 3000);
    }
    return (      
            <span onClick={userLogout}>Sair</span>       
    )
}