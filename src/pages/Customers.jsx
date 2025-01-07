import { useState } from "react";
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CustomerForm from "../features/customers/CustomerForm";
import toast from "react-hot-toast";

// Demo data for customers
const DEMO_CUSTOMERS = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8900",
    total_orders: 15,
    total_spent: 945.5,
    last_order: "2024-03-15T10:30:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+1 234-567-8901",
    total_orders: 8,
    total_spent: 524.75,
    last_order: "2024-03-14T15:45:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 234-567-8902",
    total_orders: 12,
    total_spent: 789.25,
    last_order: "2024-03-13T18:20:00Z",
    status: "inactive",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    phone: "+1 234-567-8903",
    total_orders: 20,
    total_spent: 1245.8,
    last_order: "2024-03-16T12:15:00Z",
    status: "active",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 234-567-8904",
    total_orders: 5,
    total_spent: 312.4,
    last_order: "2024-03-10T09:45:00Z",
    status: "inactive",
  },
];

const CUSTOMER_STATUSES = {
  active: { name: "Active", color: "bg-green-100 text-green-800" },
  inactive: { name: "Inactive", color: "bg-dark-100 text-gray-800" },
};

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAddCustomer = (newCustomer) => {
    // In a real app, this would make an API call
    console.log("New customer:", newCustomer);
    toast.success("Customer added successfully");
    setIsFormOpen(false);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const filteredCustomers = DEMO_CUSTOMERS.filter((customer) => {
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your customer information and track their orders
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setIsFormOpen(true);
          }}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-400 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          New Customer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="search" className="sr-only">
                Search customers
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search customers..."
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                {Object.entries(CUSTOMER_STATUSES).map(([value, { name }]) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.total_orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${customer.total_spent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.last_order).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        CUSTOMER_STATUSES[customer.status].color
                      }`}
                    >
                      {CUSTOMER_STATUSES[customer.status].name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Form Modal */}
      <CustomerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleAddCustomer}
        customer={selectedCustomer}
      />
    </div>
  );
}
