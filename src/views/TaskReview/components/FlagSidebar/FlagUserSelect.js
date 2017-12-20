import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'grommet';


class FlagUserSelect extends Component {
    render() {
        return (
            <Select
                value={this.props.input.value || this.props.userOptions[0]}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                options={this.props.userOptions} />
        );
    }
}

FlagUserSelect.propTypes = {
    userOptions: PropTypes.arrayOf(PropTypes.object),
};

export default FlagUserSelect;
