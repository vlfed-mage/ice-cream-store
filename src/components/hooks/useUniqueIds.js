import { useRef } from "react";
import uniqid from 'uniqid';

const useUniqueIds = (count) => {
    const ids = useRef([...Array(count)].map(() => uniqid()));
    console.log(ids)
    return ids.current;
};

export default useUniqueIds;