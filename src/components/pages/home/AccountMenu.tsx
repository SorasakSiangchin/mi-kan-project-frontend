"use client";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import React, { FC } from 'react'
import { UserResponse } from '@/models/user/userResponse';
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout, userSelector } from '@/store/slices/userSlice';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress, Tooltip } from '@mui/material';
import { RoleCodeData } from '@/utils/constant';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AccountMenu: FC<{ userInfo: UserResponse }> = ({ userInfo }) => {

    const { logoutLoaded } = useSelector(userSelector)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = async () => {
        Swal.fire({
            title: "ออกจากระบบหรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            customClass: {
                confirmButton: 'swal2-custom-font',
                cancelButton: 'swal2-custom-font',
                container: 'swal2-custom-font'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                handleClose();
                const result = await dispatch(logout()).unwrap();
                if (result === "ok") router.push("/login");
            }
        });
    }

    const firstNameInitial = userInfo.firstName.charAt(0);
    const lastNameInitial = userInfo.lastName.charAt(0);

    const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

    const adminIcon = <Tooltip title="Admin">
        <AdminPanelSettingsIcon fontSize="small" />
    </Tooltip>

    const userIcon = <Tooltip title="Teacher">
        <PersonIcon fontSize="small" />
    </Tooltip>

    return (
        <Box className="ml-auto" >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={logoutLoaded}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}>
                    {firstNameInitial.toUpperCase() + lastNameInitial.toUpperCase()}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => router.push("/profile")} >
                    <ListItemIcon>
                        {userInfo.role.roleCode === RoleCodeData.ADMIN ? adminIcon : userIcon}
                    </ListItemIcon>
                    {fullName}
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem> */}
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    ออกจากระบบ
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default AccountMenu