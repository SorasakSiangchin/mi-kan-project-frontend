import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { changePassword, userSelector } from '@/store/slices/userSlice';
import Swal from 'sweetalert2';

const schemaValidate = yup.object().shape({
    newPassword: yup
        .string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: yup
        .string()
        .required('กรุณายืนยันรหัสผ่าน')
        .oneOf([yup.ref('newPassword')], 'รหัสผ่านไม่ตรงกัน'),
});

interface IInput {
    newPassword: string;
    confirmPassword: string;
}

const ChangePasswordCard = () => {

    const dispatch = useAppDispatch();
    const { userInfo, changePasswordLoaded } = useSelector(userSelector)

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword(show => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    };

    const defaultValues: IInput = {
        confirmPassword: "",
        newPassword: ""
    }

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<IInput>({
        defaultValues,
        resolver: yupResolver(schemaValidate),
    })

    const onSubmit = handleSubmit(async (value) => {
        const { success, message } = await dispatch(changePassword({
            id: userInfo ? userInfo.id : "",
            password: value.newPassword
        })).unwrap();

        if (success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เปลี่ยนรหัสผ่านสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    container: 'swal2-custom-font'
                }
            }).then(() => reset());

        } else {
            Swal.fire({
                icon: "error",
                title: message,
                customClass: {
                    container: 'swal2-custom-font'
                }
            });

        }
    })

    return (
        <Card variant="outlined" className='w-[80%]'>
            <form method='POST' onSubmit={onSubmit} >
                <CardContent>
                    <Typography align='center' variant='h5' className="mb-5" >
                        เปลี่ยนรหัสผ่าน
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                control={control}
                                name='newPassword'
                                render={({ field }) => <FormControl
                                    {...field}

                                    error={(errors.newPassword?.message ?? "") != ""}
                                    className="w-full"
                                    variant="outlined"
                                >
                                    <FormLabel
                                        htmlFor="input-password"
                                    // className={classFontStyle}
                                    >
                                        เปลี่ยนรหัสผ่าน
                                    </FormLabel>
                                    <OutlinedInput
                                        value={field.value}
                                        id="input-password"
                                        size="small"
                                        type={showNewPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>
                                        {errors.newPassword?.message?.toString()}
                                    </FormHelperText>
                                </FormControl>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                control={control}
                                name='confirmPassword'
                                render={({ field }) => <FormControl
                                    {...field}
                                    error={(errors.confirmPassword?.message ?? "") != ""}
                                    className="w-full"
                                    variant="outlined"
                                >
                                    <FormLabel
                                        htmlFor="input-password"
                                    // className={classFontStyle}
                                    >
                                        ยืนยันรหัสผ่าน
                                    </FormLabel>
                                    <OutlinedInput
                                        value={field.value}
                                        id="input-password"
                                        size="small"
                                        type={showConfirmPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>
                                        {errors.confirmPassword?.message?.toString()}
                                    </FormHelperText>
                                </FormControl>}
                            />

                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="end" marginTop={2} gap={1} >
                        <Button
                            disabled={changePasswordLoaded}
                            type="submit"
                            variant='contained'
                            color='success'
                        >
                            บันทึก
                        </Button>
                    </Box>
                </CardContent>
            </form>
        </Card >
    )
}

export default ChangePasswordCard