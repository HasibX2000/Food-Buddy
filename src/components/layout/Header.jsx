import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Header({ setSidebarOpen }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">{/* Add search or other controls here */}</div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Add notifications, profile dropdown, etc. here */}
          <div className="text-sm text-gray-500">Welcome, {user?.email || "Guest"}</div>
        </div>
      </div>
    </div>
  );
}
