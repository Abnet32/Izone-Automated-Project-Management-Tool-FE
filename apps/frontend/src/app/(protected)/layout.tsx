import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/login");
  }

  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="flex-1 p-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}

