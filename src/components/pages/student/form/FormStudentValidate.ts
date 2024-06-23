import * as Yup from 'yup';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const AddStudentValidate = Yup.object().shape({
    firstName: Yup.string().required("กรุณากรอกชื่อจริง"),
    title: Yup.string().required("กรุณาเลือกคำนำหน้านาม"),
    lastName: Yup.string().required("กรุณากรอกนามสกุล"),
    phoneNumber: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์").matches(phoneRegExp, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    birthday: Yup.date().required("กรุณากรอกวันเกิด"),
    classId: Yup.string().required("กรุณาเลือกชั้นเรียน"),
    classRoomId: Yup.string().required("กรุณาเลือกห้องเรียน"),
    email: Yup.string().required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
    genderId: Yup.string().required("กรุณาเลือกเพศ"),
    hobby: Yup.string().required("กรุณากรอกงานอดิเรก"),
    idCard: Yup.string().required("กรุณากรอกเลขบัตรประชาชน"),
    religion: Yup.string().required("กรุณากรอกศาสนา"),
    schoolId: Yup.string().required("กรุณาเลือกโรงเรียน"),
    schoolYearId: Yup.string().required("กรุณาเลือกปีการศึกษา"),
    termId: Yup.string().required("กรุณาเลือกภาคเรียน"),
});