import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth()
 
  if (!session?.user) return redirect("/");

    return (
      <div>
          Profile
      </div>
    );
  }
  