import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import ButtonLogout from "./components/user/ButtonExitSession";
import { redirect } from "next/navigation";

export default async function PageDashboard() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/login");
        return null;
    }

    return (
        <div>
            <h1>Hello World</h1>
            <h2>{session?.user?.email}</h2>
            <h2>{session?.user?.name}</h2>
            <ButtonLogout />
        </div>
    )
}