import React from "react";
import AdminItem from "./admin_item";
import {
  DashboardMainItems_admin,
  SearchParameters_admin,
} from "@/app/(routes)/profile/components/dashboard";

interface Props {
  searchParameters: SearchParameters_admin;
  handle_tab_select_admin: (
    tabName: DashboardMainItems_admin,
    option?: "icon" | "info" | "link"
  ) => string;
}

const AdminItems = ({ searchParameters, handle_tab_select_admin }: Props) => {
  return (
    <div className="grid gap-5 mb-10 px-3">
      <AdminItem
        id="dashboard"
        name="dashboard"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="dashboard"
        searchParameters={searchParameters}
        title="داشبورد"
      />
      <AdminItem
        id="add_teacher"
        name="add_teacher"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="add_user"
        searchParameters={searchParameters}
        title="ایجاد مدرس"
      />
      <AdminItem
        id="m_teachers"
        name="m_teachers"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="graduate"
        searchParameters={searchParameters}
        title="مدیریت مدرسین"
      />
      {/* <AdminItem
        id="add_collection"
        name="add_collection"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="add"
        searchParameters={searchParameters}
        title="ایجاد کالکشن"
      /> */}
      <AdminItem
        id="m_collections"
        name="m_collections"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="video_list"
        searchParameters={searchParameters}
        title="مدیریت کالکشن ها"
      />
      <AdminItem
        id="add_blog"
        name="add_blog"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="add_image"
        searchParameters={searchParameters}
        title="ایجاد وبلاگ"
      />
      <AdminItem
        id="m_blogs"
        name="m_blogs"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="badge_check"
        searchParameters={searchParameters}
        title="مدیریت وبلاگ ها"
      />
      <AdminItem
        id="m_users"
        name="m_users"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="search_users"
        searchParameters={searchParameters}
        title="مدیریت کاربران"
      />
      <AdminItem
        id="m_transactions"
        name="m_transactions"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="arrow_left_right"
        searchParameters={searchParameters}
        title="مدیریت تراکنشها"
      />
      <AdminItem
        id="m_notifs"
        name="m_notifs"
        handle_tab_select_admin={handle_tab_select_admin}
        icon="bell"
        searchParameters={searchParameters}
        title="مدیریت اعلان ها"
      />
    </div>
  );
};

export default AdminItems;
