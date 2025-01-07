import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function MenuItemForm({ isOpen, onClose, item, categories }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category_id: item.category_id.toString(),
        image_url: item.image_url,
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.price || !formData.category_id) {
        throw new Error("Please fill in all required fields");
      }

      console.log("Submitting:", {
        ...formData,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id),
      });

      toast.success(item ? "Item updated successfully" : "Item created successfully");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "",
      image_url: "",
    });
    onClose();
  };

  const inputClasses =
    "mt-1 block w-full rounded-md bg-dark-50 border-0 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm p-2 focus-visible:outline-none";

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
                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {item ? "Edit Menu Item" : "Add Menu Item"}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className={inputClasses}
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows={3}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, description: e.target.value }))
                          }
                          className={inputClasses}
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price *
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id="price"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, price: e.target.value }))
                            }
                            className={`${inputClasses} pl-7`}
                            required
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category *
                        </label>
                        <select
                          id="category"
                          value={formData.category_id}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, category_id: e.target.value }))
                          }
                          className={inputClasses}
                          required
                        >
                          <option value="">Select a category</option>
                          {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Image URL */}
                      <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                          Image URL
                        </label>
                        <input
                          type="url"
                          id="image"
                          value={formData.image_url}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                          }
                          className={inputClasses}
                        />
                      </div>

                      {/* Form Actions */}
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-primary-400 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors duration-200 sm:ml-3 sm:w-auto"
                        >
                          {item ? "Update" : "Create"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-dark-50 transition-colors duration-200 sm:mt-0 sm:w-auto"
                          onClick={handleClose}
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
