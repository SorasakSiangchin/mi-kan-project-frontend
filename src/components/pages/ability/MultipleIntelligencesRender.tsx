import { MultipleIntelligencesResponse } from '@/models/multipleIntelligences/multipleIntelligencesResponse'
import { MultipleIntelligencesCodeData } from '@/utils/constant';
import { Chip } from '@mui/material';
import React, { FC } from 'react'


const MultipleIntelligencesRender: FC<{ multipleIntelligences: MultipleIntelligencesResponse, size?: 'small' | 'medium' }> =
    ({ multipleIntelligences, size = "medium" }) => {

        switch (multipleIntelligences.multipleIntelligencesCode) {
            case MultipleIntelligencesCodeData.ARTDIMENSIONS:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} style={{ color: '#964B00', borderColor: '#964B00' }} variant="outlined" />

            case MultipleIntelligencesCodeData.HEARING:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="default" variant="outlined" />

            case MultipleIntelligencesCodeData.LANGUAGE:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="error" variant="outlined" />

            case MultipleIntelligencesCodeData.MATHEMATICS:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} style={{ color: '#FF7F50', borderColor: '#FF7F50' }} variant="outlined" />

            case MultipleIntelligencesCodeData.MECHANICAL:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="warning" variant="outlined" />

            case MultipleIntelligencesCodeData.MUSCLEMOVEMENT:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="secondary" variant="outlined" />

            case MultipleIntelligencesCodeData.SCIENCE:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="info" variant="outlined" />

            case MultipleIntelligencesCodeData.SOCIALANDEMOTIONAL:
                return <Chip size={size} label={multipleIntelligences.multipleIntelligencesName} color="primary" variant="outlined" />

            default: return <></>
        }
    }

export default MultipleIntelligencesRender