import { useState } from "react";
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MenuItemForm from "../features/menu/MenuItemForm";
import MenuItemCard from "../features/menu/MenuItemCard";

// Dummy data for menu items
const DUMMY_MENU_ITEMS = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomato, and our special sauce",
    price: 12.99,
    category_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    status: "Available",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on our homemade crust",
    price: 14.99,
    category_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    status: "Popular",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
    price: 9.99,
    category_id: 3,
    image_url:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    status: "New",
  },
];

// Dummy data for categories with colors
const DUMMY_CATEGORIES = [
  { id: 1, name: "Burgers", color: "amber" },
  { id: 2, name: "Pizza", color: "rose" },
  { id: 3, name: "Salads", color: "emerald" },
  { id: 4, name: "Drinks", color: "blue" },
  { id: 5, name: "Desserts", color: "purple" },
];

export default function Menu() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = DUMMY_MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category_id === parseInt(selectedCategory);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="-mx-4 px-4 py-6 sm:mx-0 sm:rounded-lg shadow-md">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Menu Items</h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your restaurant's menu items and categories
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-400 rounded-md text-sm font-medium text-white hover:bg-primary-500 transition-colors duration-200"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-200 text-sm text-gray-900 bg-dark-50 hover:bg-dark-50/80 transition-colors duration-200 p-2 focus-visible:outline-none"
            >
              <option value="all">All Categories</option>
              {DUMMY_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items..."
              className="pl-10 block w-full rounded-lg border-gray-200 text-sm text-gray-900 bg-dark-50 hover:bg-dark-50/80 transition-colors duration-200 p-2 focus-visible:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {(selectedCategory !== "all" || searchQuery) && (
        <div className="text-sm text-gray-500">
          Showing {filteredItems.length} items
          {selectedCategory !== "all" && (
            <span className="font-medium text-gray-900">
              {" "}
              in {DUMMY_CATEGORIES.find((c) => c.id === parseInt(selectedCategory))?.name}
            </span>
          )}
          {searchQuery && (
            <span className="font-medium text-gray-900"> matching "{searchQuery}"</span>
          )}
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            category={DUMMY_CATEGORIES.find((c) => c.id === item.category_id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      <MenuItemForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        categories={DUMMY_CATEGORIES}
      />
    </div>
  );
}
