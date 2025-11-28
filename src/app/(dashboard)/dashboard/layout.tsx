import Dashsidebar from "../components/Dashsidebar";
import Dashbar from "../components/Dashbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed section */}
      <aside className="w-64 h-screen fixed top-0 left-0 border-r bg-white overflow-y-auto">
        <Dashsidebar />
      </aside>
      <aside className="fixed top-0 left-64 right-0 h-16 z-50">
        <Dashbar />
      </aside>

      {/* Dynamic Content */}
      <main className=" ml-64 flex-1 p-6 mt-16 h-[calc(100vh-4rem)] bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
