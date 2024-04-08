import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getServerSession();
  console.log("🚀 ~ LoginPage ~ session:", session);
  if (session) redirect("/");

  return (
    <main>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
