import StudentDetailPage from "@/components/pages/student/StudentDetailPage";
import { ServiceResponse } from "@/models/serviceResponse";
import { StudentResponse } from "@/models/students/studentResponse";
import server from "@/services/serverService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "student-detail"
};


type Props = {
    params: { id: string };
};

const Page = async ({
    params: { id }
}: Props) => {

    const student: ServiceResponse<StudentResponse> = await server.students.getStudentById(id);

    if (!student.success || !student.data) notFound();

    return <StudentDetailPage student={student.data} />
}

export default Page