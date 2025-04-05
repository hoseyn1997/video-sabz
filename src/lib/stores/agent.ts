import { response } from "@/lib/types/apiResponse";
import { userLogginInfo, x_user } from "@/lib/types/user";
import {
  liking_result,
  saving_result,
  userVideoInteraction,
  videoWithCollection,
} from "@/lib/types/video";
import axios, { AxiosError, AxiosResponse } from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { teacher_follow_result } from "../types/teacher";
import { Comment } from "@prisma/client";

axios.defaults.baseURL = process.env.Next_APP_API_URL;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  // const token = store.commonStore.token;
  // if (token && config.headers) {
  //     config.headers.Authorization = `Bearer ${token}`
  // };

  // temporary:
  // var userIdentifier = localStorage.getItem("userIdentifier")
  // if (userIdentifier)
  //     config.headers["userIdentifier"] = userIdentifier;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // if (process.env.NODE_ENV === 'development')
    // await sleep(5000);
    /** pagination ifo */
    // const pagination = response.headers['pagination'];
    // if (pagination) {
    //     response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    //     return response as AxiosResponse<PaginatedResult<any>>;
    // }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.push("/not-found");
        } else if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error("درخواست ناشناخته");
        }
        break;
      case 401:
        toast.error("کاربر ناشناخته");
        break;
      case 403:
        toast.error("غیر مجاز");
        break;
      case 404:
        router.push("/not-found");
        break;
      case 500:
        router.push("/server-error");
        break;
    }
    return Promise.reject(error);
  },
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const users = {
  login: (info: userLogginInfo) =>
    requests.post<response<x_user>>("/api/login", info),
  logOut: () => requests.post<response<x_user>>("/api/logout", {}),
};

const collections = {
  save: (collectionId: string) =>
    requests.post(`/api/collection/save?collectionId=${collectionId}`, {}),
};

const videos = {
  list: (currentPage: number, ITEMS_PER_PAGE: number) =>
    requests.get<videoWithCollection[]>(
      `/api/video/list?page=${currentPage}&ITEMS_PER_PAGE=${ITEMS_PER_PAGE}`,
    ),
  info: (videoId: string) =>
    requests.get<userVideoInteraction>(`/api/video/info?videoId=${videoId}`),
  like: (videoId: string) =>
    requests.post<liking_result>(`/api/video/like?videoId=${videoId}`, {}),
  save: (videoId: string) =>
    requests.post<saving_result>(`/api/video/save?videoId=${videoId}`, {}),
  followTeacher: (teacherId: string) =>
    requests.post<teacher_follow_result>(
      `/api/video/teacher/follow?teacherId=${teacherId}`,
      {},
    ),
  comment: (videoId: string, commentBody: string) =>
    requests.post<Comment>(`/api/video/comment?videoId=${videoId}`, {
      body: commentBody,
    }),
  comments: (videoId: string) =>
    requests.get<{ comments: Comment[] }>(
      `/api/video/comment/list?videoId=${videoId}`,
    ),
  delete: (videoId: string) =>
    requests.del(`/api/video/delete?videoId=${videoId}`),
};

const dash = {
  deleteTeacher: (teacherId: string) =>
    requests.del(`/api/dash/remove-teacher?teacherId=${teacherId}`),
};

const agent = {
  users,
  collections,
  videos,
  dash,
};
export default agent;
