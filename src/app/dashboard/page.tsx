import { auth } from "@clerk/nextjs/server";
import MobileSideBarHeader from "@/components/Sidebar/MobileSidebarHeader";
import DashboardForm from "@/components/Dashboard/DashboardForm";
import { getAccessToken } from "@/utils/authUtils";
import { getCurrentDate } from "@/utils/dateUtils";
import { linkedInGetUserId } from "@/utils/apiClients/apiCalls";

import Image from "next/image";

export default async function Dashboard() {
  // Retrieve session claims
  const { sessionClaims } = auth();

  // Get user's details from session claims
  const fullName = sessionClaims?.fullName as string;
  const email = sessionClaims?.email as string;
  const image = sessionClaims?.image as string;

  // Get current date
  const curDate = getCurrentDate();

  // Get access token for LinkedIn API
  // const accessToken: string = await getAccessToken();

  // // Get LinkedIn user ID using access token
  // const { userId }: { userId: string } = await linkedInGetUserId(accessToken);

  // Handle token fetch with error catching
  let accessToken;
  let userId;
  let tokenError;

  try {
    accessToken = await getAccessToken();
    const result = await linkedInGetUserId(accessToken);
    userId = result.userId;
  } catch (error: any) {
    if (error.errors?.[0]?.code === "oauth_missing_refresh_token") {
      tokenError =
        "Your LinkedIn session has expired. Please log out and log in again.";
    } else {
      tokenError = "Failed to connect to LinkedIn. Please try again.";
    }
  }

  return (
    <main className="pt-4 pb-4 px-2 text-[14.5px] xs:px-4 sm:pb-0 md:pt-6">
      <div className="w-full mx-auto md:max-w-[900px]">
        {/* Render mobile sidebar header */}
        <MobileSideBarHeader />

        {/* Render user information */}
        <div className="hidden space-x-2 items-center mb-3 md:flex">
          <Image
            src={image}
            alt="Profile image"
            width="64"
            height="64"
            className="rounded-full"
          />
          <div className="flex flex-col text-[13px]">
            <span className="text-base font-semibold">{fullName}</span>
            <span>{email}</span>
            <span>{`${curDate.dayOfWeek}: ${curDate.date}`}</span>
          </div>
        </div>

        {/* Render dashboard form component */}
        {tokenError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Authentication Error</p>
            <p className="text-sm mt-1">{tokenError}</p>
            <p className="text-sm mt-2">
              Use the profile menu to log out and sign in again.
            </p>
          </div>
        ) : accessToken && userId ? (
          <DashboardForm userId={userId} accessToken={accessToken} />
        ) : null}
      </div>
    </main>
  );
}
