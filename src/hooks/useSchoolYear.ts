import { fetchSchoolYears, useSchoolYearsSelector } from "@/store/slices/schoolYearSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useSchoolYear = () => {
    const dispatch = useAppDispatch();
    const { schoolYears, schoolYearsLoaded } = useSelector(useSchoolYearsSelector);

    useEffect(() => {
        if (!schoolYearsLoaded) dispatch(fetchSchoolYears())
    }, [dispatch, schoolYearsLoaded])

    return {
        schoolYears,
        schoolYearsLoaded
    }
}

export default useSchoolYear