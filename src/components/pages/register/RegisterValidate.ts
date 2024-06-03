import * as Yup from 'yup';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterValidate = Yup.object().shape({
    firstName: Yup.string().required("กรุณากรอกชื่อจริง"),
    lastName: Yup.string().required("กรุณากรอกนามสกุล"),
    phoneNumber: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์").matches(phoneRegExp, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
    email: Yup.string().required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
    schoolId: Yup.string().required("กรุณาเลือกโรงเรียน"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน")
        .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
        .max(20, "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร"),
});