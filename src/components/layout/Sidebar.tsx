"use client"

import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme, Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Person4Icon from '@mui/icons-material/Person4';
const drawerWidth = 240;

type Props = {
    open: boolean;
    handleDrawerClose: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



const datas: {
    title: string;
    url: string;
    icon?: JSX.Element;
}[] = [
        {
            title: "หน้าแรก",
            url: "/home",
            icon: <HomeIcon />
        },
        {
            title: "ข้อมูลนักเรียน",
            url: "/student",
            icon: <PeopleAltIcon />
        },
        {
            title: "ข้อมูลคุณครู",
            url: "/home",
            icon: <Person4Icon />
        },
    ]

const Sidebar: FC<Props> = ({ handleDrawerClose, open }) => {
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Box className="w-full m-2">
                    <img src="/static/img/logo-mi.png" alt="img-logo" className='mx-auto' width={50} height={50} />
                    <Typography className='text-center'>
                        พหุปัญญา
                    </Typography>
                </Box>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {datas.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton href={item.url} >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"ออกจากระบบ"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar