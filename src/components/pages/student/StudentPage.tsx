"use client";

import { Box, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { getStudents, refresh, studentSelector, updateStudent } from '@/store/slices/studentSlice';
import { useSelector } from 'react-redux';
import { formatDateForMUIDatePicker } from '@/utils/util';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ToolbarStudent from './ToolbarStudent';
import { userSelector } from '@/store/slices/userSlice';
import { StudentResponse } from '@/models/students/studentResponse';
import Swal from 'sweetalert2';
import { StudentUpdate } from '@/models/students/studentUpdate';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { RoleCodeData } from '@/utils/constant';

interface IRow {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    status: boolean;
    birthday: string;
    schoolNameTh: string;
    studentData?: StudentResponse;
}

const StudentPage = () => {

    // const isMobile = useMediaQuery('(max-width:600px)');

    const route = useRouter();

    const { students, studentsLoaded } = useSelector(studentSelector);

    const [schoolIdValue, setSchoolIdValue] = useState<string>("")

    const { userInfo } = useSelector(userSelector);

    const dispatch = useAppDispatch();

    const checkRole = schoolIdValue ? schoolIdValue : userInfo ? userInfo.role.roleCode === RoleCodeData.ADMIN ? "" : userInfo.schoolId : "";

    useEffect(() => {
        if (!studentsLoaded) dispatch(getStudents(checkRole));

    }, [studentsLoaded, dispatch, userInfo, schoolIdValue]);



    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'fullName', headerName: 'ชื่อ-นามสกุล', width: 180 },
        {
            field: 'birthday',
            headerName: 'วันเกิด',
            width: 120,
        },
        {
            field: 'imageUrl',
            headerName: 'รูปภาพนักเรียน',
            width: 150,
            renderCell: ({ row }) => (
                <>
                    <Image
                        priority
                        src={row.imageUrl}
                        alt={"student_" + row.id}
                        width={100}
                        height={100}
                    />
                </>
            ),
        },
        {
            field: 'phoneNumber',
            headerName: 'เบอร์โทรศัพท์',
            width: 150,
            renderCell: ({ row }) => {
                const phoneNumber = row.phoneNumber;
                const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                return <>{formattedPhoneNumber}</>;
            },
        },
        {
            field: 'email',
            headerName: 'อีเมล',
            width: 200
        },
        {
            field: 'status',
            headerName: 'สถานะ',
            width: 180,
            renderCell: ({ row }) => {
                return row.status ? <Chip label="ใช้งานอยู่" color="success" variant="outlined" /> :
                    <Chip label="ระงับการใช้งาน" color="error" variant="outlined" />;
            },
        },

        {
            field: 'school',
            headerName: 'โรงเรียน',
            width: 250,
            renderCell: ({ row }) => {
                return <Chip label={row.schoolNameTh} variant="outlined" />
            }
        }
        ,
        {
            field: 'action',
            headerName: 'ฟังก์ชัน',
            sortable: false,
            width: 150,
            renderCell: ({ row }) => (
                <Box className="flex gap-2 align-center h-full">
                    <div>
                        {row.status ? <Tooltip title="แก้ไขข้อมูล" >
                            <IconButton onClick={
                                () => {
                                    route.refresh();
                                    route.push("/student/form?id=" + row.id);
                                }} size="small" color='warning'>
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip> : ""}
                    </div>
                    <div>
                        <Tooltip title="เพิ่มเติม">
                            <IconButton onClick={
                                () => {
                                    route.refresh();
                                    route.push("/student/" + row.id);
                                }} size="small" color='primary'>
                                <InfoIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        {
                            row.status ? <Tooltip title="นำออก">
                                <IconButton onClick={() => onRemove(row.studentData)} size="small" color='error'>
                                    <RemoveCircleIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip> : <Tooltip title="นำกลับมา">
                                <IconButton onClick={() => onReuse(row.studentData)} size="small" color='success'>
                                    <AutorenewIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                </Box>
            ),
        },
    ];

    // is active is false
    const onRemove = (student?: StudentResponse) => {
        if (student) {
            Swal.fire({
                title: "ต้องการลบข้อมูลหรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                customClass: {
                    container: 'swal2-custom-font',
                    confirmButton: 'swal2-custom-font',
                    cancelButton: 'swal2-custom-font',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = setStudentUpdateData(student, false);
                    const { success } = await dispatch(updateStudent(data)).unwrap();
                    if (success)
                        Swal.fire({
                            title: "ลบสำเร็จ!",
                            icon: "success",
                            confirmButtonText: "ตกลง",
                            customClass: {
                                confirmButton: 'swal2-custom-font',
                                container: 'swal2-custom-font'
                            }
                        }).then(() => dispatch(refresh()));
                }
            });
        };
    };

    // is active is true
    const onReuse = (student?: StudentResponse) => {
        if (student) {
            Swal.fire({
                title: "ต้องการนำข้อมูลกลับมาหรือไม่?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                customClass: {
                    container: 'swal2-custom-font',
                    confirmButton: 'swal2-custom-font',
                    cancelButton: 'swal2-custom-font',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = setStudentUpdateData(student, true);
                    const { success } = await dispatch(updateStudent(data)).unwrap();

                    if (success)
                        Swal.fire({
                            title: "นำข้อมูลกลับมาสำเร็จ!",
                            icon: "success",
                            confirmButtonText: "ตกลง",
                            customClass: {
                                confirmButton: 'swal2-custom-font',
                                container: 'swal2-custom-font'
                            }
                        }).then(() => dispatch(refresh()));
                }
            });
        }
    }

    const rows: IRow[] = students.map((student) => ({
        id: student.id,
        email: student.email,
        fullName: student.fullName,
        birthday: formatDateForMUIDatePicker(new Date(student.birthday)),
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${student.imageUrl}`,
        status: student.isActive,
        phoneNumber: student.phoneNumber,
        schoolNameTh: student.school.schoolNameTh,
        studentData: student
    })) as IRow[];

    return (
        <Box sx={{ width: "100%" }}>
            <Box className="flex justify-between items-end mb-4 gap-3">
                <Box>
                    <Typography variant='h5' >
                        นักเรียนทั้งหมด{userInfo && userInfo?.role?.roleCode === RoleCodeData.ADMIN ? "ของระบบ" : ""}
                    </Typography>
                    <Typography variant='body1' >
                        {userInfo && userInfo?.role?.roleCode === RoleCodeData.ADMIN ? "" : `(${userInfo?.school?.schoolNameTh ? userInfo?.school?.schoolNameTh : ""})`}
                    </Typography>
                </Box>
                <Box>
                    <Button onClick={() => route.push("/student/form")} variant='contained' color='success' startIcon={<PersonAddIcon />} >
                        เพิ่มนักเรียน
                    </Button>
                </Box>
            </Box>
            <ToolbarStudent setSchoolIdValue={setSchoolIdValue} schoolIdValue={schoolIdValue} />
            <Box>
                <DataGrid
                    rows={rows}
                    rowHeight={100}
                    className={`${!studentsLoaded || rows.length === 0 ? "h-[30rem] w-full" : "w-full"} `}
                    loading={!studentsLoaded}
                    localeText={{
                        noRowsLabel: 'ไม่มีข้อมูล'
                    }}
                    getRowId={(row) => row.id}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {
                                variant: 'outlined',
                                size: 'small',
                                sx: { mb: 2 },
                                placeholder: "ค้นหา"
                            }
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                    rowSelection={false}
                />
            </Box>
        </Box>
    )
}

export default StudentPage;

const setStudentUpdateData = (student: StudentResponse, isActive: boolean): StudentUpdate => ({
    birthday: student.birthday,
    address: student.address,
    classId: student.classId,
    classRoomId: student.classRoomId,
    email: student.email,
    firstName: student.firstName,
    genderId: student.genderId,
    hobby: student.hobby,
    id: student.id,
    idCard: student.idCard,
    imageFiles: [],
    isActive,
    lastName: student.lastName,
    phoneNumber: student.phoneNumber,
    religion: student.religion,
    schoolId: student.schoolId,
    schoolYearId: student.schoolYearId,
    termId: student.termId
})