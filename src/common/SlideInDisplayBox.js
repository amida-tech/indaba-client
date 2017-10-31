import React from 'react';
import PropTypes from 'prop-types';

const SlideInDisplayBox = ({id, children, visible, color = 'warning', direction = 'right', onClick }) =>
    <div
        id={id}
        className={[
            'slideInDisplayBox',
            `slideInDisplayBox--${visible ? 'visible' : 'hidden'}`,
            `slideInDisplayBox--${direction}`,
            color,
            onClick ? 'slideInDisplayBox--clickable' : ''].join(' ')}
        onClick={onClick}>
        { children }
    </div>;

SlideInDisplayBox.propTypes = {
    id: PropTypes.string,
    visible: PropTypes.bool,
    color: PropTypes.oneOf([
        'light', 'white',
        'success', 'green',
        'confirm', 'lightGreen',
        'alert', 'yellow',
        'warning', 'red',
        'info', 'purple',
        'system', 'navy',
        'dark'
    ]),
    direction: PropTypes.oneOf([
        'right', 'left'
    ]),
    onClick: PropTypes.func,
};

export default SlideInDisplayBox;
