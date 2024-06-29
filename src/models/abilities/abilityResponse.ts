import { MultipleIntelligencesResponse } from "../multipleIntelligences/multipleIntelligencesResponse";
import { StudentResponse } from "../students/studentResponse";

export interface AbilityResponse {
    id: string;
    multipleIntelligencesId: string;
    schoolYear?: string;
    reasonNote: string;
    score?: number;
    studentId: string;
    isActive?: boolean;
    student: StudentResponse;
    multipleIntelligences: MultipleIntelligencesResponse;
}


