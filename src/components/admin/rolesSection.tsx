"use client";

import { useState } from "react";
import { db } from "../../lib/db";
import {
  PlusCircle,
  User as UserIcon,
  TrashSimple,
} from "@phosphor-icons/react";
import { useLiveQuery } from "dexie-react-hooks";
import toast from "react-hot-toast";
import AddRoleModal from "./addRoleForm";

function Roles() {
  const [showAddRole, setShowAddRole] = useState(false);

  const roles = useLiveQuery(() => db.roles.toArray()) || [
    { id: 1, name: "admin", permissions: ["read", "write", "delete"] },
  ];

  const handleDeleteRole = async (id: number) => {
    const confirmDelete = window.confirm("This role might be used by users. Are you sure you want to delete it?");
    if (!confirmDelete) return;

    toast.loading("Deleting...", { id: "role" });
    try {
      await db.roles.delete(id);
      toast.success("Deleted", { id: "role" });
    } catch (e) {
      toast.error("Error deleting", { id: "role" });
      console.log(e);
    }
  };

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 bg-gray-50 min-h-screen">
      {showAddRole && <AddRoleModal setShowAddRole={setShowAddRole} />}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Role Management
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAddRole(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add new role
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles?.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {role.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {Array.isArray(role.permissions)
                          ? role.permissions.join(", ")
                          : role.permissions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        <TrashSimple size={20} />
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

export default Roles;
