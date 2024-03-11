import config from "@/config";
import axios from "axios";
import Cookies from 'js-cookie'

export function getProfile() {
  return axios.get(config.API_URL + "api/auth/profile");
}

export function loginWithGoogle() {
  window.open(config.API_URL + "api/auth/google", "_self");
}

export function loginWithGithub() {
  window.open(config.API_URL + "api/auth/github", "_self");
}

export function logout() {
  // remove token from cookies
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.shortten.link; secure; sameSite=None;";
  window.location.reload();
}
