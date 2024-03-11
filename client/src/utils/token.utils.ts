export function extractTokenFromCookie(): string | undefined {
  return document.cookie
    .split(";")
    .find((cookie) => cookie.includes("jwt"))
    ?.split("=")[1];
}
