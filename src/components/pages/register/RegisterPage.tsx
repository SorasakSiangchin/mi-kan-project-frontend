"use client"

import { Autocomplete, Box, Button, Card, CircularProgress, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography, styled, useMediaQuery } from '@mui/material'
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterValidate } from './RegisterValidate';
import useSchool from '@/hooks/useSchool';
import { findMatchOptionAutocompleteSingle } from '@/utils/util';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import { useAppDispatch } from '@/store/store';
import { register, userSelector } from '@/store/slices/userSlice';
import { RegisterRequest } from '@/models/user/registerRequest';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

interface IInput {
    firstName: string;
    lastName: string;
    imageFiles: any[];
    email: string;
    phoneNumber: string;
    schoolId: string;
    password: string;
}

const RegisterPage = () => {

    const dispatch = useAppDispatch();

    const { registerLoaded } = useSelector(userSelector);

    const isMobile = useMediaQuery('(max-width:600px)');

    const [showPassword, setShowPassword] = useState(false);

    const [imageUrl, setImageUrl] = useState<string>("");

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    };

    const router = useRouter();

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

    const styleDrop: React.CSSProperties = {
        border: '2px dashed #000',
        padding: 20,
        textAlign: 'center',
        cursor: 'pointer',
        background: '#eee'
    };

    const initValues: IInput = {
        email: '',
        firstName: '',
        imageFiles: [],
        lastName: '',
        password: '',
        phoneNumber: '',
        schoolId: ''
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IInput>({
        defaultValues: initValues,
        resolver: yupResolver<any>(RegisterValidate)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const { schools, schoolsLoaded } = useSchool();

    const onSubmit = handleSubmit(async (value) => {
        const result =
            await dispatch(register({ ...value } as RegisterRequest));

        if (register.fulfilled.match(result)) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "สมัครสมาชิกสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    container: 'swal2-custom-font'
                }
            }).then(() => router.push("/login"));
        } else {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "กรุณาลองใหม่อีกครั้ง",
                customClass: {
                    container: 'swal2-custom-font'
                }
            });
        }
    })

    return (
        <div className={`flex flex-col h-screen justify-center items-center ${isMobile ? "m-4 h-full" : ""} `} >
            <form onSubmit={onSubmit} >

                <Card sx={{ width: isMobile ? "100" : "40rem" }} className='p-4 ' variant='outlined' elevation={0} >
                    <Box className={`flex ${isMobile ? "flex-col" : ""} justify-between mb-4`} >
                        <Typography variant='h5' >
                            สมัครสมาชิก
                        </Typography>
                        <Box className="flex gap-2" >
                            <Button
                                type="button"
                                variant="contained"
                                color="inherit"
                                size='small'
                                onClick={() => router.push("/login")}
                            >
                                กลับ
                            </Button>
                            <Button
                                disabled={registerLoaded}
                                endIcon={
                                    registerLoaded ? (
                                        <CircularProgress size={15} color="inherit" />
                                    ) : ""
                                }
                                type="submit"
                                variant="contained"
                                color="primary"
                                size='small'
                            >
                                สมัครสมาชิก
                            </Button>
                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        // disabled={(errors.username?.message ?? "") != ""}
                                        error={(errors.firstName?.message ?? "") != ""}
                                        className="w-full"
                                        variant="outlined"
                                    >
                                        <FormLabel
                                            htmlFor="input-firstName"
                                        >
                                            ชื่อจริง
                                        </FormLabel>
                                        <OutlinedInput
                                            id="input-firstName"
                                            size="small"
                                            className="w-full"
                                        />
                                        <FormHelperText>
                                            {errors.firstName?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>)}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        // disabled={(errors.username?.message ?? "") != ""}
                                        error={(errors.lastName?.message ?? "") != ""}
                                        className="w-full"
                                        variant="outlined"
                                    >
                                        <FormLabel
                                            htmlFor="input-lastName"
                                        >
                                            นามสกุล
                                        </FormLabel>
                                        <OutlinedInput
                                            id="input-lastName"
                                            size="small"
                                            className="w-full"
                                        />
                                        <FormHelperText>
                                            {errors.lastName?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />

                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        // disabled={(errors.username?.message ?? "") != ""}
                                        error={(errors.email?.message ?? "") != ""}
                                        className="w-full"
                                        variant="outlined"
                                    >
                                        <FormLabel
                                            htmlFor="input-email"
                                        >
                                            อีเมล
                                        </FormLabel>
                                        <OutlinedInput
                                            id="input-email"
                                            size="small"
                                            className="w-full"
                                        />
                                        <FormHelperText>
                                            {errors.email?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        // disabled={(errors.username?.message ?? "") != ""}
                                        error={(errors.password?.message ?? "") != ""}
                                        className="w-full"
                                        variant="outlined"
                                    >
                                        <FormLabel
                                            htmlFor="input-password"
                                        >
                                            รหัสผ่าน
                                        </FormLabel>
                                        <OutlinedInput
                                            id="input-password"
                                            size="small"
                                            className="w-full"
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText>
                                            {errors.password?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />

                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        // disabled={(errors.username?.message ?? "") != ""}
                                        error={(errors.phoneNumber?.message ?? "") != ""}
                                        className="w-full"
                                        variant="outlined"
                                    >
                                        <FormLabel
                                            htmlFor="input-phoneNumber"
                                        >
                                            เบอร์โทรศัพท์
                                        </FormLabel>
                                        <OutlinedInput
                                            id="input-phoneNumber"
                                            size="small"
                                            className="w-full"
                                        />
                                        <FormHelperText>
                                            {errors.phoneNumber?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />

                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Controller
                                control={control}
                                name='schoolId'
                                render={({ field }) => (
                                    <FormControl
                                        {...field}
                                        error={Boolean(errors.schoolId?.message)}
                                        className='w-full' >
                                        <FormLabel
                                            htmlFor="input-schoolId"
                                        >
                                            โรงเรียน
                                        </FormLabel>
                                        <Autocomplete

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
                                                id="input-schoolId"
                                                size="small"
                                                className='w-full'
                                            />)
                                            }
                                        />
                                        <FormHelperText>
                                            {errors.schoolId?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                component="label"
                                size='small'
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                เลือกรูปภาพ
                                <VisuallyHiddenInput onChange={handleChange} type="file" accept=".jpg, .png, .jpeg" />
                            </Button>
                            <Typography variant="subtitle1" className='text-gray-500' >
                                (ไฟล์ที่เป็น jpg , png , jpeg และมีขนาดไฟล์ไม่เกิน 5 MB)
                            </Typography>
                            <Grid item xs={12} sm={9} md={9}>
                                {
                                    imageUrl ?
                                        <Box className="flex justify-start">
                                            <Paper style={styleDrop} variant='outlined'>
                                                <Image src={imageUrl} width={180} height={150} alt="image-student" />
                                            </Paper>
                                        </Box> : ""
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </div>
    )
}

export default RegisterPage