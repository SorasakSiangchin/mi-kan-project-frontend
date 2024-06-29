"use client"

import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { findMatchOptionAutocompleteSingle } from '@/utils/util';
import useMultipleIntelligences from '@/hooks/useMultipleIntelligences';
import { Controller, useForm } from 'react-hook-form';
import { userSelector } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { getStudentAll, studentSelector } from '@/store/slices/studentSlice';
import { useAppDispatch } from '@/store/store';
import { AbilityValidate } from './FormAbilityValidate';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { createAbility, fetchAbilityById, resetParam, updateAbility } from '@/store/slices/abilitySlice';
import { AbilityCreate } from '@/models/abilities/abilityCreate';
import { AbilityResponse } from '@/models/abilities/abilityResponse';
import { AbilityUpdate } from '@/models/abilities/abilityUpdate';
import { RoleCodeData } from '@/utils/constant';

export interface IInput {
    id?: string;
    multipleIntelligencesId: string;
    reasonNote?: string;
    studentId: string;
    schoolYear?: string;
    score?: number;
}


const initValues: IInput = {
    multipleIntelligencesId: "",
    studentId: "",
    schoolYear: "",
    reasonNote: "",
    score: 0
};


type Props = {
    id: string | undefined
}

const FormAbilityPage: FC<Props> = ({ id }) => {

    const route = useRouter();

    const dispatch = useAppDispatch();

    const { userInfo } = useSelector(userSelector);

    const { studentAll, studentAllLoaded } = useSelector(studentSelector);

    const [ability, setAbility] = useState<AbilityResponse | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    // พหุปัญญา 8 ด้าน
    const { multipleIntelligences, multipleIntelligencesLoaded } = useMultipleIntelligences();

    const { control, formState: { errors }, handleSubmit, setValue } = useForm<IInput>({
        defaultValues: initValues,
        //@ts-ignore
        resolver: yupResolver(AbilityValidate)
    });



    useEffect(() => {
        const loadAbility = async (id: string) => {
            const { data } = await dispatch(fetchAbilityById(id)).unwrap();
            setAbility(data)
            let ability: IInput = {
                id: data.id,
                multipleIntelligencesId: data.multipleIntelligencesId,
                studentId: data.studentId,
                reasonNote: data.reasonNote,
                schoolYear: data.schoolYear,
                score: data.score
            };

            for (const key in ability)
                setValue(key as keyof typeof ability, ability[key as keyof typeof ability])
        }

        if (id) loadAbility(id);
    }, [id, dispatch]);

    const checkRole = userInfo ? userInfo.role.roleCode === RoleCodeData.ADMIN ? "" : userInfo.schoolId : "";

    useEffect(() => {
        if (!studentAllLoaded) if (userInfo) dispatch(getStudentAll(checkRole))
    }, [userInfo, studentAllLoaded, dispatch]);

    const onSubmit = handleSubmit(async (value) => {

        let result: any;

        if (!id) result = await dispatch(createAbility({ ...value } as AbilityCreate)).unwrap();
        else result = await dispatch(updateAbility({ ...value } as AbilityUpdate)).unwrap();

        if (result.success === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                customClass: {
                    container: 'swal2-custom-font'
                },
                timer: 1500
            }).then(() => {
                dispatch(resetParam());
                route.push("/ability");
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: result.message,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                customClass: {
                    confirmButton: 'swal2-custom-font',
                    cancelButton: 'swal2-custom-font',
                    container: 'swal2-custom-font'
                }
            });
        }
    });

    return (
        <Box className="w-full">
            <Card variant="outlined">
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Box className={`flex ${isMobile ? "flex-col" : "flex-row"} flex-row justify-between mb-4`}>
                            <Box>
                                <Typography variant="h5">
                                    {!ability ? "เพิ่มข้อมูลนักเรียนที่มีความสามารถ" : "แก้ไขข้อมูลนักเรียนที่มีความสามารถ"}
                                </Typography>
                                {userInfo && userInfo.school.schoolNameTh &&
                                    <Typography variant="body1">
                                        ( {userInfo.school.schoolNameTh} )
                                    </Typography>
                                }
                            </Box>
                            <Box className="flex gap-2">
                                <Box>
                                    <Button onClick={() => route.push("/ability")} startIcon={<ArrowBackIcon />} variant="contained" color="inherit">
                                        กลับ
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        type="submit"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        color="success"
                                    >
                                        บันทึก
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Controller
                                    control={control}
                                    name='studentId'
                                    render={({ field }) => {
                                        return <Autocomplete
                                            {...field}
                                            value={findMatchOptionAutocompleteSingle(studentAll, field.value, "id")}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            onChange={(_, data) => field.onChange(data?.id)}
                                            loading={!studentAllLoaded}
                                            disabled={!studentAllLoaded}
                                            getOptionKey={(e) => e.id}
                                            getOptionLabel={(e) => e.fullName || ""}
                                            options={studentAll}
                                            renderInput={(params) =>
                                            (<TextField
                                                {...params}
                                                error={Boolean(errors.studentId?.message)}
                                                helperText={errors.studentId?.message?.toString()}
                                                label="นักเรียน" />)
                                            }
                                        />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Controller
                                    control={control}
                                    name='multipleIntelligencesId'
                                    render={({ field }) => {
                                        return <Autocomplete
                                            {...field}
                                            value={findMatchOptionAutocompleteSingle(multipleIntelligences, field.value, "id")}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            onChange={(_, data) => field.onChange(data?.id)}
                                            loading={!multipleIntelligencesLoaded}
                                            disabled={!multipleIntelligencesLoaded}
                                            getOptionKey={(e) => e.id}
                                            getOptionLabel={(e) => e.multipleIntelligencesName || ""}
                                            options={multipleIntelligences}
                                            renderInput={(params) =>
                                            (<TextField
                                                {...params}
                                                error={Boolean(errors.multipleIntelligencesId?.message)}
                                                helperText={errors.multipleIntelligencesId?.message?.toString()}
                                                label="ความสามารถ" />)
                                            }
                                        />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Controller
                                    control={control}
                                    name='reasonNote'
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            error={Boolean(errors.reasonNote?.message)}
                                            helperText={errors.reasonNote?.message?.toString()}
                                            className='w-full'
                                            label="หมายเหตุ"
                                            multiline
                                            rows={4}
                                        />
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

        </Box>
    )
}

export default FormAbilityPage