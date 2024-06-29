"use client"

import { Box, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { fetchAbilities, useAbilitySelector } from '@/store/slices/abilitySlice';
import { userSelector } from '@/store/slices/userSlice';
import { AbilityResponse } from '@/models/abilities/abilityResponse';
import EditIcon from '@mui/icons-material/Edit';
import ToolbarAbility from './ToolbarAbility';
import MultipleIntelligencesRender from './MultipleIntelligencesRender';
import { RoleCodeData } from '@/utils/constant';
import { screenWidth } from '@/utils/util';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AbilityInfoDialog from './AbilityInfoDialog';

const AbilityPage = () => {

  const route = useRouter();

  const dispatch = useAppDispatch();

  const [schoolIdValue, setSchoolIdValue] = useState<string>("")
  const [openInfoDialog, setOpenInfoDialog] = useState<boolean>(false)
  const [abilityData, setAbilityData] = useState<AbilityResponse | null>(null)

  const { abilities, abilitiesLoaded } = useSelector(useAbilitySelector)
  const { userInfo } = useSelector(userSelector)

  const checkRole = schoolIdValue ? schoolIdValue : userInfo ? userInfo.role.roleCode === RoleCodeData.ADMIN ? "" : userInfo.schoolId : "";

  const handleClickOpenInfoDialog = (ability: AbilityResponse) => {
    setAbilityData(ability);
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setAbilityData(null);
    setOpenInfoDialog(false);
  };

  useEffect(() => {
    if (!abilitiesLoaded) if (userInfo) dispatch(fetchAbilities(checkRole))
  }, [abilitiesLoaded, dispatch, userInfo, schoolIdValue])

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'student', headerName: 'ชื่อนักเรียน', width: 250,
      renderCell: ({ row }) => {
        return <Box className="h-full flex items-center" >
          <Typography >{row.student.title}{"  "}{row.student.firstName}{"  "}{row.student.lastName}</Typography>
        </Box>
      },
    },
    {
      field: 'classRoom', headerName: 'ห้องเรียน', width: 200,
      renderCell: ({ row }) => {
        return row?.student?.classRoom?.classRoomNameTh
      },
    },
    {
      field: 'class', headerName: 'ชั้นเรียน', width: 200,
      renderCell: ({ row }) => {
        return row?.student?.class?.classNameTh
      },
    },
    {
      field: 'school',
      headerName: 'โรงเรียน',
      width: 250,
      renderCell: ({ row }) => {
        // console.log(row.student)
        return row.student?.school?.schoolNameTh ? <Chip label={row.student?.school?.schoolNameTh} variant="outlined" /> : ""
      }
    },
    {
      field: 'multipleIntelligences',
      headerName: 'ความสามารถ',
      width: 200,
      renderCell: ({ row }) => <MultipleIntelligencesRender multipleIntelligences={row.multipleIntelligences} />,
    },
    {
      field: 'action',
      headerName: 'ฟังก์ชัน',
      sortable: false,
      width: 300,
      renderCell: ({ row }) => (
        <Box className="flex gap-2 align-center h-full">
          <div>
            <Tooltip title="แก้ไขข้อมูล" >
              <IconButton onClick={() => route.push(`/ability/form?id=${row.id}`)} size="small" color='warning'>
                <EditIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="เพิ่มเติม">
              <IconButton onClick={() => handleClickOpenInfoDialog(row)} size="small" color='primary'>
                <InfoOutlinedIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        </Box>
      ),
    }
  ];

  const rows: AbilityResponse[] = abilities;

  return (
    <Box sx={{ width: screenWidth }}>
      <AbilityInfoDialog ability={abilityData} handleClose={handleCloseInfoDialog} open={openInfoDialog} />
      <Box className="flex justify-between items-end mb-4 gap-3">
        <Box>
          <Typography variant='h5' >
            นักเรียนที่มีความสามารถทั้งหมด{userInfo && userInfo?.role?.roleCode === RoleCodeData.ADMIN ? "ของระบบ" : ""}
          </Typography>
          <Typography variant='body1' >
            {userInfo && userInfo?.role?.roleCode === RoleCodeData.ADMIN ? "" : `(${userInfo?.school?.schoolNameTh ? userInfo?.school?.schoolNameTh : ""})`}
          </Typography>
        </Box>
        <Button onClick={() => route.push("/ability/form")} variant='contained' color='success' startIcon={<PersonAddIcon />} >
          เพิ่มนักเรียนที่มีความสามารถ
        </Button>
      </Box>
      <ToolbarAbility setSchoolIdValue={setSchoolIdValue} schoolIdValue={schoolIdValue} />
      <Box>
        <DataGrid
          rows={rows}
          rowHeight={90}
          columns={columns}
          loading={!abilitiesLoaded}
          className={`${!abilitiesLoaded || rows.length === 0 ? "h-[30rem] w-full" : "w-full"} `}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          localeText={{
            noRowsLabel: 'ไม่มีข้อมูล'
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

export default AbilityPage