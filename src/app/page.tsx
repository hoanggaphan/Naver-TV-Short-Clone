import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { login, logout } from "@/lib/actions/auth";

export default async function Home() {
  const session = await auth()
  if (!session) return <div className="grid items-center justify-items-center h-screen font-sans">
  <div className="">
    <h1 className="text-8xl">You are not signed in</h1>
    <form
      action={login}
    >
        <Button type="submit" size="lg">Signin with GitHub</Button>
    </form>
  </div>
</div>

  return (
    <div className="grid items-center justify-items-center h-screen font-sans">
      <div className="">
        <h1 className="text-8xl">You are signed in</h1>
        <form
        action={logout}
      >
          <Button type="submit" size="lg">Logout</Button>
      </form>
      </div>
    </div>
  );
}
