
import useClass from '@/hooks/useClass';
import useClassRoom from '@/hooks/useClassRoom';
import useGender from '@/hooks/useGender';
import useMultipleIntelligences from '@/hooks/useMultipleIntelligences';
import { resetParam, setParam } from '@/store/slices/abilitySlice';
import { useAppDispatch } from '@/store/store';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { FC, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import useSchool from '@/hooks/useSchool';
import { userSelector } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { RoleCodeData } from '@/utils/constant';

type Props = {
    setSchoolIdValue: (value: string) => void;
    schoolIdValue: string
}

const ToolbarAbility: FC<Props> = ({ schoolIdValue, setSchoolIdValue }) => {

    const dispatch = useAppDispatch();
    const { userInfo } = useSelector(userSelector);

    const [genderValue, setGenderValue] = useState<string>("")
    const [classValue, setClassValue] = useState<string>("")
    const [classRoomValue, setClassRoomValue] = useState<string>("")
    const [multipleIntelligencesValue, setMultipleIntelligencesValue] = useState<string>("")
    const [studentNameValue, setStudentNameValue] = useState<string>("")

    const { classes } = useClass();
    const { classRooms } = useClassRoom();
    const { genders } = useGender();
    const { multipleIntelligences } = useMultipleIntelligences();
    const { schools } = useSchool();

    const handleChangeSchool = (event: SelectChangeEvent) => {
        setSchoolIdValue(event.target.value);
        dispatch(setParam({ schoolId: event.target.value })) // เพือให้มัน refrech เฉย
    }

    const handleChangeGender = (event: SelectChangeEvent) => {
        setGenderValue(event.target.value);
        dispatch(setParam({ genderId: event.target.value }))
    }

    const handleChangeClass = (event: SelectChangeEvent) => {
        setClassValue(event.target.value);
        dispatch(setParam({ classId: event.target.value }))
    }

    const handleChangeClassRoom = (event: SelectChangeEvent) => {
        setClassRoomValue(event.target.value);
        dispatch(setParam({ classRoomId: event.target.value }))
    }

    const handleChangeMultipleIntelligences = (event: SelectChangeEvent) => {
        setMultipleIntelligencesValue(event.target.value);
        dispatch(setParam({ multipleIntelligencesId: event.target.value }))
    }

    const onRestore = () => {
        setSchoolIdValue("")
        setGenderValue("")
        setClassValue("")
        setClassRoomValue("")
        setMultipleIntelligencesValue("")
        setStudentNameValue("")
        dispatch(resetParam())
    }

    return (
        <Box className="w-full mb-4" >
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <FormControl className='w-full' size="small">
                        <InputLabel id="demo-select-small-gender">พหุปัญญา 8 ด้าน</InputLabel>
                        <Select
                            labelId="demo-select-small-gender"
                            id="demo-select-gender"
                            value={multipleIntelligencesValue}
                            label="พหุปัญญา 8 ด้าน"
                            onChange={handleChangeMultipleIntelligences}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {multipleIntelligences.map(m =>
                                <MenuItem key={m.id} value={m.id}>{m.multipleIntelligencesName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    userInfo?.role.roleCode === RoleCodeData.ADMIN ? <Grid item xs={12} md={2}>
                        <FormControl className='w-full' size="small">
                            <InputLabel id="demo-select-small-school">โรงเรียน</InputLabel>
                            <Select
                                labelId="demo-select-small-school"
                                id="demo-select-school"
                                value={schoolIdValue}
                                label="โรงเรียน"
                                onChange={handleChangeSchool}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {schools.map(s =>
                                    <MenuItem key={s.id} value={s.id}>{s.schoolNameTh}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid> : ""
                }
                <Grid item xs={12} md={2}>
                    <TextField
                        size='small'
                        className='w-full'
                        placeholder='ค้นหาชื่อนักเรียน'
                        value={studentNameValue}
                        onChange={(e) => {
                            setStudentNameValue(e.target.value)
                            dispatch(setParam({ studentName: e.target.value }))
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }} />
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <FormControl className='w-full' size="small">
                        <InputLabel id="demo-select-small-gender">เพศ</InputLabel>
                        <Select
                            labelId="demo-select-small-gender"
                            id="demo-select-gender"
                            value={genderValue}
                            label="เพศ"
                            onChange={handleChangeGender}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {genders.map(g =>
                                <MenuItem key={g.id} value={g.id}>{g.genderNameTh}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <FormControl className='w-full' size="small">
                        <InputLabel id="demo-select-small-class">ชั้นเรียน</InputLabel>
                        <Select
                            labelId="demo-select-small-class"
                            id="demo-select-class"
                            value={classValue}
                            label="ชั้นเรียน"
                            onChange={handleChangeClass}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {classes.map(g =>
                                <MenuItem key={g.id} value={g.id}>{g.classNameTh}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <FormControl className='w-full' size="small">
                        <InputLabel id="demo-select-small-classRoom">ห้องเรียน</InputLabel>
                        <Select
                            labelId="demo-select-small-classRoom"
                            id="demo-select-classRoom"
                            value={classRoomValue}
                            label="ห้องเรียน"
                            onChange={handleChangeClassRoom}
                        >
                            <MenuItem value="">
                                <em>None</em>s
                            </MenuItem>
                            {classRooms.map(g =>
                                <MenuItem key={g.id} value={g.id}>{g.classRoomNameTh}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <Button onClick={onRestore} variant='contained' color='inherit'>
                        คืนค่า
                    </Button>
                </Grid>

                {/* <Grid item xs={12} md={2.4}>
            <Autocomplete
                disablePortal
                size='small'
                options={[]}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
        </Grid>
        <Grid item xs={12} md={2.4}>
            <Autocomplete
                disablePortal
                size='small'
                options={[]}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
        </Grid> */}
            </Grid>
        </Box>
    )
}

export default ToolbarAbility;