import { auth } from "@clerk/nextjs/server";
import MobileSideBarHeader from "@/components/MobileSidebarHeader";
import DashboardForm from "@/components/DashboardForm";

export default async function Dashboard() {
  const { sessionClaims } = auth();
  const fullName = sessionClaims?.fullName as string;
  const email = sessionClaims?.email as string;
  const image = sessionClaims?.image as string;

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <main className="pt-4 pb-4 px-2 text-[14.5px] xs:px-4 sm:pb-0 md:pt-6">
      <div className="w-full mx-auto md:max-w-[900px]">
        <MobileSideBarHeader />
        <div className="hidden space-x-2 items-center mb-3 md:flex">
          <img
            src={image}
            alt="Profile image"
            className="size-16 rounded-full"
          />
          <div className="flex flex-col text-[13px]">
            <span className="text-base font-semibold">{fullName}</span>
            <span>{email}</span>
            <span>{`${dayOfWeek}, ${date}`}</span>
          </div>
        </div>

        <DashboardForm />
      </div>
    </main>
  );
}
