import Sidebar from "../../components/sidebar/sidebar";
import AdminSection from "../../components/admin/adminSection";
import { useState } from "react";

function Dashboard() {
  const [component, setComponent] = useState("users");
  return (
    <>
      <aside className="sm:w-1/4 bg-gray-800 text-white p-4 md:w-1/5 lg:w-1/6">
        <Sidebar setComp={setComponent} currComp={component} />
      </aside>

      <section className="sm:flex-1 p-6 overflow-y-auto">
        <small className="text-red-400">
          This uses browser based IndexedDB to add a user first add permissions
          then role and you can add new users{" "}
        </small>
        <AdminSection component={component} />
      </section>
    </>
  );
}

export default Dashboard;
