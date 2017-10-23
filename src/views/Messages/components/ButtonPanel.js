import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonPanel extends Component {
    render() {
        return (
            <div className='button-panel'>
                {
                    this.props.children.map(child =>
                        <div className='button-panel__button' key={child.props.listKey}>
                            {child}
                        </div>,
                    )
                }
            </div>
        );
    }
}

ButtonPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ButtonPanel;
