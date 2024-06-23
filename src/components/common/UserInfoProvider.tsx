"use client";

import React, { useEffect } from 'react'
import { fetchInfo } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';

const UserInfoProvider = ({ children }: { children: React.ReactNode; }) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        // TODO : ตอนที่ยังไม่ Login ก็ทำงาน
        dispatch(fetchInfo())
    }, [dispatch])

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default UserInfoProvider