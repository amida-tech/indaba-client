import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubNavEntry extends Component {
    render() {
        return (
            <div
                className={`col-sm-2 sub-nav-entry ${this.props.selected ?
                    'sub-nav-entry--selected' : ''} ${this.props.first ? ' col-sm-offset-1' : ''}`}
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
