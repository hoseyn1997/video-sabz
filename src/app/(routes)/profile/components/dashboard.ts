export type DashboardMainItems_admin =
  | "dashboard"
  // | "add_collection"
  | "add_blog"
  | "m_collections"
  | "m_blogs"
  | "add_teacher"
  | "m_teachers"
  | "m_users"
  | "m_transactions"
  | "m_notifs";
export type DashboardSubItems_admin = "";
export type DashboardMainItems_user =
  | "dashboard"
  | "content"
  | "m_courses"
  | "m_comments"
  | "settings"
  | "m_transactions"
  | "m_notifs";
export type DashboardSubItems_user =
  | "play_list"
  | "see_later"
  | "liked"
  | "saved_collection"
  | "saved_video";

export type Dashboard_item_StylingOPtions = "icon" | "info" | "link";


export interface SearchParameters_admin {
    tab?: DashboardMainItems_admin;
    menue?: string | string[] | undefined;
    submenue?: string | string[] | undefined;
    content?: string | string[] | undefined;
  }
  export interface SearchParameters_user {
    tab?: DashboardMainItems_user;
    menue?: string | string[] | undefined;
    submenue?: string | string[] | undefined;
    content?: string | string[] | undefined;
  }