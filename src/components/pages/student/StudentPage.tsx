"use client";

import { Box, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { getStudents, studentSelector } from '@/store/slices/studentSlice';
import { useSelector } from 'react-redux';
import { formatDateForMUIDatePicker } from '@/utils/util';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ToolbarStudent from './ToolbarStudent';
import { userSelector } from '@/store/slices/userSlice';

interface IRow {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    status: boolean;
    birthday: string;
}

const StudentPage = () => {

    // const isMobile = useMediaQuery('(max-width:600px)');

    const route = useRouter();

    const { students, studentsLoaded } = useSelector(studentSelector);

    const { userInfo } = useSelector(userSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!studentsLoaded) if (userInfo) dispatch(getStudents(userInfo.schoolId));
    }, [studentsLoaded, dispatch, userInfo]);

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
            width: 180
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
            field: 'action',
            headerName: 'ฟังก์ชัน',
            sortable: false,
            width: 200,
            renderCell: ({ row }) => (
                <Box className="flex gap-2 align-center h-full">
                    <div>
                        <Tooltip title="แก้ไขข้อมูล" onClick={
                            () => {
                                route.refresh();
                                route.push("/student/form?id=" + row.id);
                            }}>
                            <IconButton size="small" color='warning'>
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="เพิ่มเติม">
                            <IconButton size="small" color='primary'>
                                <InfoIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="นำออก">
                            <IconButton size="small" color='error'>
                                <RemoveCircleIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
            ),
        },
    ];

    const rows: IRow[] = students.map((student) => ({
        id: student.id,
        email: student.email,
        fullName: `${student.firstName} ${student.lastName}`,
        birthday: formatDateForMUIDatePicker(new Date(student.birthday)),
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${student.imageUrl}`,
        status: student.isActive,
        phoneNumber: student.phoneNumber
    })) as IRow[];

    return (
        <Box sx={{ width: "100%" }}>
            <Box className="flex justify-end mb-4 gap-3">
                <Button onClick={() => route.push("/student/form")} variant='contained' color='success' startIcon={<PersonAddIcon />} >
                    เพิ่มนักเรียน
                </Button>
            </Box>
            <ToolbarStudent />
            <DataGrid
                rows={rows}
                rowHeight={100}
                className={`${!studentsLoaded || rows.length === 0 ? "h-[30rem]" : ""} `}
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
    )
}

export default StudentPage