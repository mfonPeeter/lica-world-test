import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function SidebarFooter() {
  const { sessionClaims } = auth();
  const fullName = sessionClaims?.fullName as string;

  return (
    <div className="flex items-center space-x-2 px-5 pt-2 border-t">
      <UserButton />
      <span className="text-sm font-medium">{fullName}</span>
    </div>
  );
}
