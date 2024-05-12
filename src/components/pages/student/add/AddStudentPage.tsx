/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
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
import { Controller, useForm } from "react-hook-form";
import useClass from "@/hooks/useClass";
import useClassRoom from "@/hooks/useClassRoom";
import useGender from "@/hooks/useGender";
import useSchool from "@/hooks/useSchool";
import useSchoolYear from "@/hooks/useSchoolYear";
import useTerm from "@/hooks/useTerm";
import { findMatchOptionAutocompleteSingle, formatDateForMUIDatePicker } from "@/utils/util";
import { useAppDispatch } from "@/store/store";
import { createStudent } from "@/store/slices/studentSlice";
import { StudentCreate } from "@/models/students/studentCreate";
import dayjs from "dayjs";
import Swal from "sweetalert2";

interface IInput {
    firstName: string;
    lastName: string;
    imageFiles: any[];
    birthday: any;
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
    const dispatch = useAppDispatch();
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
        firstName: "firstName",
        lastName: "lastName",
        phoneNumber: "0616032203",
        address: "address",
        birthday: dayjs("05/18/2024"),
        classId: "1124CF5A-6D96-4A05-844C-8A3A80C8E81C".toLowerCase(),
        classRoomId: "CF7E4C43-1C38-4251-9B68-D319EB963D19".toLowerCase(),
        email: "email@gmail.com",
        genderId: "99EA90E8-C8EF-45E2-86F4-0CE3DF6660E1".toLowerCase(),
        hobby: "hobby ",
        idCard: "1111111111111",
        imageFiles: [],
        religion: "religion",
        schoolId: "C3E93BA4-C4EF-40A5-8D1B-CC80F6DC8CF6".toLowerCase(),
        schoolYearId: "6122DB77-715B-45FC-B1CF-255B06D53549".toLowerCase(),
        termId: "8FA58D00-5C34-4263-BD44-4961D04A8A52".toLowerCase()
    };

    const { control, formState: { errors }, handleSubmit, setValue } = useForm<IInput>({
        defaultValues: initValues,
        //@ts-ignore
        //resolver: yupResolver(AddStudentValidate)
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

    const { classes, classesLoaded } = useClass();
    const { classRooms, classRoomsLoaded } = useClassRoom();
    const { genders, gendersLoaded } = useGender();
    const { schools, schoolsLoaded } = useSchool();
    const { schoolYears, schoolYearsLoaded } = useSchoolYear();
    const { terms, termsLoaded } = useTerm();

    const onSubmit = handleSubmit(async (value) => {
        value.birthday = formatDateForMUIDatePicker(new Date(value.birthday));

        const result = await dispatch(createStudent(value as StudentCreate));
        if (createStudent.fulfilled.match(result)) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => route.push("/student"));
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    return (
        <Box className="w-full">
            <form onSubmit={onSubmit}>
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
                            <Button
                                type="submit"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                color="success"
                            >
                                บันทึก
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    {/* ชื่อจริง */}
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
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
                    {/* วันเกิด */}
                    <Grid item xs={12} sm={6} md={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                control={control}
                                name="birthday"
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        onChange={(e) => field.onChange(e)}
                                        format="DD-MM-YYYY"
                                        className="w-full"
                                        label="วันเกิด"
                                        slotProps={{
                                            textField: {
                                                error: Boolean(errors.birthday?.message),
                                                helperText: errors.birthday?.message?.toString()
                                            }
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* อีเมล */}
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
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
                    {/* เพศ */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="genderId"
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={findMatchOptionAutocompleteSingle(genders, field.value, "id")}
                                    isOptionEqualToValue={(e) => e.id === field.value}
                                    onChange={(_, data) => field.onChange(data?.id)}
                                    loading={!gendersLoaded}
                                    disabled={!gendersLoaded}
                                    getOptionLabel={(e) => e.genderNameTh || ""}
                                    options={genders}
                                    renderInput={(params) =>
                                    (<TextField
                                        {...params}
                                        error={Boolean(errors.genderId?.message)}
                                        helperText={errors.genderId?.message?.toString()}
                                        label="เพศ" />)
                                    }
                                />
                            )}
                        />
                    </Grid>
                    {/* ศาสนา */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="religion"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={Boolean(errors.religion?.message)}
                                    helperText={errors.religion?.message?.toString()}
                                    className="w-full"
                                    label="ศาสนา"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    {/* เลขบัตรประชาชน */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="idCard"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={Boolean(errors.idCard?.message)}
                                    helperText={errors.idCard?.message?.toString()}
                                    className="w-full"
                                    label="เลขบัตรประชาชน"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>,
                                    }}
                                    inputProps={{ maxLength: 14 }} />
                            )}
                        />
                    </Grid>
                    {/* งานอดิเรก */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="hobby"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={Boolean(errors.idCard?.message)}
                                    helperText={errors.idCard?.message?.toString()}
                                    className="w-full"
                                    label="งานอดิเรก"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    {/* โรงเรียน */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="schoolId"
                            render={({ field }) => (
                                <Autocomplete
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
                            )}
                        />
                    </Grid>
                    {/* ห้องเรียน */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="classRoomId"
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={findMatchOptionAutocompleteSingle(classRooms, field.value, "id")}
                                    onChange={(_, data) => field.onChange(data?.id)}
                                    loading={!classRoomsLoaded}
                                    disabled={!classRoomsLoaded}
                                    getOptionLabel={(e) => e.classRoomNameTh || ""}
                                    options={classRooms}
                                    renderInput={(params) =>
                                    (<TextField
                                        {...params}
                                        error={Boolean(errors.classRoomId?.message)}
                                        helperText={errors.classRoomId?.message?.toString()}
                                        label="ห้องเรียน" />)
                                    }
                                />
                            )}
                        />
                    </Grid>
                    {/* ชั้นเรียน */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="classId"
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={findMatchOptionAutocompleteSingle(classes, field.value, "id")}
                                    onChange={(_, data) => field.onChange(data?.id)}
                                    loading={!classesLoaded}
                                    disabled={!classesLoaded}
                                    getOptionLabel={(e) => e.classNameTh || ""}
                                    options={classes}
                                    renderInput={(params) =>
                                    (<TextField
                                        {...params}
                                        error={Boolean(errors.classId?.message)}
                                        helperText={errors.classId?.message?.toString()}
                                        label="ชั้นเรียน" />)
                                    }
                                />

                            )}
                        />
                    </Grid>
                    {/* ปีการศึกษา */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="schoolYearId"
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={findMatchOptionAutocompleteSingle(schoolYears, field.value, "id")}
                                    onChange={(_, data) => field.onChange(data?.id)}
                                    loading={!schoolYearsLoaded}
                                    disabled={!schoolYearsLoaded}
                                    getOptionLabel={(e) => e.schoolYearNameTh || ""}
                                    options={schoolYears}
                                    renderInput={(params) =>
                                    (<TextField
                                        {...params}
                                        error={Boolean(errors.schoolYearId?.message)}
                                        helperText={errors.schoolYearId?.message?.toString()}
                                        label="ปีการศึกษา" />)
                                    }
                                />
                            )}
                        />
                    </Grid>
                    {/* ภาคเรียน */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Controller
                            control={control}
                            name="termId"
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={findMatchOptionAutocompleteSingle(terms, field.value, "id")}
                                    onChange={(_, data) => field.onChange(data?.id)}
                                    loading={!termsLoaded}
                                    disabled={!termsLoaded}
                                    getOptionLabel={(e) => e.termNameTh || ""}
                                    options={terms}
                                    renderInput={(params) =>
                                    (<TextField
                                        {...params}
                                        error={Boolean(errors.termId?.message)}
                                        helperText={errors.termId?.message?.toString()}
                                        label="ภาคเรียน" />)
                                    }
                                />
                            )}
                        />
                    </Grid>
                    {/* ที่อยุ่ */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={Boolean(errors.address?.message)}
                                    helperText={errors.address?.message?.toString()}
                                    multiline
                                    className="w-full"
                                    label="ที่อยุ่"
                                    variant="outlined" />
                            )}
                        />
                    </Grid>
                    {/* เลือกรูปภาพ */}
                    <Grid item xs={12} sm={3} md={3}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            เลือกรูปภาพ
                            <VisuallyHiddenInput onChange={handleChange} type="file" accept=".jpg, .png, .jpeg" />
                        </Button>
                        <Typography variant="subtitle1" >
                            (ไฟล์ที่เป็น jpg , png , jpeg และมีขนาดไฟล์ไม่เกิน 5 MB)
                        </Typography>
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
            </form>
        </Box>
    )
}

export default AddStudentPage