import { X } from "@phosphor-icons/react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { db } from "../../lib/db";
import toast from "react-hot-toast";

const AddPermissionModal = ({
  setShowAddPermission,
}: {
  setShowAddPermission: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAddPermission = async (e: FormEvent) => {
    e.preventDefault();
    toast.loading("Adding...", { id: "permission" });
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    try {
      await db.permissions.add({
        name: data.get("name") as string,
      });
      toast.success("Permission added successfully", { id: "permission" });
      setShowAddPermission(false);
    } catch (error) {
      toast.error("Failed to add Permission", { id: "permission" });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Role</h2>
          <button
            className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
            onClick={() => setShowAddPermission(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={(e) => handleAddPermission(e)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Permission
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Permission"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowAddPermission(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPermissionModal;
