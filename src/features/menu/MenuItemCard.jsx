import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import MenuItemForm from "./MenuItemForm";
import toast from "react-hot-toast";

export default function MenuItemCard({ item, category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // In a real app, this would make an API call
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  // Fallback image in case of load error
  const fallbackImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Image Container with fixed aspect ratio */}
        <div className="relative h-48 rounded-t-lg overflow-hidden">
          <img
            src={imageError ? fallbackImage : item.image_url}
            onError={() => setImageError(true)}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
              {category?.name}
            </span>
          </div>
          {/* Price Badge */}
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-primary-800 backdrop-blur-sm">
              ${item.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {item.name}
            </h3>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{item.description}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              <PencilIcon className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200"
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      <MenuItemForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        item={item}
        category={category}
      />
    </>
  );
}
