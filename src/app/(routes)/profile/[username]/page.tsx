import { prisma } from "@/lib/db/db";
import { Metadata } from "next";
import React from "react";
import ChangeTheme from "@/app/(routes)/profile/components/changeTheme";
import LogOut from "@/app/(routes)/profile/components/logOut";
import AdminItems from "../components/admin/admin_items";
import ItemsHeader from "../components/items_header";
import ContentHeader from "../components/content_header";
import UserItems from "../components/user/user_items";
import {
  AdminContents,
  UserMainContents,
} from "@/app/(routes)/profile/components/content";
import {
  Dashboard_item_StylingOPtions,
  DashboardMainItems_admin,
  DashboardMainItems_user,
  SearchParameters_admin,
  SearchParameters_user,
} from "@/app/(routes)/profile/components/dashboard";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = await params;
  return {
    title: `Profile of ${username} - ویدیو سبز`,
    description: `This is the profile page for ${username}.`,
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { username } = await params;

  let searchParameters: SearchParameters_admin | undefined = undefined;
  let searchParameters_user: SearchParameters_user | undefined = undefined;

  let info;
  let menue_is_open;

  const searchParameters_info = await searchParams;

  if (username === "admin" && searchParameters_info) {
    searchParameters = searchParameters_info;
    if (searchParameters && searchParameters.tab)
      info = AdminContents[searchParameters.tab];
    switch (searchParameters.menue) {
      case "true":
        menue_is_open = true;
        break;
      default:
        menue_is_open = false;
    }
  } else {
    searchParameters_user = searchParameters_info;
    if (searchParameters_user && searchParameters_user.tab)
      info = UserMainContents[searchParameters_user.tab];
    switch (searchParameters_user.menue) {
      case "true":
        menue_is_open = true;
        break;
      default:
        menue_is_open = false;
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      UserName: username,
    },
    include: {
      Photo: {
        include: {
          Photo: true,
        },
      },
      Collections: true,
    },
  });

  const handle_tab_select_admin = (
    tabName: DashboardMainItems_admin,
    option?: Dashboard_item_StylingOPtions
  ) => {
    if (option == "icon")
      return searchParameters?.tab === tabName
        ? "w-6 stroke-teal-500 stroke-2"
        : "w-6 stroke-gray-500 stroke-2";

    if (option == "info")
      return searchParameters?.tab === tabName
        ? "text-sm hidden md:flex text-teal-500 font-[500] truncate"
        : "text-sm hidden md:flex text-gray-500 dark:text-gray-400 font-[500] truncate";

    if (option == "link")
      return `/profile/${user?.UserName}?tab=${tabName}&content=${
        searchParameters?.content
      }&menue=${searchParameters?.menue == "true" ? "true" : "false"}`;

    return `/profile/${user?.UserName}?tab=${tabName}&content=${
      searchParameters?.content
    }&menue=${searchParameters?.menue == "true" ? "true" : "false"}`;
  };
  const handle_tab_select_user = (
    tabName: DashboardMainItems_user,
    option?: Dashboard_item_StylingOPtions
  ) => {
    if (option == "icon")
      return searchParameters_user?.tab === tabName
        ? "w-6 stroke-teal-500 stroke-2"
        : "w-6 stroke-gray-500 stroke-2";

    if (option == "info")
      return searchParameters_user?.tab === tabName
        ? "text-sm hidden md:flex text-teal-500 font-[500] truncate"
        : "text-sm hidden md:flex text-gray-500 dark:text-gray-400 font-[500] truncate";

    if (option == "link")
      return `/profile/${user?.UserName}?tab=${tabName}&content=${
        searchParameters_user?.content
      }&menue=${searchParameters_user?.menue == "true" ? "true" : "false"}`;

    return `/profile/${user?.UserName}?tab=${tabName}&content=${
      searchParameters_user?.content
    }&menue=${searchParameters_user?.menue == "true" ? "true" : "false"}`;
  };

  return (
    <div className="maxContainer:max-w-screen-container mx-auto">
      <div className="mx-auto min-h-48 md:rounded-3xl grid grid-cols-12 px-3 my-0 maxContainer:my-14 md:shadow-none maxContainer:shadow-[0px_0px_46px_0px_#86868638]">
        {menue_is_open && (
          <div className="block md:col-span-3 lg:col-span-2 min-h-48 shadow-[1px_0px_0px_0px_#8080802b] dark:shadow-[1px_0px_0px_0px_#8080805e] py-10 pt-4 px-2 md:px-5 fixed left-0 md:relative bg-white dark:bg-dark z-10">
            <ItemsHeader
              username={username}
              searchParameters={
                username === "admin"
                  ? searchParameters!
                  : searchParameters_user!
              }
            />
            {username === "admin" ? (
              <AdminItems
                searchParameters={searchParameters!}
                handle_tab_select_admin={handle_tab_select_admin}
              />
            ) : (
              <UserItems
                SearchParameters_user={searchParameters_user!}
                handle_tab_select_user={handle_tab_select_user}
              />
            )}
            <div className="mt-10 py-5 grid gap-5 px-3 shadow-[0px_-1px_0px_0px_#8080802b] dark:shadow-[0px_-1px_0px_0px_gray]">
              <ChangeTheme />
              <LogOut />
            </div>
          </div>
        )}
        <div
          className={
            menue_is_open
              ? "col-span-12 md:col-span-9 min-h-48 py-2"
              : "col-span-12 md:col-span-12 minh-48 py-2"
          }
        >
          <ContentHeader
            username={username}
            searchParameters={
              username === "admin" ? searchParameters! : searchParameters_user!
            }
          />
          <div className="py-4 lg:px-2">{info}</div>
        </div>
      </div>
    </div>
  );
}
