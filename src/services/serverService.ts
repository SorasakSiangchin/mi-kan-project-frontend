import fetchInterceptor from "@/utils/fetchInterceptor";

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key]);
        if (typeof item[key] === "object") {
            for (const data of item[key]) formData.append(key, data);
        }
    };

    return formData;
};

const students = {
    createStudent: async (value: any) => await fetchInterceptor.post("Student/CreateStudent", createFormData(value)),
    updateStudent: async (value: any) => await fetchInterceptor.post("Student/UpdateStudent", createFormData(value))
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
    login: async (value: any) => await fetchInterceptor.post("User/Login", createFormData(value)),
    register: async (value: any) => await fetchInterceptor.post("User/Register", createFormData(value))
}

const server = {
    students,
    classes,
    terms,
    schoolYears,
    schools,
    genders,
    classRooms,
    user
}

export default server;