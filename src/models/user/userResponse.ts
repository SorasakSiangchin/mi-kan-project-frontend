import { RoleResponse } from "../roles/roleResponse";
import { SchoolResponse } from "../schools/schoolResponse";

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