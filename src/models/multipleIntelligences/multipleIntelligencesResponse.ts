import { AbilityResponse } from "../abilities/abilityResponse";

export interface MultipleIntelligencesResponse {
    id: string;
    multipleIntelligencesName: string;
    multipleIntelligencesCode?: string;
    detail: null;
    abilities?: AbilityResponse[];
}
