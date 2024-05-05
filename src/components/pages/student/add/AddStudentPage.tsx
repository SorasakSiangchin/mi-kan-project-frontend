/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useState } from "react";
import Image from "next/image";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useForm } from "react-hook-form";

interface IInput {
    firstName: string;
    lastName: string;
    imageFiles: any[];
    birthday: string;
    email: string;
    phoneNumber: string;
    address: string;
    idCard: string;
    religion: string;
    hobby: string;
    schoolId: string;
    classId: string;
    classRoomId: string;
    schoolYearId: string;
    termId: string;
    genderId: string;
}

const AddStudentPage = () => {

    const route = useRouter();
    const [imageUrl, setImageUrl] = useState<string>("");

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const onFileUpload = (file: File | null) => {
        // if (file) setValue('formFiles', file);
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

    const styleDrop: React.CSSProperties = {
        border: '2px dashed #000',
        padding: 20,
        textAlign: 'center',
        cursor: 'pointer',
        background: '#eee'
    };

    const initValues: IInput = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        birthday: "",
        classId: "",
        classRoomId: "",
        email: "",
        genderId: "",
        hobby: "",
        idCard: "",
        imageFiles: [],
        religion: "",
        schoolId: "",
        schoolYearId: "",
        termId: ""
    }

    const { control, formState: { errors } } = useForm<IInput>({
        defaultValues: initValues
    });

    return (
        <Box className="w-full">
            <Box className="flex flex-row justify-between mb-4">
                <Box>
                    <Typography variant="h5">
                        เพิ่มข้อมูลนักเรียน
                    </Typography>
                </Box>
                <Box className="flex gap-2">
                    <Box>
                        <Button onClick={() => route.push("/student")} startIcon={<ArrowBackIcon />} variant="contained" color="inherit">
                            กลับ
                        </Button>
                    </Box>
                    <Box>
                        <Button startIcon={<SaveIcon />} variant="contained" color="success">
                            บันทึก
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ชื่อจริง" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="นามสกุล" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="w-full" label="วันเกิด" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="อีเมล" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
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
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="เพศ" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ศาสนา" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        className="w-full"
                        label="เลขบัตรประชาชน"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>,
                        }}
                        inputProps={{ maxLength: 14 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="งานอดิเรก" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="โรงเรียน" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ห้องเรียน" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ชั้นเรียน" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ปีการศึกษา" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField className="w-full" label="ภาคเรียน" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField className="w-full" label="ที่อยุ่" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        เลือกรูปภาพ
                        <VisuallyHiddenInput onChange={handleChange} type="file" />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={9} md={9}>
                    {
                        imageUrl ?
                            <Box className="flex justify-start">
                                <Paper style={styleDrop} variant='outlined'>
                                    <Image src={imageUrl} width={250} height={300} alt="image-student" />
                                </Paper>
                            </Box> : ""
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddStudentPage