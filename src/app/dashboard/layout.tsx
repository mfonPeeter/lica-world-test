import { Toaster } from "sonner";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      <section className="w-full">{children}</section>
      <Toaster richColors position="top-right" />
    </main>
  );
}
