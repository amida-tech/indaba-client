import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubNavEntry extends Component {
    render() {
        return (
            <div
                className={`sub-nav-entry col-sm-2 ${this.props.selected ? ' selected' : ''} ${this.props.first ? ' col-sm-offset-1' : ''}`}
                onClick={this.props.onClick}>
                {this.props.label}
            </div>
        );
    }
}

SubNavEntry.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.string,
    first: PropTypes.bool,
};

export default SubNavEntry;
