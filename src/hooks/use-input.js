import { useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT':
            return { value: action.value, isTouched: state.isTouched };
        case 'BLUR':
            return { isTouched: true, value: state.value };
        case 'RESET':
            return { isTouched: false, value: '' };
        default:
            return initialInputState;
    }
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState,
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (e) => {
        dispatch({ type: 'INPUT', value: e.target.value });
    };

    const inputBlurHandler = (e) => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
