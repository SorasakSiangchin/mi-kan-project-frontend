"use client"

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Box, styled } from '@mui/material';
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <html lang="en">
            <body className={inter.className}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header open={open} handleDrawerOpen={handleDrawerOpen} />
                    <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
                    <Main open={open} sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        {children}
                    </Main>
                </Box>
            </body>
        </html>
    )
}

export default RootLayout