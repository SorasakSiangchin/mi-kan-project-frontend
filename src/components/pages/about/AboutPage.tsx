
"use client";

import { ExpandMore } from '@mui/icons-material';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material'
import Image from 'next/image';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AboutPage = () => {


    return (
        <Box className="w-4/5 m-auto" >
            <Typography variant='h5' className='text-center' >
                เกี่ยวกับระบบ
            </Typography>
            <Box className=" flex justify-center text-center mt-10" >
                <Card className='max-w-max ' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/home-page-graph.png"}
                            alt='home-page-graph'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            กราฟ (หน้าแรก)
                        </Typography>
                        <Typography className='mt-1' >
                            กราฟแสดงจำนวนของนักเรียนที่มีความสามารถของพหุปัญญาทั้ง 8 ด้าน โดยในมุมมองของโรงเรียนจะเห็นแค่นักเรียนในโรงเรียนนั้น ๆ และมุมมองของเขตจะเห็นนักเรียนทั้งหมดในระบบ
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="flex justify-center text-center mt-12" >
                <Card className='max-w-max' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/home-page-multiple-intelligences.png"}
                            alt='home-page-multiple-intelligences'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            ตารางแสดงพหุปัญญาทั้ง 8 ด้าน (หน้าแรก)
                        </Typography>
                        <Typography className='mt-1' >
                            ตารางแสดงพหุปัญญาทั้ง 8 ด้าน โดยจะแสดงจำนวนนักเรียน และร้อยละของนักเรียนที่มีความสามารถในด้านนั้น
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="flex justify-center text-center mt-12" >
                <Card className='max-w-max' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/home-page-student-multiple-intelligences.png"}
                            alt='home-page-student-multiple-intelligences'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            ตารางแสดงโรงเรียนทั้งหมดของเขต (หน้าแรก)
                        </Typography>
                        <Typography className='mt-1' >
                            ตารางแสดงโรงเรียนทั้งหมดของเขต และแสดงจำนวนกับร้อยละของนักเรียนที่มีความสามารถนั้น ๆ โดยตารางนี้จะสามารถเห็นได้ในมุงมองของเขตเท่านั้น
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="flex justify-center text-center mt-12" >
                <Card className='max-w-max' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/student-page-table.png"}
                            alt='student-page-table'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            ตารางแสดงข้อมูลของนักเรียน (หน้าข้อมูลของนักเรียน)
                        </Typography>
                        <Typography className='mt-1' >
                            ตารางแสดงข้อมูลของนักเรียน ซึ่งจะแสดงข้อมูลเบื้องต้นของนักเรียนและสามารถจัดการข้อมูลได้ โดยในมุมมองของโรงเรียนจะเห็นนักเรียนของโรงเรียนนั้น ๆ และในมุมมองของเขตจะเห็นนักเรียนทั้งหมดในระบบ
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="flex justify-center text-center mt-12" >
                <Card className='max-w-max' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/ability-page-table.png"}
                            alt='ability-page-table'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            ตารางแสดงนักเรียนที่มีความสามารถ (หน้านักเรียนที่มีความสามารถ)
                        </Typography>
                        <Typography className='mt-1' >
                            ตารางแสดงนักเรียนที่มีความสามารถของพหุปัญญา 8 ด้าน ซึ่งจะแสดงข้อมูลนักเรียนเบื้องต้นและความสามารถนั้น โดยสามารถจัดการข้อมูลในตารางนี้ได้ เช่น เพิ่มนักเรียนที่มีความสามารถ และแก้ไขข้อมูลนักเรียนที่มีความสามารถ เป็นต้น
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="flex justify-center text-center mt-12" >
                <Card className='max-w-max' variant='outlined' elevation={0} >
                    <CardContent>
                        <Image
                            className='m-auto w-full h-full'
                            priority
                            src={"static/img/about/profile-page.png"}
                            alt='profile-page'
                            width={1100}
                            height={550}
                        />
                        <Typography variant='h6' className='mt-2' >
                            ข้อมูลส่วนตัวของผู้ใช้งาน (หน้าข้อมูลส่วนตัว)
                        </Typography>
                        <Typography className='mt-1' >
                            หน้าข้อมูลส่วนตัวของผู้ใช้งาน ซึ่งจะแสดงข้อมูลส่วนตัวและช่องกรอกสำหรับเปลี่ยนรหัสผ่าน
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default AboutPage