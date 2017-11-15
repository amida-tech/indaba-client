import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'grommet';
import _ from 'lodash';
import { Field, change } from 'redux-form';

import { renderName } from '../../../../utils/User';
import Addressee from './Addressee';

class ToField extends Component {
    constructor(props) {
        super(props);

        this.searchFilter = this.searchFilter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    searchFilter(user) {
        return !this.props.input.value.includes(user.email);
    }
    handleSelect(selection, dispatch) {
        this.props.input.onChange(_.union(this.props.input.value,
            [selection.suggestion.value.email]));
        dispatch(change(this.props.meta.form, 'to-search', ''));
    }
    handleRemove(email) {
        this.props.input.onChange(
            this.props.input.value.filter(
                emailIter => emailIter !== email));
    }
    render() {
        return (
            <div className='to-field'>
                <div className='to-field__search-wrapper'>
                    <Field name='to-search'
                        component={props =>
                            <Search onDOMChange={evt => props.input.onChange(evt.target.value)}
                                value={props.input.value}
                                suggestions={
                                    this.props.users
                                        .filter(this.searchFilter)
                                        .filter(user => renderName(user).toLowerCase()
                                            .includes(props.input.value.toLowerCase()))
                                    .map(user => ({ label: renderName(user),
                                        value: user }))}
                                        onSelect={selection =>
                                            this.handleSelect(selection,
                                                this.props.meta.dispatch)} />
                            }/>
                </div>
                {
                    this.props.input.value !== '' &&
                    this.props.input.value.map(email => (
                        <Addressee key={email} email={email} users={this.props.users}
                            onRemove={this.handleRemove}/>
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
