import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn
        signUpUrl="/sign-up"
        path="/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}
