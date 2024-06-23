"use client";
import { updateUser, userSelector } from '@/store/slices/userSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { UserValidate } from './FormUserValidate'
import PhoneIcon from '@mui/icons-material/Phone';
import { findMatchOptionAutocompleteSingle } from '@/utils/util'
import useSchool from '@/hooks/useSchool'
import useRole from '@/hooks/useRole'
import { RoleCodeData } from '@/utils/constant'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShowImageProfile from './ShowImageProfile'
import { useAppDispatch } from '@/store/store'
import { UserUpdate } from '@/models/user/userUpdate'
import Swal from 'sweetalert2'
import ChangePasswordCard from './ChangePasswordCard';

export interface IInput {
    id?: string;
    firstName: string;
    lastName: string;
    imageFiles: any[];
    email: string;
    phoneNumber: string;
    schoolId: string;
    roleId: string;
}

const ProfilePage = () => {

    const dispatch = useAppDispatch();

    const { userInfo, updateUserLoaded } = useSelector(userSelector);

    const [imageUrl, setImageUrl] = useState<string>("");

    const initValues: IInput = {
        id: userInfo?.id || "",
        email: userInfo?.email || "",
        firstName: userInfo?.firstName || "",
        imageFiles: [],
        lastName: userInfo?.lastName || "",
        phoneNumber: userInfo?.phoneNumber || "",
        roleId: userInfo?.roleId || "",
        schoolId: userInfo?.schoolId || ""
    };

    const { handleSubmit, setValue, control, formState: { errors }, reset } = useForm<IInput>({
        defaultValues: initValues,
        //@ts-ignore
        resolver: yupResolver(UserValidate)
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    const onFileUpload = (file: File | null) => {
        if (file) setValue('imageFiles', [file]);
    }

    const handleChange = useCallback(
        (event: any) => {
            event.preventDefault()
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setImageUrl(imageUrl);
                onFileUpload(file);
            }
        },
        [onFileUpload]
    );

    useEffect(() => {
        if (userInfo) {
            let user: IInput = {
                id: userInfo.id || "",
                email: userInfo.email || "",
                firstName: userInfo.firstName || "",
                imageFiles: [],
                lastName: userInfo.lastName || "",
                phoneNumber: userInfo.phoneNumber || "",
                roleId: userInfo.role?.id || "",
                schoolId: userInfo.schoolId || ""
            };
            for (const key in user)
                setValue(key as keyof typeof user, user[key as keyof typeof user])
        }

    }, [userInfo]);

    const { schools, schoolsLoaded } = useSchool();
    const { roles, rolesLoaded } = useRole();

    const onSubmit = handleSubmit(async (value) => {
        const data = { ...value } as UserUpdate;

        const result = await dispatch(updateUser(data)).unwrap();

        if (result.success === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                customClass: {
                    container: 'swal2-custom-font'
                },
                timer: 1500
            }).then(() => {
                // dispatch(refresh());
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Error',
                customClass: {
                    container: 'swal2-custom-font'
                },
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    return (
        <Box className="w-full flex flex-col justify-center items-center gap-5">
            <Card variant="outlined" className='w-[80%]'>
                <form method='POST' onSubmit={onSubmit} >
                    <CardContent>
                        <Typography align='center' variant='h5' className="mb-5" >
                            ข้อมูลส่วนตัว
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <Box>
                                    <ShowImageProfile data={userInfo} imageUrl={imageUrl} />
                                    <Box className="flex flex-col justify-center w-full">
                                        <Box>
                                            <Button
                                                className='mt-5'
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                เลือกรูปภาพ
                                                <VisuallyHiddenInput onChange={handleChange} type="file" accept=".jpg, .png, .jpeg" />
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Typography variant="subtitle1" >
                                        (ไฟล์ที่เป็น jpg , png , jpeg และมีขนาดไฟล์ไม่เกิน 5 MB)
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <Grid container spacing={2}>
                                    {/* ชื่อจริง */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="w-full"
                                                    label="ชื่อจริง"
                                                    variant="outlined"
                                                    error={Boolean(errors.firstName?.message)}
                                                    helperText={errors.firstName?.message?.toString()}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* นามสกุล */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="w-full"
                                                    label="นามสกุล"
                                                    variant="outlined"
                                                    error={Boolean(errors.lastName?.message)}
                                                    helperText={errors.lastName?.message?.toString()}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* อีเมล */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="w-full"
                                                    label="อีเมล"
                                                    variant="outlined"
                                                    error={Boolean(errors.email?.message)}
                                                    helperText={errors.email?.message?.toString()}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* เบอร์โทรศัพท์ */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PhoneIcon />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    inputProps={{ maxLength: 10 }}
                                                    className="w-full"
                                                    label="เบอร์โทรศัพท์"
                                                    variant="outlined"
                                                    error={Boolean(errors.phoneNumber?.message)}
                                                    helperText={errors.phoneNumber?.message?.toString()}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* โรงเรียน */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="schoolId"
                                            render={({ field }) => {
                                                return <Autocomplete
                                                    {...field}
                                                    value={findMatchOptionAutocompleteSingle(schools, field.value, "id")}
                                                    onChange={(_, data) => field.onChange(data?.id)}
                                                    loading={!schoolsLoaded}
                                                    disabled={!schoolsLoaded}
                                                    getOptionLabel={(e) => e.schoolNameTh || ""}
                                                    options={schools}
                                                    renderInput={(params) =>
                                                    (<TextField
                                                        {...params}
                                                        error={Boolean(errors.schoolId?.message)}
                                                        helperText={errors.schoolId?.message?.toString()}
                                                        label="โรงเรียน" />)
                                                    }
                                                />
                                            }}
                                        />
                                    </Grid>
                                    {/* บทบาท */}
                                    <Grid item xs={12} sm={12}>
                                        <Controller
                                            control={control}
                                            name="roleId"
                                            render={({ field }) => {
                                                return <Autocomplete
                                                    {...field}
                                                    value={findMatchOptionAutocompleteSingle(roles, field.value, "id")}
                                                    onChange={(_, data) => field.onChange(data?.id)}
                                                    loading={!rolesLoaded}
                                                    // disabled={!rolesLoaded}
                                                    disabled
                                                    getOptionLabel={(e) => e.roleName || ""}
                                                    getOptionDisabled={(option) => option.roleCode === RoleCodeData.ADMIN}
                                                    options={roles}
                                                    renderInput={(params) =>
                                                    (<TextField
                                                        {...params}
                                                        error={Boolean(errors.roleId?.message)}
                                                        helperText={errors.roleId?.message?.toString()}
                                                        label="บทบาท" />)
                                                    }
                                                />
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="end" marginTop={2} gap={1} >
                            <Button disabled={updateUserLoaded} type="submit" variant='contained' color='success' >
                                บันทึก
                            </Button>
                        </Box>
                    </CardContent>
                </form>
            </Card>
            <ChangePasswordCard />
        </Box>
    )
}

export default ProfilePage