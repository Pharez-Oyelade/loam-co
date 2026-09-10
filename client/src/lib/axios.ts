import axios from "axios";
import { LOGIN_PATHS } from "./auth-paths";

// let featchCurrentUser opt out of global redirect

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    const status = error.response?.status;

    if (status === 401 && !error.config.skipAuthRedirect) {
      const loginPath = window.location.pathname.includes("admin")
        ? LOGIN_PATHS.admin
        : LOGIN_PATHS.customer;
      window.location.replace(loginPath);
    }

    return Promise.reject(new Error(message));
  },
);

export default api;
