import { useState } from "react";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Demo data for dashboard
const DEMO_DASHBOARD = {
  overview: {
    totalRevenue: 52469.75,
    totalOrders: 847,
    totalCustomers: 423,
    upcomingReservations: 12,
  },
  revenueByDay: [
    { date: "2024-03-14", revenue: 1234.56 },
    { date: "2024-03-15", revenue: 2345.67 },
    { date: "2024-03-16", revenue: 1876.43 },
    { date: "2024-03-17", revenue: 2987.65 },
    { date: "2024-03-18", revenue: 1765.43 },
    { date: "2024-03-19", revenue: 2198.76 },
    { date: "2024-03-20", revenue: 2567.89 },
  ],
};

export default function Dashboard() {
  const stats = [
    {
      name: "Total Revenue",
      value: `$${DEMO_DASHBOARD.overview.totalRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: CurrencyDollarIcon,
    },
    {
      name: "Total Orders",
      value: DEMO_DASHBOARD.overview.totalOrders,
      icon: ShoppingCartIcon,
    },
    {
      name: "Total Customers",
      value: DEMO_DASHBOARD.overview.totalCustomers,
      icon: UsersIcon,
    },
    {
      name: "Upcoming Reservations",
      value: DEMO_DASHBOARD.overview.upcomingReservations,
      icon: CalendarIcon,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">Overview of your restaurant's performance</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
        <div className="mt-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={DEMO_DASHBOARD.revenueByDay}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
                labelFormatter={formatDate}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                fill="#4F46E5"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
