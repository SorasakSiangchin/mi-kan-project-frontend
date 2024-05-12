import { fetchGenders, useGenderSelector } from '@/store/slices/genderSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

const useGender = () => {
    const dispatch = useAppDispatch();
    const { genders, gendersLoaded } = useSelector(useGenderSelector);

    useEffect(() => {
        if (!gendersLoaded) dispatch(fetchGenders())
    }, [dispatch, gendersLoaded])

    return {
        genders,
        gendersLoaded
    }
}

export default useGender