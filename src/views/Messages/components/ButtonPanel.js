import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PanelButton extends Component {
    render() {
        return (
            <div className='button-panel__button' {...this.props}
                onClick={
                    this.props.onClick
                    && ((evt) => {
                        evt.stopPropagation();
                        this.props.onClick(evt);
                    })
                }>
                {this.props.children}
            </div>
        );
    }
}

class ButtonPanel extends Component {
    render() {
        return (
            <div className='button-panel'>
                { this.props.children }
            </div>
        );
    }
}

ButtonPanel.propTypes = {
    children: PropTypes.any,
};

export default ButtonPanel;
