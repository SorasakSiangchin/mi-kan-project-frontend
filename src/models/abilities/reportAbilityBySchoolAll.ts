import { ReportAbilityMultipleIntelligence } from "./reportAbilityMultipleIntelligences";

export interface ReportAbilityBySchoolAll {
    id: string;
    schoolNameTh: string;
    schoolNameEn: string;
    address: string;
    email: string;
    phoneNumber: string;
    // พหุปัญญา 8 ด้าน
    reportAbilityMultipleIntelligences: ReportAbilityMultipleIntelligence[];
    studentAmountAll: number;
}