export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/session", "/dashboard", "/dashboard/:path*"],
};
