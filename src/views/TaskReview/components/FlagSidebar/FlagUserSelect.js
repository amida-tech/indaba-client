import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { find } from 'lodash';


class FlagUserSelect extends Component {
    render() {
        const value = find(this.props.userOptions, option =>
            option.value === this.props.input.value) || this.props.userOptions[0];
        return (
            <Select
                value={value}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                options={this.props.userOptions} />
        );
    }
}

FlagUserSelect.propTypes = {
    userOptions: PropTypes.arrayOf(PropTypes.object),
};

export default FlagUserSelect;
