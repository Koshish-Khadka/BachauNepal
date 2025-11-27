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
      <aside className="w-64 border-r bg-white">
        <Dashsidebar />
      </aside>
      <aside className="fixed top-0 left-64 right-0 h-16 z-50">
        <Dashbar />
      </aside>

      {/* Dynamic Content */}
      <main className="flex-1 p-6 mt-16 bg-gray-50">{children}</main>
    </div>
  );
}
