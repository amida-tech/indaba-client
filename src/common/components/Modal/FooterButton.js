import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterButton extends Component {
    render() {
        return (
            <button className={this.props.primary ? 'footer-button__primary' : 'footer-button__cancel'}
                onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }
}

FooterButton.propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default FooterButton;
