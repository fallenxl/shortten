export function extractTokenFromCookie(): string | undefined {
  return document.cookie
    .split(";")
    .find((cookie) => cookie.includes("data.token"))
    ?.split("=")[1];
}
