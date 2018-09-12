import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterButton extends Component {
    render() {
        return (
            <div className={`footer-button ${this.props.primary
                ? 'footer-button__primary' : ''}`}
            onClick={this.props.onClick}>
                {this.props.label}
            </div>
        );
    }
}

FooterButton.propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default FooterButton;
