import sidebarItems from "./sidebarItems";

function Sidebar({
  setComp,
  currComp,
}: {
  setComp: (comp: string) => void;
  currComp: string;
}) {
  return (
    <aside className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 md:relative md:h-full">
      <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Dashboard</h2>
      <nav>
        <ul className="flex md:flex-col md:space-y-1 justify-around md:justify-start">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setComp(item.name)}
                className={`${
                  currComp === item.name ? "bg-gray-700" : ""
                } flex flex-col md:flex-row items-center md:w-full text-lg py-2 px-4 rounded-md hover:bg-gray-700 transition-colors`}
              >
                <item.icon className="md:mr-3" size={24} />
                <span className="text-xs md:text-lg">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;