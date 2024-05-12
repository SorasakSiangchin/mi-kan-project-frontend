import { fetchTerms, useTermSelector } from "@/store/slices/termSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const useTerm = () => {
    const dispatch = useAppDispatch();
    const { terms, termsLoaded } = useSelector(useTermSelector);

    useEffect(() => {
        if (!termsLoaded) dispatch(fetchTerms())
    }, [dispatch, termsLoaded])

    return {
        terms,
        termsLoaded
    }
}

export default useTerm