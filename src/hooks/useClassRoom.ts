import { fetchClassRooms, useClassRoomSelector } from '@/store/slices/classRoomSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

const useClassRoom = () => {
    const dispatch = useAppDispatch();
    const { classRooms, classRoomsLoaded } = useSelector(useClassRoomSelector);

    useEffect(() => {
        if (!classRoomsLoaded) dispatch(fetchClassRooms())
    }, [classRoomsLoaded, dispatch]);

    return {
        classRooms,
        classRoomsLoaded
    }
}

export default useClassRoom