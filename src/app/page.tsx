import AuthForm from "@/components/auth/auth-form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Strategist</h1>
            <p className="text-muted-foreground">Welcome back, please sign in to continue</p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
