import FormAbilityPage from '@/components/pages/ability/form/FormAbilityPage';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "add ability"
};

type Props = {
    searchParams: {
        id?: string;
    };
};


const Page = ({ searchParams: { id } }: Props) => {
    return (
        <FormAbilityPage id={id} />
    )
}

export default Page