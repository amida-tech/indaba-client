import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'grommet';


class FlagUserSelect extends Component {
    render() {
        return (
            <Select
                value={this.props.input.value.option || this.props.input.value}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                options={this.props.userOptions} />
        );
    }
    }

FlagUserSelect.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FlagUserSelect;
