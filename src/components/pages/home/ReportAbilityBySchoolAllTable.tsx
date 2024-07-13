import { ReportAbilityMultipleIntelligence } from '@/models/abilities/reportAbilityMultipleIntelligences'
import { UserResponse } from '@/models/user/userResponse'
import { fetchReportAbilityBySchoolAll, useAbilitySelector } from '@/store/slices/abilitySlice'
import { useAppDispatch } from '@/store/store'
import { MultipleIntelligencesCodeData } from '@/utils/constant'
import { Box, Chip, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    userInfo: UserResponse | null
}


const ReportAbilityBySchoolAllTable: FC<Props> = ({ userInfo }) => {
    const dispatch = useAppDispatch();

    const { reportAbilityBySchoolAll, reportAbilityBySchoolAllLoaded }
        = useSelector(useAbilitySelector);

    useEffect(() => {
        if (!reportAbilityBySchoolAllLoaded) if (userInfo) dispatch(fetchReportAbilityBySchoolAll())
    }, [reportAbilityBySchoolAllLoaded, dispatch, userInfo])

    const findMultipleIntelligence =
        (data: ReportAbilityMultipleIntelligence[], multipleIntelligenceCode: string): ReportAbilityMultipleIntelligence | undefined => {
            const result = data
                .find(r => r.multipleIntelligencesCode === multipleIntelligenceCode);

            return result;
        }

    const columns: GridColDef<(typeof reportAbilityBySchoolAll)[number]>[] = [
        {
            field: 'schoolNameTh',
            headerName: 'ชื่อโรงเรียน',
            width: 180,
            sortable: false,
            filterable: false,
        },
        {
            field: 'studentAmountAll',
            headerName: 'จำนวนนักเรียนที่มีความสามารถ',
            width: 200,
            sortable: false,
            filterable: false,
        },

        // วิทยาศาสตร์
        {
            field: 'multipleIntelligence1',
            headerName: 'วิทยาศาสตร์ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 200,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.SCIENCE);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage1',
            headerName: 'วิทยาศาสตร์ (ร้อยละ)',
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.SCIENCE);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // เครื่องกลและอิเล็กทรอนิกส์
        {
            field: 'multipleIntelligence2',
            headerName: 'เครื่องกลและอิเล็กทรอนิกส์ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 290,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MECHANICAL);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage2',
            headerName: 'เครื่องกลและอิเล็กทรอนิกส์ (ร้อยละ)',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MECHANICAL);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // ภาษา
        {
            field: 'multipleIntelligence3',
            headerName: 'ภาษา (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.LANGUAGE);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage3',
            headerName: 'ภาษา (ร้อยละ)',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.LANGUAGE);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // สังคมและอารมณ์
        {
            field: 'multipleIntelligence4',
            headerName: 'สังคมและอารมณ์ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 250,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.SOCIALANDEMOTIONAL);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage4',
            headerName: 'สังคมและอารมณ์ (ร้อยละ)',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.SOCIALANDEMOTIONAL);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // ศิลปะ/มิติสัมพันธ์
        {
            field: 'multipleIntelligence5',
            headerName: 'ศิลปะ/มิติสัมพันธ์ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 250,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.ARTDIMENSIONS);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage5',
            headerName: 'ศิลปะ/มิติสัมพันธ์ (ร้อยละ)',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.ARTDIMENSIONS);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // คณิตศาสตร์
        {
            field: 'multipleIntelligence6',
            headerName: 'คณิตศาสตร์ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 200,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MATHEMATICS);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage6',
            headerName: 'คณิตศาสตร์ (ร้อยละ)',
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MATHEMATICS);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // การเคลื่อนไหวกล้ามเนื้อ
        {
            field: 'multipleIntelligence7',
            headerName: 'การเคลื่อนไหวกล้ามเนื้อ (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 250,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MUSCLEMOVEMENT);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage7',
            headerName: 'การเคลื่อนไหวกล้ามเนื้อ (ร้อยละ)',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.MUSCLEMOVEMENT);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },

        // การได้ยิน
        {
            field: 'multipleIntelligence8',
            headerName: 'การได้ยิน (จำนวนนักเรียน)',
            sortable: false,
            filterable: false,
            width: 250,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.HEARING);
                if (!result) return "";

                return <Chip label={<Typography>{result.studentAmount}</Typography>} variant="outlined" />

            },
        },
        {
            field: 'multipleIntelligencePercentage8',
            headerName: 'การได้ยิน (ร้อยละ)',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const result = findMultipleIntelligence(row.reportAbilityMultipleIntelligences, MultipleIntelligencesCodeData.HEARING);

                if (!result) return "";

                return <Chip label={<Typography>{parseFloat(result?.percentage?.toFixed(2))}</Typography>} variant="outlined" />;

            },
        },
    ];

    return (
        <Box>
            <Typography variant='h5' >
                รายชื่อโรงเรียน
            </Typography>
            <Box sx={{
                height: "100%",
                width: "100%"
            }}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={reportAbilityBySchoolAll}
                    className={reportAbilityBySchoolAll.length > 0 ? "" : "h-[25rem]"}
                    columns={columns}
                    localeText={{
                        noRowsLabel: 'ไม่มีข้อมูล'
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 8 },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-row': {
                            borderBottom: '1px solid #ccc', // Customize the color and thickness as needed
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={false}
                    rowSelection={false}
                />
            </Box>
        </Box>
    )
}

export default ReportAbilityBySchoolAllTable