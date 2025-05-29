'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/sign-up-form";






export default function AthenticationPage() {


    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Criar conta</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>

                        </CardHeader>
                        <CardContent className="space-y-4">

                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Criar conta</CardTitle>
                            <CardDescription>
                                Crie uma conta para acessar a plataforma.
                            </CardDescription>
                        </CardHeader>
                        <SignUpForm />

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}