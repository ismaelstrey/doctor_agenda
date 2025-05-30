
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import ButtonLogout from "./components/user/ButtonExitSession";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { userToClinicTable } from "@/db/schema";

export default async function PageDashboard() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/login");
    }

    const clinics = await db.query.userToClinicTable.findMany({
        where: eq(userToClinicTable.userId, session?.user?.id)
    });
    if (clinics.length === 0) {
        redirect("/clinic-form");
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