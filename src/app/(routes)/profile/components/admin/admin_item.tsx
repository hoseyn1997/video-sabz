import Link from "next/link";
import React from "react";
import { customIcons, Icons } from "@/app/components/ui/icons/Icons";
import { DashboardMainItems_admin, SearchParameters_admin } from "@/app/(routes)/profile/components/dashboard";

interface Props {
  id: string;
  name: DashboardMainItems_admin;
  title: string;
  icon: customIcons;
  searchParameters: SearchParameters_admin;
  handle_tab_select_admin: (
    tabName: DashboardMainItems_admin,
    option?: "icon" | "info" | "link"
  ) => string;
}

const AdminItem = ({
  id,
  name,
  title,
  icon,
  searchParameters,
  handle_tab_select_admin,
}: Props) => {
  const iconed = Icons[icon];
  return (
    <Link
      id={id}
      href={handle_tab_select_admin(name)}
      className="flex items-center gap-2 cursor-pointer"
    >
      {searchParameters.tab == name && (
        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
      )}
      {iconed({ className: handle_tab_select_admin(name, "icon") })}
      <span className={handle_tab_select_admin(name, "info")}>{title}</span>
    </Link>
  );
};

export default AdminItem;
