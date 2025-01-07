import { useState } from "react";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
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

// Demo data for analytics
const DEMO_ANALYTICS = {
  overview: {
    totalRevenue: 52469.75,
    totalOrders: 847,
    averageOrderValue: 61.95,
    customerCount: 423,
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
  topItems: [
    { name: "Classic Burger", quantity: 145, revenue: 1885.55 },
    { name: "Margherita Pizza", quantity: 122, revenue: 1829.78 },
    { name: "Chicken Wings", quantity: 98, revenue: 1175.02 },
    { name: "Caesar Salad", quantity: 87, revenue: 782.13 },
    { name: "French Fries", quantity: 156, revenue: 778.44 },
  ],
  ordersByStatus: {
    pending: 23,
    preparing: 15,
    ready: 8,
    delivered: 789,
    cancelled: 12,
  },
};

const TIME_PERIODS = [
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "12months", label: "Last 12 Months" },
];

export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState("7days");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const stats = [
    {
      name: "Total Revenue",
      value: `$${DEMO_ANALYTICS.overview.totalRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: CurrencyDollarIcon,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      name: "Total Orders",
      value: DEMO_ANALYTICS.overview.totalOrders,
      icon: ShoppingCartIcon,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      name: "Average Order Value",
      value: `$${DEMO_ANALYTICS.overview.averageOrderValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: ChartBarIcon,
      change: "+3.7%",
      changeType: "positive",
    },
    {
      name: "Total Customers",
      value: DEMO_ANALYTICS.overview.customerCount,
      icon: UsersIcon,
      change: "+5.9%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your restaurant's performance and insights
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="block w-full rounded-md border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
          >
            {TIME_PERIODS.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
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
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={DEMO_ANALYTICS.revenueByDay}
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

        {/* Top Selling Items */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Top Selling Items</h3>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {DEMO_ANALYTICS.topItems.map((item) => (
                  <tr key={item.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Orders by Status</h3>
          <div className="mt-4">
            <dl className="space-y-4">
              {Object.entries(DEMO_ANALYTICS.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500 capitalize">{status}</dt>
                  <dd className="text-sm font-medium text-gray-900">{count} orders</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
