import { useLoaderData } from "react-router-dom";
import { supabase } from "../services/supabase";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export async function loader() {
  // For now, return dummy data
  return {
    stats: {
      totalRevenue: 24659.0,
      totalOrders: 156,
      activeCustomers: 521,
      avgPrepTime: 18,
      // Add more stats as needed
    },
  };
}

export default function Dashboard() {
  const { stats } = useLoaderData();

  const statCards = [
    {
      name: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: CurrencyDollarIcon,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      name: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCartIcon,
      change: "+4.2%",
      changeType: "positive",
    },
    {
      name: "Active Customers",
      value: stats.activeCustomers,
      icon: UsersIcon,
      change: "+8.1%",
      changeType: "positive",
    },
    {
      name: "Average Prep Time",
      value: `${stats.avgPrepTime} min`,
      icon: ClockIcon,
      change: "-2.3%",
      changeType: "negative",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">{/* Optional: Add action buttons here */}</div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="sr-only">
                  {stat.changeType === "positive" ? "Increased" : "Decreased"} by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Optional: Add more dashboard sections here */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
            {/* Add recent orders table or list here */}
          </div>
        </div>

        {/* Popular Items */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Popular Items</h3>
            {/* Add popular items list here */}
          </div>
        </div>
      </div>
    </div>
  );
}
