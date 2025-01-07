import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

// Demo menu items for the order form
const DEMO_MENU_ITEMS = [
  { id: 1, name: "Classic Burger", price: 12.99 },
  { id: 2, name: "French Fries", price: 4.99 },
  { id: 3, name: "Coca Cola", price: 2.99 },
  { id: 4, name: "Margherita Pizza", price: 14.99 },
  { id: 5, name: "Caesar Salad", price: 8.99 },
  { id: 6, name: "Chicken Wings", price: 11.99 },
  { id: 7, name: "Garlic Bread", price: 4.99 },
  { id: 8, name: "Sprite", price: 2.99 },
];

export default function OrderForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    items: [],
  });

  const handleAddItem = (menuItem) => {
    const existingItem = formData.items.find((item) => item.id === menuItem.id);

    if (existingItem) {
      setFormData({
        ...formData,
        items: formData.items.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { ...menuItem, quantity: 1, notes: "" }],
      });
    }
  };

  const handleRemoveItem = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== itemId),
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    });
  };

  const handleUpdateNotes = (itemId, notes) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) => (item.id === itemId ? { ...item, notes } : item)),
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSubmit = () => {
    if (!formData.customer_name || !formData.customer_phone) {
      toast.error("Please fill in customer details");
      return;
    }
    if (formData.items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    const { subtotal, tax, total } = calculateTotals();
    const newOrder = {
      ...formData,
      order_id: `ORD${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      status: "pending",
      created_at: new Date().toISOString(),
      subtotal,
      tax,
      total,
    };

    onSubmit(newOrder);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      customer_name: "",
      customer_phone: "",
      items: [],
    });
    onClose();
  };

  const { subtotal, tax, total } = calculateTotals();

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
                      New Order
                    </Dialog.Title>

                    <div className="mt-4 space-y-6">
                      {/* Customer Details */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                            value={formData.customer_name}
                            onChange={(e) =>
                              setFormData({ ...formData, customer_name: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            required
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
                            value={formData.customer_phone}
                            onChange={(e) =>
                              setFormData({ ...formData, customer_phone: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div>
                        <h4 className="font-medium text-gray-900">Add Items</h4>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {DEMO_MENU_ITEMS.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleAddItem(item)}
                              className="text-left px-3 py-2 border rounded-md hover:bg-dark-50"
                            >
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Order Items */}
                      {formData.items.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900">Order Items</h4>
                          <ul className="mt-2 divide-y divide-gray-200">
                            {formData.items.map((item) => (
                              <li key={item.id} className="py-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-gray-500">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex items-center space-x-2">
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(item.id, item.quantity - 1)
                                        }
                                        className="p-1 rounded-md hover:bg-dark-100"
                                      >
                                        <MinusIcon className="h-4 w-4" />
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(item.id, item.quantity + 1)
                                        }
                                        className="p-1 rounded-md hover:bg-dark-100"
                                      >
                                        <PlusIcon className="h-4 w-4" />
                                      </button>
                                      <input
                                        type="text"
                                        placeholder="Add notes..."
                                        value={item.notes}
                                        onChange={(e) => handleUpdateNotes(item.id, e.target.value)}
                                        className="ml-2 flex-1 text-sm border-0 focus:ring-0"
                                      />
                                      <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Order Summary */}
                      {formData.items.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900">Order Summary</h4>
                          <dl className="mt-2 space-y-1 text-sm text-gray-500">
                            <div className="flex justify-between">
                              <dt>Subtotal</dt>
                              <dd>${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Tax (10%)</dt>
                              <dd>${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between font-medium text-gray-900 pt-1">
                              <dt>Total</dt>
                              <dd>${total.toFixed(2)}</dd>
                            </div>
                          </dl>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-primary-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto"
                  >
                    Create Order
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-dark-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
