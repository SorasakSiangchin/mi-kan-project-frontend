import useClass from '@/hooks/useClass';
import useClassRoom from '@/hooks/useClassRoom';
import useGender from '@/hooks/useGender';
import { resetParam, setParam } from '@/store/slices/studentSlice';
import { useAppDispatch } from '@/store/store'
import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Fragment, useState } from 'react';

const ToolbarStudent = () => {

    const [genderValue, setGenderValue] = useState<string>("")
    const [classValue, setClassValue] = useState<string>("")
    const [classRoomValue, setClassRoomValue] = useState<string>("")
    const [statusValue, setStatusValue] = useState<string>("")

    const dispatch = useAppDispatch();

    const { classes, classesLoaded } = useClass();
    const { classRooms, classRoomsLoaded } = useClassRoom();
    const { genders, gendersLoaded } = useGender();

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

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatusValue(event.target.value);
        dispatch(setParam({ isAction: event.target.value !== "" ? false : true }))
    }

    const onRestore = () => {
        setGenderValue("")
        setClassValue("")
        setClassRoomValue("")
        setStatusValue("")
        dispatch(resetParam())
    }

    return (
        <Box className="w-full mb-4" >
            <Grid container spacing={2}>
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
                    <FormControl className='w-full' size="small">
                        <InputLabel id="demo-select-small-status">
                            สถานะ
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-status"
                            id="demo-select-status"
                            value={statusValue}
                            label="สถานะ"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="false">
                                ระงับการใช้งาน
                            </MenuItem>
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

export default ToolbarStudent