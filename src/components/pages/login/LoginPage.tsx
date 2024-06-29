"use client"

import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from '@/store/store';
import { login, userSelector } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { LoginRequest } from '@/models/user/loginRequest';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import ForgotPasswordDialog from './ForgotPasswordDialog';
import Image from 'next/image';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;

const formValidateSchema = Yup.object().shape({
  email: Yup
    .string()
    .required("กรุณากรอกอีเมล")
    .matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง")
    .trim(),
  password: Yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .trim(),
});

const LoginPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const dispatch = useAppDispatch();
  const { loginLoaded } = useSelector(userSelector);
  const route = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };

  const defaultValues: LoginRequest = { email: "", password: "" };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues,
    resolver: yupResolver(formValidateSchema),
  });

  const onSubmit = handleSubmit(
    async (value) => {
      const result = await dispatch(login(value));
      if (login.fulfilled.match(result)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "ยินดีต้อนรับ",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'swal2-custom-font'
          }
        }).then(() => route.push("/home"));
      } else {
        Swal.fire({
          icon: "error",
          title: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          text: "กรุณาลองใหม่อีกครั้ง",
          customClass: {
            container: 'swal2-custom-font'
          }
        });
      }
    });

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <ForgotPasswordDialog open={openDialog} handleClose={handleCloseDialog} />
      <Box sx={{
        width: isMobile ? "100" : "30rem"
      }}>
        <Box className="flex flex-col justify-center items-center">
          <Image src="/static/img/logo-mi.png" alt="img-logo" width={100} height={100} />
          <Typography variant='h5' className='text-center'>
            ระบบฐานข้อมูลสารสนเทศการพัฒนาผู้เรียนตามแนวทางพหุปัญญา
          </Typography>
          <Typography variant='body2' className='text-center'>
            สำนักงานเขตพื้นที่การศึกษาประถมศึกษากาญจนบุรี เขต 1
          </Typography>
        </Box>
        <Card
          variant='outlined'
          elevation={0}
          sx={{
            mx: isMobile ? 3 : 0,
            mt: 5
          }}
        >
          <form
            onSubmit={onSubmit}
            method="POST"
          >
            <CardContent>
              <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => {
                      return <FormControl
                        {...field}
                        // disabled={(errors.username?.message ?? "") != ""}
                        error={(errors.email?.message ?? "") != ""}
                        className="w-full"
                        variant="outlined"
                      >
                        <FormLabel
                          htmlFor="input-username"
                        >
                          อีเมล
                        </FormLabel>
                        <OutlinedInput
                          id="input-username"
                          size="small"
                          className="w-full"
                        />
                        <FormHelperText>
                          {errors.email?.message?.toString()}
                        </FormHelperText>
                      </FormControl>
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field }) => {
                      return <FormControl
                        {...field}
                        error={(errors.password?.message ?? "") != ""}
                        className="w-full"
                        variant="outlined"
                      >
                        <FormLabel
                          htmlFor="input-password"
                        // className={classFontStyle}
                        >
                          รหัสผ่าน
                        </FormLabel>
                        <OutlinedInput
                          id="input-password"
                          size="small"
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
                    }}
                  />

                </Grid>
              </Grid>
              <Button
                disabled={loginLoaded}
                endIcon={
                  loginLoaded ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    <LoginIcon />
                  )
                }
                type="submit"
                variant="contained"
                className={`mt-3 w-full`}
              >
                เข้าสู่ระบบ
              </Button>
              <Box className={`flex justify-center gap-2 ${isMobile ? "flex-col" : ""} `}>
                <Link className='text-center text-blue-500 underline' href={"/register"}>
                  <Typography variant='body2' >
                    สมัครสมาชิก
                  </Typography>
                </Link>
                {!isMobile ? <Typography>,</Typography> : ""}

                <Typography onClick={handleOpenDialog} variant='body2' className='text-center text-blue-500 underline cursor-pointer' >
                  ลืมรหัสผ่าน
                </Typography>
              </Box>
            </CardContent>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default LoginPage