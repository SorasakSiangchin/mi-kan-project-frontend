"use client"

import { StudentResponse } from '@/models/students/studentResponse'
import { formatDateForMUIDatePicker } from '@/utils/util'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    student: StudentResponse
}

const StudentDetailPage: FC<Props> = ({
    student
}) => {

    const router = useRouter();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    console.log(student)
    return (
        <Box className="flex justify-center mt-5 w-full">
            <Box className={isMobile ? "w-full" : "w-4/5"}>
                <Card className='shadow-lg' >
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <CardMedia
                                    component="img"
                                    className='w-full rounded-md'
                                    image={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${student.imageUrl}`}
                                    alt="Live from space album cover"
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <Card className='w-full p-2' variant="outlined" >
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} md={6}>
                                            <Typography className='text-center'>
                                                <u>
                                                    ข้อมูลส่วนตัว
                                                </u>
                                            </Typography>
                                            <List>
                                                <ListItemText
                                                    title='ชื่อ : '
                                                    data={`${student.firstName} ${student.lastName}`}
                                                />
                                                <ListItemText
                                                    title='อีเมล : '
                                                    data={student.email}
                                                />
                                                <ListItemText
                                                    title='วันเกิด : '
                                                    data={formatDateForMUIDatePicker(new Date(student.birthday))}
                                                />
                                                <ListItemText
                                                    title='เบอร์โทร : '
                                                    data={student.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                                                />
                                                <ListItemText
                                                    title='เลขประจําตัวประชาชน : '
                                                    data={student.idCard}
                                                />
                                                <ListItemText
                                                    title='ศาสนา : '
                                                    data={student.religion}
                                                />
                                                <ListItemText
                                                    title='งานอดิเรก :'
                                                    data={student.hobby}
                                                />
                                            </List>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography className='text-center'>
                                                <u>ข้อมูลการศึกษา</u>
                                            </Typography>
                                            <List>
                                                <ListItemText
                                                    title='ชื่อโรงเรียน : '
                                                    data={student.school.schoolNameTh}
                                                />
                                                <ListItemText
                                                    title='ชั้นเรียน : '
                                                    data={student.class.classNameTh}
                                                />
                                                <ListItemText
                                                    title='ห้องเรียน : '
                                                    data={student.classRoom.classRoomNameTh}
                                                />
                                                <ListItemText
                                                    title='ปีการศึกษา : '
                                                    data={student.schoolYear.schoolYearNameTh}
                                                />
                                                <ListItemText
                                                    title='ภาคเรียน : '
                                                    data={student.term.termNameTh}
                                                />
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className='flex justify-end' >
                        <Button
                            variant='contained'
                            color='inherit'
                            startIcon={<ArrowBackIcon />}
                            onClick={() => router.push('/student')}
                        >
                            กลับ
                        </Button>
                    </CardActions>
                </Card>
            </Box>

        </Box>
    )
}

const ListItemText = ({ data, title }: { title: string, data: string }) => {
    return <ListItem className='' >
        <Typography variant='body2' className='mr-1 flex max-w-max'>
            {title} <i className='ml-1 max-w-max break-all' >{data}</i>
        </Typography>

    </ListItem>
}

export default StudentDetailPage