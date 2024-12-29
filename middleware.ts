import { auth } from "./auth"
 
export default auth

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tournament/register/:path*",
    "/api/register-form/:path*",
  ]
}