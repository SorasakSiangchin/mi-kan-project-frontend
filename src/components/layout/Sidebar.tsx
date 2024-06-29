"use client";

import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme, Box, Typography } from '@mui/material'
import { FC } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';

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
            title: "นักเรียนที่มีความสามารถ",
            url: "/ability",
            icon: <PeopleAltIcon />
        },
        // {
        //     title: "เกี่ยวกับเว็บไซต์",
        //     url: "/about",
        //     icon: <InfoIcon />
        // },
        // {
        //     title: "ข้อมูลคุณครู",
        //     url: "/home",
        //     icon: <Person4Icon />
        // },
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
                    <Box className="flex justify-center">
                        <Image src="/static/img/logo-mi.png" alt="img-logo" className='' width={50} height={50} />
                    </Box>
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
        </Drawer>
    )
}

export default Sidebar