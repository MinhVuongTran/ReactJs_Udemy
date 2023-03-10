import useInput from '../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        inputBlurHandler: firstNameBlurHandler,
        valueChangeHandler: firstNameChangeHandler,
        reset: resetFirstName,
    } = useInput(isNotEmpty);

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        inputBlurHandler: lastNameBlurHandler,
        valueChangeHandler: lastNameChangeHandler,
        reset: resetLastName,
    } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        inputBlurHandler: emailBlurHandler,
        valueChangeHandler: emailChangeHandler,
        reset: resetEmail,
    } = useInput(isEmail);

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        console.log(firstNameValue);
        console.log(lastNameValue);
        console.log(emailValue);

        resetFirstName();
        resetLastName();
        resetEmail();
    };

    const firstNameClasses = firstNameHasError
        ? 'form-control invalid'
        : 'form-control';
    const lastNameClasses = lastNameHasError
        ? 'form-control invalid'
        : 'form-control';
    const emailClasses = emailHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={firstNameClasses}>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        value={firstNameValue}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    {firstNameHasError && (
                        <p className='error-text'>Please enter first name.</p>
                    )}
                </div>
                <div className={lastNameClasses}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        value={lastNameValue}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    {lastNameHasError && (
                        <p className='error-text'>Please enter last name.</p>
                    )}
                </div>
            </div>
            <div className={emailClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='email'
                    id='email'
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailHasError && (
                    <p className='error-text'>Please enter email address.</p>
                )}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
