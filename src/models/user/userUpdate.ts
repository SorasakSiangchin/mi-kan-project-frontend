export interface UserUpdate {
    id: string;
    firstName: string;
    lastName: string;
    imageFiles: File[];
    email: string;
    password: string;
    phoneNumber: string;
    schoolId?: string;
    roleId: string;
}

