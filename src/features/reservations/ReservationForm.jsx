import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

// Demo data for available time slots
const TIME_SLOTS = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

export default function ReservationForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    party_size: "",
    date: "",
    time: "",
    special_requests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.customer_name ||
      !formData.customer_phone ||
      !formData.party_size ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new reservation object
    const newReservation = {
      ...formData,
      reservation_id: `RES${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    onSubmit(newReservation);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      customer_name: "",
      customer_phone: "",
      party_size: "",
      date: "",
      time: "",
      special_requests: "",
    });
    onClose();
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      New Reservation
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      {/* Customer Details */}
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="customer_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Customer Name *
                          </label>
                          <input
                            type="text"
                            id="customer_name"
                            required
                            value={formData.customer_name}
                            onChange={(e) =>
                              setFormData({ ...formData, customer_name: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="customer_phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="customer_phone"
                            required
                            value={formData.customer_phone}
                            onChange={(e) =>
                              setFormData({ ...formData, customer_phone: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      {/* Reservation Details */}
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        <div>
                          <label
                            htmlFor="party_size"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Party Size *
                          </label>
                          <select
                            id="party_size"
                            required
                            value={formData.party_size}
                            onChange={(e) =>
                              setFormData({ ...formData, party_size: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          >
                            <option value="">Select size</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                              <option key={size} value={size}>
                                {size} {size === 1 ? "person" : "people"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date *
                          </label>
                          <input
                            type="date"
                            id="date"
                            required
                            min={today}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Time *
                          </label>
                          <select
                            id="time"
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          >
                            <option value="">Select time</option>
                            {TIME_SLOTS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label
                          htmlFor="special_requests"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Special Requests
                        </label>
                        <textarea
                          id="special_requests"
                          rows={3}
                          value={formData.special_requests}
                          onChange={(e) =>
                            setFormData({ ...formData, special_requests: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Any special requests or notes..."
                        />
                      </div>

                      {/* Form Actions */}
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-primary-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:ml-3 sm:w-auto"
                        >
                          Create Reservation
                        </button>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-dark-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
