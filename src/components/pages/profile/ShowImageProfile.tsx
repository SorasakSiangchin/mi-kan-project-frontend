import { productImageURL } from '@/utils/commonUtil';
import { Box, Paper } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import React, { FC } from 'react'

type Props = {
    data: any;
    imageUrl: string;
}

const ShowImageProfile: FC<Props> = ({ data, imageUrl }) => {
    const styleDrop: React.CSSProperties = {
        border: '2px dashed #000',
        padding: 15,
        textAlign: 'center',
        cursor: 'pointer',
        background: '#eee'
    };

    if (imageUrl) {
        return <Box className="flex justify-start w-full">
            <Paper style={styleDrop} variant='outlined'>
                <img src={imageUrl} alt="image-student" className='w-[100%] h-[100%]' />
            </Paper>
        </Box>
    }
    else {
        if (data) {
            if (data.imageUrl)
                return <Box className="flex justify-start w-full">
                    {data.imageUrl ? <Paper style={styleDrop} variant='outlined'>
                        <img src={productImageURL(data.imageUrl)} alt="image-student" className='w-[100%] h-[100%]' />
                    </Paper> : ""}
                </Box>
            else
                return <Box className="flex justify-start w-full">
                    <Paper style={styleDrop} variant='outlined'>
                        <ImageNotSupportedIcon className='w-[100%] h-[100%]' />
                    </Paper>
                </Box>
        }
        else {
            return;
        }
    }
}

export default ShowImageProfile