import React from "react";
import UserItem from "./user_item";
import { DashboardMainItems_user, SearchParameters_user } from "@/app/(routes)/profile/components/dashboard";

interface Props {
  SearchParameters_user: SearchParameters_user;
  handle_tab_select_user: (
    tabName: DashboardMainItems_user,
    option?: "icon" | "info" | "link"
  ) => string;
}

const UserItems = ({
  SearchParameters_user,
  handle_tab_select_user,
}: Props) => {
  return (
    <div className="grid gap-5 mb-10 px-3">
      <UserItem
        id="dashboard"
        name="dashboard"
        handle_tab_select_user={handle_tab_select_user}
        icon="dashboard"
        SearchParameters_user={SearchParameters_user}
        title="داشبورد"
      />
      <UserItem
        id="content"
        name="content"
        handle_tab_select_user={handle_tab_select_user}
        icon="bookmark"
        SearchParameters_user={SearchParameters_user}
        title="مدیریت محتوا"
      />
      <UserItem
        id="m_comments"
        name="m_comments"
        handle_tab_select_user={handle_tab_select_user}
        icon="comments"
        SearchParameters_user={SearchParameters_user}
        title="مدیریت کامنت ها"
      />
      <UserItem
        id="m_courses"
        name="m_courses"
        handle_tab_select_user={handle_tab_select_user}
        icon="clapperboard"
        SearchParameters_user={SearchParameters_user}
        title="مدیریت دوره ها"
      />
      <UserItem
        id="m_notifs"
        name="m_notifs"
        handle_tab_select_user={handle_tab_select_user}
        icon="bell"
        SearchParameters_user={SearchParameters_user}
        title="مدیریت اعلان ها"
      />
      <UserItem
        id="m_transactions"
        name="m_transactions"
        handle_tab_select_user={handle_tab_select_user}
        icon="arrow_left_right"
        SearchParameters_user={SearchParameters_user}
        title="مدیریت تراکنش ها"
      />
      <UserItem
        id="settings"
        name="settings"
        handle_tab_select_user={handle_tab_select_user}
        icon="settings"
        SearchParameters_user={SearchParameters_user}
        title="تنظیمات کاربری"
      />
    </div>
  );
};

export default UserItems;
