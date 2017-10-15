import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubNavEntry extends Component {
    render() {
        return (
            <div
                className={`sub-nav-entry ${this.props.selected ?
                    'sub-nav-entry--selected' : ''} `}
                onClick={this.props.onClick}>
                {this.props.label}
            </div>
        );
    }
}

SubNavEntry.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    first: PropTypes.bool,
};

export default SubNavEntry;
