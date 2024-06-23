import ProfilePage from '@/components/pages/profile/ProfilePage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "profile"
};

const Profile = () => {
    return (
        <ProfilePage />
    )
}

export default Profile