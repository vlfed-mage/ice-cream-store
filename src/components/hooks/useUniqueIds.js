import { useRef } from 'react';

import uniqid from 'uniqid';

const useUniqueIds = count => {
    const ids = useRef([...Array(count)].map(() => uniqid()));
    return ids.current;
};

export default useUniqueIds;
