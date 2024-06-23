import { fetchRoles, useRoleSelector } from "@/store/slices/roleSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useRole = () => {
    const dispatch = useAppDispatch();
    const { roles, rolesLoaded } = useSelector(useRoleSelector);

    useEffect(() => {
        if (!rolesLoaded) dispatch(fetchRoles())
    }, [dispatch, rolesLoaded])

    return {
        roles,
        rolesLoaded
    }
}

export default useRole