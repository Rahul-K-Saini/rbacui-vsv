"use client";

import { useState } from "react";
import { db } from "../../lib/db";
import {
  PlusCircle,
  EnvelopeSimple,
  User as UserIcon,
  TrashSimple,
} from "@phosphor-icons/react";
import { useLiveQuery } from "dexie-react-hooks";
import AddUserForm from "./addUserForm";
import toast from "react-hot-toast";

export default function Users() {
  const [showAddUser, setShowAddUser] = useState(false);

  const roles = useLiveQuery(() => db.roles.toArray());
  const users = useLiveQuery(() => db.users.toArray()) || [
    { id: 1, name: "rahul", email: "rahul545436@gmail.com", role: "admin" },
  ];

  const handleRoleChange = async (userId: number, newRole: string) => {
    toast.loading("Updating...", { id: "user" });

    try {
      await db.users.update(userId, {
        role: newRole as "admin" | "editor" | "viewer",
      });
      toast.success("Updated", { id: "user" });
    } catch (error) {
      toast.error("Failed to update user role", { id: "user" });
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    toast.loading("Deleting...", { id: "user" });
    try {
      await db.users.delete(id);
      toast.success("Deleted", { id: "user" });
    } catch (e) {
      toast.error("Error deleting", { id: "user" });
      console.log(e);
    }
  };

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 bg-gray-50 min-h-screen">
      {showAddUser && <AddUserForm setShowAddUser={setShowAddUser} />}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            User Management
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAddUser(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add new user
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
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <EnvelopeSimple className="mr-3 h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md "
                      >
                        {roles?.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name.charAt(0).toUpperCase() +
                              role.name.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashSimple className="h-5 w-5" />
                        </button>
                      </div>
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
