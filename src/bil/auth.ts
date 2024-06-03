import { UserResponse } from "@/models/user/userResponse";
import { ACCESS_USER_KEY } from "@/utils/constant";
import { cookies } from "next/headers";

// TODO: ยังไม่ได้ใช้งานอะไร
export async function getUserFromSession(): Promise<UserResponse | null> {
    const userInfo = cookies().get(ACCESS_USER_KEY)?.value;
    if (userInfo) {
        return JSON.parse(userInfo) as UserResponse;
    }

    return null;
}