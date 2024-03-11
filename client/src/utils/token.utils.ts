export function extractTokenFromCookie(): string | undefined {
  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.includes("jwt"))
    ?.split("=")[1];
  return cookie;
}
