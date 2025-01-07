import { useState } from "react";
import { Tab } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import InputField from "../components/common/InputField";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: "Sample Restaurant",
    email: "contact@sample.com",
    phone: "+1 234-567-8900",
    address: "123 Restaurant St, Food City, FC 12345",
    description: "A fine dining experience in the heart of the city.",
  });

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    toast.success("General settings updated successfully");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-10 divide-y divide-dark-200">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-dark-900">Settings</h2>
          <p className="mt-1 text-sm leading-6 text-dark-600">
            Manage your restaurant settings and preferences
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-6 border-b border-dark-200 pt-10">
            {["General", "Tax & Billing", "Notifications", "Integrations"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "border-b-2 pb-4 text-sm font-medium",
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-dark-500 hover:border-dark-300 hover:text-dark-700"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-10">
            {/* General Settings Panel */}
            <Tab.Panel>
              <form onSubmit={handleGeneralSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <InputField
                    label="Restaurant Name"
                    type="text"
                    id="restaurantName"
                    value={generalSettings.restaurantName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        restaurantName: e.target.value,
                      })
                    }
                  />
                  <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={generalSettings.email}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        email: e.target.value,
                      })
                    }
                  />
                  <InputField
                    label="Phone"
                    type="tel"
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        phone: e.target.value,
                      })
                    }
                  />
                  <InputField
                    label="Address"
                    type="text"
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        address: e.target.value,
                      })
                    }
                  />
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-dark-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={generalSettings.description}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            description: e.target.value,
                          })
                        }
                        className="block w-full rounded-md border p-1.5 text-dark-900 shadow-sm placeholder:text-dark-400  sm:text-sm sm:leading-6 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-dark-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Tab.Panel>

            {/* Other Tab Panels... */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
