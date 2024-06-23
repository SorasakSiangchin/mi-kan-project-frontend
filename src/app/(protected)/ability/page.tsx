import AbilityPage from '@/components/pages/ability/AbilityPage';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "ability"
};

const Page = () => {
    return (
        <AbilityPage />
    )
}

export default Page