import axios from "axios";

export function getProfile() {
  return axios.get("http://localhost:4001/api/auth/profile");
}

export function loginWithGoogle() {
  window.open("http://localhost:4001/api/auth/google", "_self");
}

export function loginWithGithub() {
  window.open("http://localhost:4001/api/auth/github", "_self");
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
