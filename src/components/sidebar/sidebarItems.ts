import { User, Bookmark, FlagBanner } from "@phosphor-icons/react";

type SidebarItem = {
    name: string;
    icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
    {
        name: "users",
        icon: User
    },
    {
        name: "roles",
        icon: Bookmark
    },
    {
        name: "permissions",
        icon: FlagBanner
    }
];

export default sidebarItems;