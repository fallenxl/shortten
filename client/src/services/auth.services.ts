import config from "@/config";
import axios from "axios";

export function getProfile() {
  return axios.get(config.API_URL + "auth/profile");
}

export function loginWithGoogle() {
  window.open(config.API_URL + "auth/google", "_self");
}

export function loginWithGithub() {
  window.open(config.API_URL + "auth/github", "_self");
}

export function logout() {
  // remove token from cookies
  document.cookie.split(";").forEach((cookie) => {
    if (cookie.includes("data.token")) {
      document.cookie = `${cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
  window.location.href = "/";
}
