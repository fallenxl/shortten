import { extractTokenFromCookie } from "@/utils";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const AxiosInterceptor = () => {
  const updateHeaders = (config: AxiosRequestConfig) => {
    const token = extractTokenFromCookie();
    
    if (!token) {
      return config;
    }
    const newHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    config.headers = newHeaders;
    return config;
  };
  axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.url?.includes("login")) {
      return config;
    }
    return updateHeaders(config) as InternalAxiosRequestConfig;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return error.response.data.message.split("::")[1];
    }
  );
};
