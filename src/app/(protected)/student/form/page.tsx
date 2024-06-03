
import FormStudentPage, { IInput } from '@/components/pages/student/form/FormStudentPage';
import { ServiceResponse } from '@/models/serviceResponse';
import { StudentResponse } from '@/models/students/studentResponse';
import server from '@/services/serverService';
import dayjs from 'dayjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "add student"
};

type Props = {
    searchParams: {
        id?: string;
    };
};

const Page = async ({ searchParams: { id } }: Props) => {

    return (
        <FormStudentPage id={id} />
    )
}

export default Page