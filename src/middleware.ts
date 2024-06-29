import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { ACCESS_TOKEN_KEY } from "./utils/constant";

const middleware = (request: NextRequest): NextResponse => {
    const cookieStore = cookies();
    const accessTokenKey = cookieStore.get(ACCESS_TOKEN_KEY);
    const path = request.nextUrl.pathname;

    if (accessTokenKey && accessTokenKey.value) {

        if (path == "/login" || path == "/register" || path == "/") {
            return NextResponse.redirect(new URL("/home", request.url));
        }

        return NextResponse.next({
            request,
        });
    }
    else if (path != "/login" && path != "/register" && path != "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next({
        request
    });

};

export default middleware;

export const config = {
    matcher: [
        "/",
        "/login/:path*",
        "/register/:path*",
        "/home/:path*",
        "/ability/:path*",
        "/profile/:path*",
        "/student/:path*"
    ],
};