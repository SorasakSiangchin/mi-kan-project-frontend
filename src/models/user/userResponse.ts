import { SchoolResponse } from "../schools/schoolResponse";
import { RoleResponse } from "./roleResponse";

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    email: string;
    password: string;
    phoneNumber: string;
    schoolId: string;
    roleId: string;
    role: RoleResponse;
    school: SchoolResponse;
}