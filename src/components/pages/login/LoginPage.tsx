"use client"

import { Box, Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, useMediaQuery } from '@mui/material'
import React, { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'

const LoginPage = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
      };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Box>
        <Card
          sx={{
            width: isMobile ? "100" : "30rem",
            mx: isMobile ? 3 : 0,
          }}
        >
          <form onSubmit={() => {}} method="POST">
            <CardContent>
              <Grid container rowSpacing={5}>
                <Grid item xs={12}>
                  <FormControl
                    disabled={false}
                    error={false}
                    className="w-full"
                    variant="outlined"
                  >
                    <FormLabel
                      htmlFor="input-username"
                      // className={classFontStyle}
                    >
                      Username
                    </FormLabel>
                    <OutlinedInput
                      id="input-username"
                      // {...register("username")}
                      size="small"
                      className="w-full"
                    />
                    <FormHelperText>
                      {/* {errors.username?.message?.toString()} */}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    disabled={false}
                    error={false}
                    className="w-full"
                    variant="outlined"
                  >
                    <FormLabel
                      htmlFor="input-password"
                      // className={classFontStyle}
                    >
                      Password
                    </FormLabel>
                    <OutlinedInput
                      id="input-password"
                      // {...register("password")}
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
                      {/* {errors.password?.message?.toString()} */}
                    </FormHelperText>
                  </FormControl>
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
                Login
              </Button>
            </CardContent>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default LoginPage