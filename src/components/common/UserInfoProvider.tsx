"use client";

import React, { useEffect } from 'react'
import { fetchInfo } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import { setParam } from '@/store/slices/studentSlice';

const UserInfoProvider = ({ children }: { children: React.ReactNode; }) => {

    const dispatch = useAppDispatch();



    useEffect(() => {

        dispatch(fetchInfo())

    }, [dispatch])


    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default UserInfoProvider