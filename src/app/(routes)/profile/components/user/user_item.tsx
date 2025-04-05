import Link from "next/link";
import React from "react";
import { customIcons, Icons } from "@/app/components/ui/icons/Icons";
import { DashboardMainItems_user, SearchParameters_user } from "@/app/(routes)/profile/components/dashboard";

interface Props {
  id: string;
  name: DashboardMainItems_user;
  title: string;
  icon: customIcons;
  SearchParameters_user: SearchParameters_user;
  handle_tab_select_user: (
    tabName: DashboardMainItems_user,
    option?: "icon" | "info" | "link"
  ) => string;
}

const UserItem = ({
  id,
  name,
  title,
  icon,
  SearchParameters_user,
  handle_tab_select_user,
}: Props) => {
  const iconed = Icons[icon];
  return (
    <Link
      id={id}
      href={handle_tab_select_user(name)}
      className="flex items-center gap-2 cursor-pointer"
    >
      {SearchParameters_user.tab == name && (
        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
      )}
      {iconed({ className: handle_tab_select_user(name, "icon") })}
      <span className={handle_tab_select_user(name, "info")}>{title}</span>
    </Link>
  );
};

export default UserItem;
