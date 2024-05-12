import { fetchSchools, useSchoolSelector } from '@/store/slices/schoolSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

const useSchool = () => {

    const dispatch = useAppDispatch();
    const { schools, schoolsLoaded } = useSelector(useSchoolSelector);

    useEffect(() => {
        if (!schoolsLoaded) dispatch(fetchSchools())
    }, [dispatch, schoolsLoaded])

    return {
        schools,
        schoolsLoaded
    }
}

export default useSchool