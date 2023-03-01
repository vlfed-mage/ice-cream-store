import { useEffect, useState } from 'react';

const useValidation = (value, errorId, showError, validationFn, isRequired = true, compareValue = null) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(validationFn(value, compareValue));
    }, [value, validationFn, compareValue]);

    return [
        error,
        {
            'aria-discribedby': error && showError ? errorId : null,
            'aria-invalid': error && showError ? 'true' : 'false',
            'aria-required': isRequired ? 'true' : null,
            required: isRequired,
        },
    ];
};

export default useValidation;
