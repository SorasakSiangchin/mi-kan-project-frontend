"use client"

import { ThemeProvider } from '@mui/material/styles';
import React from 'react'
import theme from './theme';



const ThemeRegistry = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeRegistry