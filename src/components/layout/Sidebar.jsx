import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import siteLogo from "../../assets/logo.png";
import {
  XMarkIcon,
  HomeIcon,
  ShoppingCartIcon,
  CalendarIcon,
  ChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Menu", href: "/menu", icon: QueueListIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon },
  { name: "Reservations", href: "/reservations", icon: CalendarIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img className="h-8 w-auto" src={siteLogo} alt="Restaurant Logo" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  location.pathname === item.href
                                    ? "bg-primary-50 text-primary"
                                    : "text-dark-600 hover:text-primary hover:bg-primary-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    location.pathname === item.href
                                      ? "text-primary"
                                      : "text-dark-400 group-hover:text-primary",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {/* Footer section with secondary color */}
                      <li className="-mx-6 mt-auto">
                        <Link
                          to="/settings"
                          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-dark hover:bg-secondary-50"
                        >
                          <img
                            className="h-8 w-8 rounded-full bg-secondary"
                            src={siteLogo}
                            alt=""
                          />
                          <span className="sr-only">Your profile</span>
                          <span aria-hidden="true">Restaurant Settings</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-dark-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src={siteLogo} alt="Restaurant Logo" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-primary-50 text-primary"
                            : "text-dark-600 hover:text-primary hover:bg-primary-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors duration-200"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            location.pathname === item.href
                              ? "text-primary"
                              : "text-dark-400 group-hover:text-primary",
                            "h-6 w-6 shrink-0 transition-colors duration-200"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* Footer section with secondary color */}
              <li className="-mx-6 mt-auto">
                <Link
                  to="/settings"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-dark hover:bg-secondary-50 transition-colors duration-200"
                >
                  <img className="h-8 w-8 rounded-full bg-secondary" src={siteLogo} alt="" />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Restaurant Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
