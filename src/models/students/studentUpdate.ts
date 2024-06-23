export interface StudentUpdate {
    id: string;
    title?: string;
    firstName: string;
    lastName: string;
    imageFiles: File[];
    birthday: any;
    email: string;
    phoneNumber: string;
    address: string;
    idCard: string;
    religion: string;
    hobby: string;
    schoolId: string;
    classId: string;
    classRoomId: string;
    schoolYearId: string;
    termId: string;
    genderId: string;
    isActive: boolean;
}