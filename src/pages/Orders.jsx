import { useState } from "react";
import { ClockIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import OrderForm from "../features/orders/OrderForm";

const ORDER_STATUSES = {
  pending: { name: "Pending", color: "bg-yellow-100 text-yellow-800" },
  preparing: { name: "Preparing", color: "bg-blue-100 text-blue-800" },
  ready: { name: "Ready", color: "bg-green-100 text-green-800" },
  delivered: { name: "Delivered", color: "bg-dark-100 text-gray-800" },
  cancelled: { name: "Cancelled", color: "bg-red-100 text-red-800" },
};

// Demo data for orders
const DEMO_ORDERS = [
  {
    id: 1,
    order_id: "ORD001",
    customer_name: "John Doe",
    customer_phone: "+1 234-567-8900",
    items: [
      { id: 1, name: "Classic Burger", quantity: 2, price: 12.99, notes: "No onions" },
      { id: 2, name: "French Fries", quantity: 1, price: 4.99 },
      { id: 3, name: "Coca Cola", quantity: 2, price: 2.99 },
    ],
    subtotal: 36.95,
    tax: 3.7,
    total: 40.65,
    status: "pending",
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    order_id: "ORD002",
    customer_name: "Jane Smith",
    customer_phone: "+1 234-567-8901",
    items: [
      { id: 4, name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { id: 5, name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    subtotal: 23.98,
    tax: 2.4,
    total: 26.38,
    status: "preparing",
    created_at: "2024-03-15T10:45:00Z",
  },
  {
    id: 3,
    order_id: "ORD003",
    customer_name: "Bob Wilson",
    customer_phone: "+1 234-567-8902",
    items: [
      { id: 6, name: "Chicken Wings", quantity: 2, price: 11.99 },
      { id: 7, name: "Garlic Bread", quantity: 1, price: 4.99 },
      { id: 8, name: "Sprite", quantity: 2, price: 2.99 },
    ],
    subtotal: 34.95,
    tax: 3.5,
    total: 38.45,
    status: "ready",
    created_at: "2024-03-15T11:00:00Z",
  },
  {
    id: 4,
    order_id: "ORD004",
    customer_name: "Alice Brown",
    customer_phone: "+1 234-567-8903",
    items: [
      { id: 9, name: "Vegetarian Pizza", quantity: 1, price: 15.99 },
      { id: 10, name: "Greek Salad", quantity: 1, price: 9.99 },
    ],
    subtotal: 25.98,
    tax: 2.6,
    total: 28.58,
    status: "delivered",
    created_at: "2024-03-15T09:30:00Z",
  },
  {
    id: 5,
    order_id: "ORD005",
    customer_name: "Charlie Davis",
    customer_phone: "+1 234-567-8904",
    items: [{ id: 11, name: "Cheeseburger", quantity: 1, price: 13.99 }],
    subtotal: 13.99,
    tax: 1.4,
    total: 15.39,
    status: "cancelled",
    created_at: "2024-03-15T10:15:00Z",
  },
];

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Replace API calls with demo data
  const orders = DEMO_ORDERS;
  const isLoading = false;
  const error = null;

  const handleStatusUpdate = async (orderId, newStatus) => {
    // Update the order status in the UI
    toast.success(`Order status updated to ${ORDER_STATUSES[newStatus].name}`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleAddOrder = (newOrder) => {
    // In a real app, this would make an API call
    console.log("New order:", newOrder);
    toast.success("Order created successfully");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <ClockIcon className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading orders: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">Manage and track customer orders</p>
        </div>
        <button
          onClick={() => setIsOrderFormOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-400 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-200 text-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              {Object.entries(ORDER_STATUSES).map(([value, { name }]) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-200 text-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.items.length} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ORDER_STATUSES[order.status].color
                      }`}
                    >
                      {ORDER_STATUSES[order.status].name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="rounded-md border-gray-200 text-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      {Object.entries(ORDER_STATUSES).map(([value, { name }]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSubmit={handleAddOrder}
      />
    </div>
  );
}
