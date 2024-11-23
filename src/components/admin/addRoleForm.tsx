import { X } from "@phosphor-icons/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import { useLiveQuery } from "dexie-react-hooks";

const AddRoleModal = ({
  setShowAddRole,
}: {
  setShowAddRole: Dispatch<SetStateAction<boolean>>;
}) => {
  const [permissionsArr, setPermissionsArr] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");

  const permissions = useLiveQuery(()=>db.permissions.toArray())

  const handleAddRole = async (e: FormEvent) => {
    e.preventDefault();
    if (!roleName || permissionsArr.length === 0) {
      toast.error("Please fill all required fields", { id: "role" });
      return;
    }
    toast.loading("Adding...", { id: "role" });
    try {
      const id = await db.roles.add({
        name: roleName,
        permissions: permissionsArr,
      });
      toast.success("Role added successfully", { id: "role" });
      console.log(id);
      setShowAddRole(false);
    } catch (error) {
      toast.error("Failed to add role", { id: "role" });
      console.error(error);
    }
  };

  const handlePermissionChange = (permission: string) => {
    if (permissionsArr.includes(permission)) {
      setPermissionsArr(permissionsArr.filter((p) => p !== permission));
    } else {
      setPermissionsArr([...permissionsArr, permission]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Role</h2>
          <button
            className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
            onClick={() => setShowAddRole(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={(e) => handleAddRole(e)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role Name
            </label>
            <input
              type="text"
              id="name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permissions
            </label>
            <div className="space-y-2">
              {permissions?.map((permission,index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={String(permission.id)}
                    checked={permissionsArr.includes(permission.name)}
                    onChange={() => handlePermissionChange(permission.name)}
                    className="mr-2"
                  />
                  <label htmlFor={permission.name}>{permission.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowAddRole(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;