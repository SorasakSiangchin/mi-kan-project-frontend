
import FormStudentPage from '@/components/pages/student/form/FormStudentPage';
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