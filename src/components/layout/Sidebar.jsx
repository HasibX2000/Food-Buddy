import { Link, useLocation } from "react-router-dom";
import siteLogo from "../../assets/logo.png";
import { Dialog } from "@headlessui/react";
import {
  HomeIcon,
  ShoppingCartIcon,
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  XMarkIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Menu", href: "/menu", icon: QueueListIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon },
  { name: "Reservations", href: "/reservations", icon: CalendarIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Customers", href: "/customers", icon: UsersIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog
        as="div"
        className="relative z-50 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />

        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="flex h-full flex-col overflow-y-auto bg-white py-4">
              <div className="flex shrink-0 items-center px-4">
                <img className="h-8 w-auto" src={siteLogo} alt="Your Company" />
              </div>
              <div className="mt-5 flex flex-grow flex-col">
                <nav className="flex-1 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActivePath(item.href)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          isActivePath(item.href)
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component */}
        <div className="flex min-h-0 flex-1 flex-col bg-white">
          <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-4">
            <img className="h-8 w-auto" src={siteLogo} alt="Your Company" />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActivePath(item.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      isActivePath(item.href)
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
