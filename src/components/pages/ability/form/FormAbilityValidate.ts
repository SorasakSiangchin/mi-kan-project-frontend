import * as Yup from 'yup';

export const AbilityValidate = Yup.object().shape({
    multipleIntelligencesId: Yup.string().required("กรุณาเลือกความสามารถ"),
    studentId: Yup.string().required("กรุณาเลือกนักเรียน"),
    reasonNote: Yup.string().required("กรุณากรอกข้อมูล"),
});