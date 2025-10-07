import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/appSidebar";
import TopBanner from "../components/topbanner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main className="w-full">
        <div className=" w-full flex flex-row justify-between">
          <SidebarTrigger />
          <TopBanner />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
