import RegisterPage from '@/components/pages/register/RegisterPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "register"
};

const Page = () => {
    return (
        <RegisterPage />
    )
}

export default Page