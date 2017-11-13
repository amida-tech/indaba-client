import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'grommet';

import { renderName } from '../../../../utils/User';

class ToField extends Component {
    render() {
        return (
            <div className='to-field'>
                <Search
                    size='small'
                    value={[]}
                    suggestions={
                        this.props.users
                        .map(user => ({ label: renderName(user),
                            value: user }))} />
            </div>
        );
    }
}

ToField.propTypes = {

    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired,
        users: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};

export default ToField;
