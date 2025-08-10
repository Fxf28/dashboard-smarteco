import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs"
import Link from "next/link"

export function Login({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <SignedIn>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome Back</CardTitle>
                        <CardDescription>
                            You are already signed in
                            <br />
                            <Link href="/dashboard" className="text-blue-500 hover:underline">Go to Dashboard</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <UserButton />
                    </CardContent>
                </SignedIn>
                <SignedOut>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Selamat Datang</CardTitle>
                        <CardDescription>
                            Silahkan login dengan akun anda untuk melanjutkan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <SignInButton mode="modal">
                                <Button className="w-full cursor-pointer">Login</Button>
                            </SignInButton>

                            <p className="text-center text-sm text-gray-500">
                                Belum punya akun?
                            </p>

                            <SignUpButton mode="modal">
                                <Button variant="outline" className="w-full border-blue-900 hover:bg-blue-700 cursor-pointer">
                                    Daftar
                                </Button>
                            </SignUpButton>
                        </div>
                    </CardContent>
                </SignedOut>
            </Card>
        </div>
    )
}
