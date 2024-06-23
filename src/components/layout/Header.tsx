"use client";

import { Toolbar, IconButton, Typography, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import { userSelector } from '@/store/slices/userSlice';
import AccountMenu from '../pages/home/AccountMenu';

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
}

const drawerWidth = 240;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<Props> = ({ handleDrawerOpen, open }) => {

  const { userInfo } = useSelector(userSelector);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          ระบบบันทึกความสามารถพิเศษ
        </Typography>
        {userInfo ?
          userInfo.school.schoolNameTh ?
            <Typography variant="h6" noWrap component="div" marginLeft={1}>
              ({userInfo.school.schoolNameTh})
            </Typography> : ""
          : ""
        }
        {userInfo ? <AccountMenu userInfo={userInfo} /> : ""}
      </Toolbar>
    </AppBar>
  )
}

export default Header