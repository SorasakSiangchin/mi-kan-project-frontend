"use client"

import { Box, Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const formValidateSchema = Yup.object().shape({
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน").trim(),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").trim(),
});

interface UserLogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };

  const defaultValues: UserLogin = { username: "", password: "" };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues,
    resolver: yupResolver(formValidateSchema),
  });

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Box sx={{
        width: isMobile ? "100" : "30rem"
      }}>
        <Box className="flex flex-col justify-center items-center">
          <img src="/static/img/logo-mi.png" alt="img-logo" width={100} height={100} />
          <Typography variant='h5' className='text-center'>
            ระบบบันทึกความสามารถพิเศษ ด้วยระบบอิเล็กทรอนิกส์
          </Typography>
          <Typography variant='body2' className='text-center'>
            สํานักวิชาการและมาตรฐานการศึกษา สพฐ.
          </Typography>
        </Box>
        <Card
          sx={{
            mx: isMobile ? 3 : 0,
            mt: 5
          }}
        >
          <form onSubmit={handleSubmit((value) => {
            console.log("value : ", value)
          })} method="POST">
            <CardContent>
              <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name='username'
                    render={({ field }) => {
                      return <FormControl
                        {...field}
                        // disabled={(errors.username?.message ?? "") != ""}
                        error={(errors.username?.message ?? "") != ""}
                        className="w-full"
                        variant="outlined"
                      >
                        <FormLabel
                          htmlFor="input-username"
                        // className={classFontStyle}
                        >
                          ชื่อผู้ใช้ระบบ
                        </FormLabel>
                        <OutlinedInput
                          id="input-username"
                          size="small"
                          className="w-full"
                        />
                        <FormHelperText>
                          {errors.username?.message?.toString()}
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
                disabled={false}
                type="submit"
                variant="contained"
                //   endIcon={
                //     loginLoaded ? (
                //       <CircularProgress size={15} color="inherit" />
                //     ) : (
                //       <LoginIcon />
                //     )
                //   }
                className={`mt-3 w-full`}
              >
                เข้าสู่ระบบ
              </Button>
            </CardContent>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default LoginPage