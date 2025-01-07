import { useState } from "react";
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ReservationForm from "../features/reservations/ReservationForm";
import toast from "react-hot-toast";

const RESERVATION_STATUSES = {
  confirmed: { name: "Confirmed", color: "bg-green-100 text-green-800" },
  pending: { name: "Pending", color: "bg-yellow-100 text-yellow-800" },
  seated: { name: "Seated", color: "bg-blue-100 text-blue-800" },
  completed: { name: "Completed", color: "bg-dark-100 text-gray-800" },
  cancelled: { name: "Cancelled", color: "bg-red-100 text-red-800" },
};

// Demo data for reservations
const DEMO_RESERVATIONS = [
  {
    id: 1,
    reservation_id: "RES001",
    customer_name: "John Smith",
    customer_phone: "+1 234-567-8900",
    party_size: 4,
    date: "2024-03-20",
    time: "19:00",
    special_requests: "Window seat preferred",
    status: "confirmed",
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    reservation_id: "RES002",
    customer_name: "Emma Davis",
    customer_phone: "+1 234-567-8901",
    party_size: 2,
    date: "2024-03-20",
    time: "20:00",
    special_requests: "",
    status: "pending",
    created_at: "2024-03-15T11:00:00Z",
  },
  {
    id: 3,
    reservation_id: "RES003",
    customer_name: "Michael Johnson",
    customer_phone: "+1 234-567-8902",
    party_size: 6,
    date: "2024-03-21",
    time: "18:30",
    special_requests: "Birthday celebration",
    status: "confirmed",
    created_at: "2024-03-15T12:30:00Z",
  },
  {
    id: 4,
    reservation_id: "RES004",
    customer_name: "Sarah Wilson",
    customer_phone: "+1 234-567-8903",
    party_size: 3,
    date: "2024-03-19",
    time: "19:30",
    special_requests: "Allergic to nuts",
    status: "seated",
    created_at: "2024-03-15T09:30:00Z",
  },
  {
    id: 5,
    reservation_id: "RES005",
    customer_name: "David Brown",
    customer_phone: "+1 234-567-8904",
    party_size: 2,
    date: "2024-03-19",
    time: "20:30",
    special_requests: "",
    status: "cancelled",
    created_at: "2024-03-15T10:15:00Z",
  },
];

export default function Reservations() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleStatusUpdate = async (reservationId, newStatus) => {
    // In a real app, this would make an API call
    toast.success(`Reservation status updated to ${RESERVATION_STATUSES[newStatus].name}`);
  };

  const handleAddReservation = (newReservation) => {
    // In a real app, this would make an API call
    console.log("New reservation:", newReservation);
    toast.success("Reservation created successfully");
  };

  const filteredReservations = DEMO_RESERVATIONS.filter((reservation) => {
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    const matchesSearch =
      reservation.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.reservation_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reservations</h1>
          <p className="mt-2 text-sm text-gray-700">Manage and track table reservations</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-400 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          New Reservation
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
              {Object.entries(RESERVATION_STATUSES).map(([value, { name }]) => (
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
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-200 text-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party Size
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
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  onClick={() => setSelectedReservation(reservation)}
                  className="cursor-pointer hover:bg-dark-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{reservation.reservation_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reservation.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(`${reservation.date}T${reservation.time}`).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reservation.party_size} people
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        RESERVATION_STATUSES[reservation.status].color
                      }`}
                    >
                      {RESERVATION_STATUSES[reservation.status].name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={reservation.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(reservation.id, e.target.value);
                      }}
                      className="rounded-md border-gray-200 text-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      {Object.entries(RESERVATION_STATUSES).map(([value, { name }]) => (
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
        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Reservation Form */}
      <ReservationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddReservation}
      />
    </div>
  );
}
