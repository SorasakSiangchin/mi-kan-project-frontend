import AddStudentPage from '@/components/pages/student/add/AddStudentPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "add student"
};

const Page = () => {
    return (
        <AddStudentPage />
    )
}

export default Page