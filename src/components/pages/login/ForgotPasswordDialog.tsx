import React, { FC, useState } from 'react'
import { TransitionProps } from '@mui/material/transitions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Slide, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/store';
import { forgotPassword } from '@/store/slices/userSlice';
import Swal from 'sweetalert2';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;

type Props = {
    open: boolean;
    handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IInput {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

const schemaValidate = yup.object().shape({
    email: yup
        .string()
        .required("กรุณากรอกอีเมล")
        .matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง")
        .trim(),
    newPassword: yup
        .string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: yup
        .string()
        .required('กรุณายืนยันรหัสผ่าน')
        .oneOf([yup.ref('newPassword')], 'รหัสผ่านไม่ตรงกัน'),
});

const ForgotPasswordDialog: FC<Props> = ({ handleClose, open }) => {
    const dispatch = useAppDispatch();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword(show => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    };

    const {
        control,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IInput>({
        defaultValues: {
            email: '',
            newPassword: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schemaValidate)
    })

    const handleCloseForm = () => {
        reset()
        handleClose()
    }

    const onSubmit = handleSubmit(async (value) => {
        const { success, message } = await dispatch(forgotPassword({
            email: value.email,
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
            }).then(() => handleCloseForm());

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
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseForm}
        >
            <form method='POST' className='mt-2' onSubmit={onSubmit} >
                <DialogTitle>{"ลืมรหัสผ่าน ?"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (<FormControl
                                    {...field}
                                    error={(errors.email?.message ?? "") != ""}
                                    className="w-full"
                                    variant="outlined"
                                >
                                    <FormLabel
                                        htmlFor="input-password"
                                    >
                                        อีเมล
                                    </FormLabel>
                                    <OutlinedInput
                                        value={field.value}
                                        size='small'
                                        className='w-full'
                                    />
                                    <FormHelperText>
                                        {errors.email?.message?.toString()}
                                    </FormHelperText>
                                </FormControl>)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field }) => (<FormControl
                                    {...field}
                                    error={(errors.newPassword?.message ?? "") != ""}
                                    className="w-full"
                                    variant="outlined"
                                >
                                    <FormLabel
                                        htmlFor="input-password"
                                    >
                                        เปลี่ยนรหัสผ่าน
                                    </FormLabel>
                                    <OutlinedInput
                                        size='small'
                                        className='w-full'
                                        value={field.value}
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
                                </FormControl>)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field }) => (<FormControl
                                    {...field}
                                    error={(errors.confirmPassword?.message ?? "") != ""}
                                    className="w-full"
                                    variant="outlined"
                                >
                                    <FormLabel
                                        htmlFor="input-password"
                                    >
                                        ยืนยันรหัสผ่าน
                                    </FormLabel>
                                    <OutlinedInput
                                        size='small'
                                        className='w-full'
                                        value={field.value}
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
                                </FormControl>)
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' size='small' variant='contained' >บันทึก</Button>
                    <Button onClick={handleCloseForm}>ยกเลิก</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ForgotPasswordDialog