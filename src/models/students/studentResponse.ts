import { ClassRoomResponse } from "../classRooms/classRoomResponse";
import { ClassResponse } from "../classes/classResponse";
import { GenderResponse } from "../genders/genderResponse";
import { SchoolYearResponse } from "../schoolYears/schoolYearResponse";
import { SchoolResponse } from "../schools/schoolResponse";
import { TermResponse } from "../terms/termResponse";

export interface StudentResponse {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    birthday: Date;
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
    createdAt: Date;
    createdBy: null;
    updatedAt: null;
    updatedBy: null;
    isActive?: boolean;
    school: SchoolResponse;
    class: ClassResponse;
    classRoom: ClassRoomResponse;
    schoolYear: SchoolYearResponse;
    term: TermResponse;
    gender: GenderResponse;
}