import UserSection from "./userSection.tsx";
import PermissionsSection from "./permissionSection.tsx";
import RolesSection from "./rolesSection.tsx";

function AdminSection({ component }: { component: string }) {
  const renderComponent = () => {
    switch (component) {
      case "users":
        return <UserSection />;
      case "roles":
        return <RolesSection />;
      case "permissions":
          return <PermissionsSection/>
      default:
        return <div>Select a valid Component</div>;
    }
  };

  return <div>{renderComponent()}</div>;
}

export default AdminSection;
