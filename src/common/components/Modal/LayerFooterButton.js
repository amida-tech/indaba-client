import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LayerFooterButton extends Component {
    render() {
        return (
            <div
                className={`layer-footer-button ${this.props.primary ?
                    'layer-footer-button-primary' : ''}`}
                onClick={this.props.onClick}>
                {this.props.label}
            </div>
        );
    }
}

LayerFooterButton.propTypes = {
    onCancel: PropTypes.func,
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default LayerFooterButton;
