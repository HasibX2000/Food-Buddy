import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function OrderDetails({ isOpen, onClose, order }) {
  if (!order) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Order #{order.order_id}
                    </Dialog.Title>

                    <div className="mt-4 space-y-6">
                      {/* Customer Information */}
                      <div>
                        <h4 className="font-medium text-gray-900">Customer Details</h4>
                        <dl className="mt-2 text-sm text-gray-500">
                          <div className="mt-1">
                            <dt className="inline">Name: </dt>
                            <dd className="inline">{order.customer_name}</dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Phone: </dt>
                            <dd className="inline">{order.customer_phone}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900">Order Items</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <li key={item.id} className="py-2">
                              <div className="flex justify-between text-sm">
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {item.quantity}x{" "}
                                  </span>
                                  <span className="text-gray-500">{item.name}</span>
                                </div>
                                <span className="text-gray-500">${item.price.toFixed(2)}</span>
                              </div>
                              {item.notes && (
                                <p className="mt-1 text-xs text-gray-500">Note: {item.notes}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="font-medium text-gray-900">Order Summary</h4>
                        <dl className="mt-2 text-sm text-gray-500">
                          <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd>${order.subtotal.toFixed(2)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt>Tax</dt>
                            <dd>${order.tax.toFixed(2)}</dd>
                          </div>
                          <div className="flex justify-between font-medium text-gray-900">
                            <dt>Total</dt>
                            <dd>${order.total.toFixed(2)}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
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
