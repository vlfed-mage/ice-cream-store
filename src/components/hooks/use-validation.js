import { useEffect, useState } from 'react';

const useValidation = (value, validationFn, compareValue = null) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(validationFn(value, compareValue));
    }, [value, validationFn, compareValue]);

    return error;
};

export default useValidation;
