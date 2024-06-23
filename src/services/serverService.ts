import fetchInterceptor from "@/utils/fetchInterceptor";

export function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key]);
        if (typeof item[key] === "object") {
            for (const data of item[key]) formData.append(key, data);
        }
    };

    return formData;
};

// นักเรียน
const students = {
    getStudentAll: async (schoolId: any) => await fetchInterceptor.get(`Student?schoolId=${schoolId}`),
    getStudentById: async (id: any) => await fetchInterceptor.get(`Student/${id}`),
    getStudents: async (value: any) => await fetchInterceptor.post("Student/GetStudents", value),
    createStudent: async (value: any) => await fetchInterceptor.post("Student/CreateStudent", createFormData(value)),
    updateStudent: async (value: any) => await fetchInterceptor.post("Student/UpdateStudent", createFormData(value))
}

const multipleIntelligences = {
    getMultipleIntelligencesBySchoolId: async (schoolId: any) =>
        await fetchInterceptor.get(`MultipleIntelligences/GetMultipleIntelligencesBySchoolId?schoolId=${schoolId}`),
    getMultipleIntelligences: async () =>
        await fetchInterceptor.get("MultipleIntelligences"),
}

const classRooms = {
    getClassRooms: async () => await fetchInterceptor.get("ClassRoom")
}

const classes = {
    getClasses: async () => await fetchInterceptor.get("Class")
}

const genders = {
    getGenders: async () => await fetchInterceptor.get("Gender")
}

const schools = {
    getGenders: async () => await fetchInterceptor.get("School")
}

const schoolYears = {
    getSchoolYears: async () => await fetchInterceptor.get("SchoolYear")
}

const terms = {
    getTerms: async () => await fetchInterceptor.get("Term")
}

const user = {
    changePassword: (value: any) => fetchInterceptor.post("User/ChangePassword", value), // เปลี่ยน password
    forgotPassword: (value: any) => fetchInterceptor.post("User/ForgotPassword", value), // ลืม password
    login: async (value: any): Promise<any> => await fetchInterceptor.post("auth/login", value, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }),
    logout: async (): Promise<any> => await fetchInterceptor.post("auth/logout", {}, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }),
    register: async (value: any) => await fetchInterceptor.post("User/Register", createFormData(value)),
    getInfo: async () => await fetchInterceptor.get("User/Info"),
    updateUser: async (value: any) => await fetchInterceptor.post("User/UpdateUser", createFormData(value))
}

const ability = {
    getAbilityById: async (id: any) => await fetchInterceptor.get("Ability/" + id),
    getAbilities: async (value: any) => await fetchInterceptor.post("Ability/GetAbilities", value),
    updateAbility: async (value: any) => await fetchInterceptor.post("Ability/UpdateAbility", value),
    createAbility: async (value: any) => await fetchInterceptor.post("Ability/CreateAbility", value),
    reportAbilityBySchoolId: async (schoolId: any) =>
        await fetchInterceptor.get("Ability/ReportAbilityBySchoolId?schoolId=" + schoolId),
    reportAbilityBySchoolAll: async () =>
        await fetchInterceptor.get("Ability/ReportAbilityBySchoolAll"),
}

const role = {
    getRoles: async () => await fetchInterceptor.get("Role")
}

const server = {
    students,
    classes,
    terms,
    schoolYears,
    schools,
    genders,
    classRooms,
    user,
    multipleIntelligences,
    ability,
    role
}

export default server;