import React from 'react';
import PropTypes from 'prop-types';

export const StatusLabelType = {
    BAD: 'BAD',
    GOOD: 'GOOD',
    NEUTRAL: 'NEUTRAL',
};

const _modifiers = {
    [StatusLabelType.BAD]: 'bad',
    [StatusLabelType.GOOD]: 'good',
    [StatusLabelType.NEUTRAL]: 'neutral',
};

const StatusLabel = ({ label, type }) => <div className={`status-label status-label--${_modifiers[type]}`}>{label}</div>;

StatusLabel.propTypes = {
    type: PropTypes.oneOf(Object.keys(StatusLabelType)
        .map(entry => StatusLabelType[entry])).isRequired,
    label: PropTypes.string.isRequired,
};

export default StatusLabel;
