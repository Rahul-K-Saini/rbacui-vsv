import { X } from "@phosphor-icons/react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import { useLiveQuery } from "dexie-react-hooks";

const AddUserModal = ({
  setShowAddUser,
}: {
  setShowAddUser: Dispatch<SetStateAction<boolean>>;
}) => {
  const roles = useLiveQuery(() => db.roles.toArray());

  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    toast.loading("Adding...", { id: "user" });
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const id = await db.users.add({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as string,
      });
      toast.success("Added...", { id: "user" });
      console.log(id);
      setShowAddUser(false);
    } catch (error) {
      toast.error("Failed to add user", { id: "user" });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button
            className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
            onClick={() => setShowAddUser(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={(e) => handleAddUser(e)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border rounded-md focus:outline-none bg-white"
            >
              <option value="">Select a role</option>
              {roles?.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowAddUser(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;