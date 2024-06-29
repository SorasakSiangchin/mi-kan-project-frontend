"use client"

import React from 'react'
import { Box, Typography, Button, useMediaQuery } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const IndexPage = () => {

    const router = useRouter()

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box style={{
            backgroundImage: 'url("/static/img/bg-index.png")',
            width: isMobile ? "100%" : "100vw",
            height: isMobile ? "120vh" : "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }} >
            <Box className="flex flex-col justify-center items-center w-full h-full" >
                <Box>
                    <Image src="/static/img/logo-mi.png" alt="img-logo" width={150} height={150} />
                </Box>
                <Typography variant='h6' className='text-customBlue text-white text-center'>
                    ระบบฐานข้อมูลสารสนเทศการพัฒนาผู้เรียนตามแนวทางพหุปัญญา
                </Typography>
                <Typography variant='body2' className='text-customBlue text-white text-center'>
                    สำนักงานเขตพื้นที่การศึกษาประถมศึกษากาญจนบุรี เขต 1
                </Typography>
                <Box className="bg-blur px-4 py-3 mt-3 w-[30rem] " >
                    <Typography variant="h6" className="text-white text-center" >
                        Information database system for student development according to the multiple intelligences approach
                        Kanchanaburi Primary Educational Service Area Office 1
                        IDMI Kan1
                    </Typography>
                    <Box className="mt-2" >
                        <Typography className="text-white text-center">
                            พัฒนาโดย
                        </Typography>
                        <Typography className="text-white text-center" >
                            นางสาวศศิชา ทรัพย์ล้น ศึกษานิเทศก์ชำนาญการพิเศษ
                        </Typography>
                        <Typography className="text-white text-center" >
                            นายพนภาค ผิวเกลี้ยง ศึกษานิเทศก์ชำนาญการพิเศ
                        </Typography>
                    </Box>
                </Box>
                <Box className="mt-4" >
                    <Button
                        endIcon={<ArrowForwardIcon />}
                        variant="outlined"
                        className="transition-box"
                        onClick={() => router.push('/login')}
                        sx={{
                            borderColor: '#33568A',
                            color: '#33568A',
                            '&:hover': {
                                borderColor: '#33568A',
                            },
                        }}
                    >
                        เข้าสู่ระบบ
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default IndexPage