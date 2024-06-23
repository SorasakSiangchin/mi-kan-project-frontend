import { StudentResponse } from "../students/studentResponse";

export interface ReportAbilityMultipleIntelligence {
    multipleIntelligencesId: string;
    multipleIntelligencesName: string;
    multipleIntelligencesCode?: string;
    percentage: number;
    detail: null;
    students: StudentResponse[];
    studentAmount: number;
}