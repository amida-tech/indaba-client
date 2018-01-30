import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { find } from 'lodash';

class FlagUserSelect extends Component {
    render() {
        return (
            <Select
                value={find(this.props.userOptions, option =>
                    option.value === this.props.input.value) || this.props.userOptions[0]}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                clearable={false}
                disabled={this.props.disabled}
                options={this.props.userOptions} />
        );
    }
}

FlagUserSelect.propTypes = {
    userOptions: PropTypes.arrayOf(PropTypes.object),
};

export default FlagUserSelect;
