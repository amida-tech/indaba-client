import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'grommet';
import _ from 'lodash';

import { renderName } from '../../../../utils/User';
import Addressee from './Addressee';

class ToField extends Component {
    constructor(props) {
        super(props);

        this.searchFilter = this.searchFilter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    searchFilter(user) {
        return !this.props.input.value.includes(user.email);
    }
    handleSelect(selection) {
        this.props.input.onChange(_.union(this.props.input.value,
            [selection.suggestion.value.email]));
    }
    render() {
        return (
            <div className='to-field'>
                <Search
                    size='small'
                    suggestions={
                        this.props.users.filter(this.searchFilter)
                        .map(user => ({ label: renderName(user),
                            value: user }))}
                    onSelect={this.handleSelect}/>
                {
                    this.props.input.value !== '' &&
                    this.props.input.value.map(email => (
                        <Addressee key={email} email={email} users={this.props.users} />
                    ))
                }
            </div>
        );
    }
}

ToField.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,

    input: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string,
        ]).isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
};

export default ToField;
