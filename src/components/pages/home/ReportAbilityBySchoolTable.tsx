"use client"

import { UserResponse } from "@/models/user/userResponse";
import { fetchReportAbilityBySchoolId, useAbilitySelector } from "@/store/slices/abilitySlice";
import { useAppDispatch } from "@/store/store";
import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useEffect } from "react"
import { useSelector } from "react-redux";

type Props = {
    userInfo: UserResponse | null
}

const ReportAbilityBySchoolTable: FC<Props> = ({ userInfo }) => {
    const dispatch = useAppDispatch();

    const { reportAbilityBySchoolId, reportAbilityBySchoolIdLoaded }
        = useSelector(useAbilitySelector);

    useEffect(() => {
        if (!reportAbilityBySchoolIdLoaded) if (userInfo) dispatch(fetchReportAbilityBySchoolId(userInfo.schoolId ? userInfo.schoolId : ""))
    }, [reportAbilityBySchoolIdLoaded, dispatch, userInfo])


    const columns: GridColDef[] = [
        {
            field: 'multipleIntelligencesName',
            description: 'ชื่อของพหุปัญญา 8 ด้าน',
            headerName: 'พหุปัญญา',
            width: 350
        },
        {
            field: 'studentAmount',
            description: 'จำนวนนักเรียนที่มีความสามารถด้านนี้',
            headerName: 'จำนวนนักเรียน',
            width: 350,
            renderCell: ({ row }) => {
                return <Chip label={<Typography>{row?.studentAmount}</Typography>} variant="outlined" />
            },

        },
        {
            field: 'percentage',
            description: 'จำนวนนักเรียนที่มีความสามารถด้านนี้',
            headerName: 'ร้อยละ',
            width: 200,
            renderCell: ({ row }) => {
                return <Chip label={<Typography>{parseFloat(row?.percentage?.toFixed(2))}</Typography>} variant="outlined" />
            },
        },
    ];

    return (
        <Box>
            <Typography variant='h5' >
                รายชื่อพหุปัญญา
            </Typography>
            <Box sx={{
                height: "100%",
                width: "100%"
            }}>
                <DataGrid
                    getRowId={(row) => row.multipleIntelligencesId}
                    rows={reportAbilityBySchoolId}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-row': {
                            borderBottom: '1px solid #ccc', // Customize the color and thickness as needed
                        },
                    }}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    checkboxSelection={false}
                    rowSelection={false}
                />
            </Box>
        </Box>
    )
}

export default ReportAbilityBySchoolTable