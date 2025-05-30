import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/sign-up-form";
import LoginForm from "./components/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AthenticationPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session?.user) {
        redirect("/dashboard");
    }
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" >Login</TabsTrigger>
                    <TabsTrigger value="register">Criar conta</TabsTrigger>
                </TabsList>
                <TabsContent value="login" >
                    <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}