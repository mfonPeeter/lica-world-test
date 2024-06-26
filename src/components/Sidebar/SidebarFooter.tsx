import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function SidebarFooter() {
  const { sessionClaims } = auth();
  const fullName = sessionClaims?.fullName as string;

  return (
    <div className="px-3 pt-2 border-t">
      <div className="flex items-center px-2 pt-1 pb-2.5 space-x-2 overflow-x-hidden">
        <UserButton />
        <span className="text-sm font-medium whitespace-nowrap">
          {fullName}
        </span>
      </div>
    </div>
  );
}
