export function isValid(rules, value, validateMessages) { // rules as array of rules
    if (rules.includes('number') && !Number.isNaN(value)) {
        return validateMessages.NUMBER;
    }
    if (rules.includes('letters') && !_isLetters(value)) {
        return validateMessages.LETTERS;
    }
    if (rules.includes('email') && !_isEmail(value)) {
        return validateMessages.EMAIL;
    }
    return '';
}

function _isEmail(value) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

function _isLetters(value) {
    const what = /^[A-Za-z]+$/.test(value);
    return what;
}
