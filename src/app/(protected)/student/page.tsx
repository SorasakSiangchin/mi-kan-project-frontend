import StudentPage from '@/components/pages/student/StudentPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "student"
};

const Page = () => {
    return (
        <StudentPage />
    )
}

export default Page