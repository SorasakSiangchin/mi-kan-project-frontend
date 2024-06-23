import { fetchMultipleIntelligences, useMultipleIntelligencesSelector } from "@/store/slices/multipleIntelligencesSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const useMultipleIntelligences = () => {
    const dispatch = useAppDispatch();
    const { multipleIntelligences, multipleIntelligencesLoaded } = useSelector(useMultipleIntelligencesSelector);

    useEffect(() => {
        if (!multipleIntelligencesLoaded) dispatch(fetchMultipleIntelligences())
    }, [dispatch, multipleIntelligencesLoaded]);

    return {
        multipleIntelligences,
        multipleIntelligencesLoaded
    }
}

export default useMultipleIntelligences