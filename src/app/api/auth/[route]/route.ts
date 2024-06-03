import { ServiceResponse } from "@/models/serviceResponse";
import { LoginResponse } from "@/models/user/loginResponse";
import { createFormData } from "@/services/serverService";
import { ACCESS_TOKEN_KEY, ACCESS_USER_KEY } from "@/utils/constant";
import fetchInterceptor from "@/utils/fetchInterceptor";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    context: {
        params: {
            route: string;
        };
    }
): Promise<any> {
    const route = context.params.route;
    const body = await request.json();
    if (route === "login") return login(body);
    else if (route === "logout") return logout(request);
}


async function login(body: {
    email: string;
    password: string;
}): Promise<any> {
    try {
        const response: ServiceResponse<LoginResponse> = await fetchInterceptor.post(`User/Login`, createFormData(body));
        const { data: { token }, success } = response;

        if (success) {
            cookies().set(ACCESS_TOKEN_KEY, token, {
                secure: true,
                sameSite: "strict",
                path: "/",
            });
        }

        return NextResponse.json(response);
    } catch (error: any) {
        console.log("error")
        return NextResponse.json({ result: "error" }, { status: 400 });
    }
};

async function logout(request: NextRequest): Promise<any> {
    const cookieStore = cookies();
    cookieStore.delete(ACCESS_TOKEN_KEY);
    return NextResponse.json("ok");
}