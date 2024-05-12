import { fetchClasses, useClassSelector } from "@/store/slices/classSlice";
import { useAppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux";


const useClass = () => {

    const dispatch = useAppDispatch();
    const { classes, classesLoaded } = useSelector(useClassSelector);

    useEffect(() => {
        if (!classesLoaded) dispatch(fetchClasses())
    }, [dispatch, classesLoaded])

    return {
        classes,
        classesLoaded
    }
}

export default useClass