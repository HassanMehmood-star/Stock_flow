import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { getServerUser } from "@/lib/server-api";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  return (
    <div className="min-h-screen bg-brand-black">
      <Sidebar role={user.role} />
      <div className="lg:pl-64">
        <TopBar user={user} />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
