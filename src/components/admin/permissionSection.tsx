import { useState } from "react";
import { db } from "../../lib/db";
import { PlusCircle, LockSimple, TrashSimple } from "@phosphor-icons/react";
import { useLiveQuery } from "dexie-react-hooks";
import toast from "react-hot-toast";
import AddPermissionModal from "./addPermissionForm";

export default function PermissionsSection() {
  const [showAddPermission, setShowAddPermission] = useState(false);

  const permissions = useLiveQuery(() => db.permissions.toArray()) || [
    { id: 1, name: "read" },
    { id: 2, name: "write" },
    { id: 3, name: "delete" },
  ];

  const handleDeletePermission = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this permission?"
    );

    if (!isConfirmed) return;

    toast.loading("Deleting...", { id: "permission" });
    try {
      await db.permissions.delete(id);
      toast.success("Deleted", { id: "permission" });
    } catch (e) {
      toast.error("Error deleting", { id: "permission" });
      console.log(e);
    }
  };

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 bg-gray-50 min-h-screen">
      {showAddPermission && (
        <AddPermissionModal setShowAddPermission={setShowAddPermission} />
      )}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Permission Management
          </h2>
          <button
            onClick={() => setShowAddPermission(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add new permission
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {permissions.map((permission) => (
                  <tr
                    key={permission.id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {permission.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <LockSimple className="mr-3 h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {permission.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeletePermission(permission.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashSimple className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
