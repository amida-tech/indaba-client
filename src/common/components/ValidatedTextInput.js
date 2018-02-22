import React from 'react';
import PropTypes from 'prop-types';

const ValidatedTextInput = ({
    meta: { touched, error },
    input,
    placeholder,
    className,
    password }) => {
    const finalClassName = [
        'validated-text-input',
        (touched && error) ? 'validated-text-input--error' : '',
        className || '',
    ].join(' ');
    const finalPlaceholder = (touched && error) ? error : placeholder;

    return (
        <input type={password ? 'password' : 'text'}
            className={finalClassName}
            placeholder={finalPlaceholder}
            {...input} />
    );
};

ValidatedTextInput.propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

export default ValidatedTextInput;
