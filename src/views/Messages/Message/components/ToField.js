import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Search from '../../../../common/components/Search';
import { renderName } from '../../../../utils/User';
import Addressee from './Addressee';

class ToField extends Component {
    constructor(props) {
        super(props);

        this.searchFilter = this.searchFilter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdateToQuery = this.handleUpdateToQuery.bind(this);
    }

    searchFilter(user) {
        return !this.props.input.value.includes(user.email);
    }

    handleSelect(selection) {
        this.props.input.onChange(_.union(this.props.input.value,
            [selection.value.email]));
        this.props.actions.setToQuery('');
    }

    handleRemove(email) {
        this.props.input.onChange(
            this.props.input.value.filter(
                emailIter => emailIter !== email,
            ),
        );
    }

    handleUpdateToQuery(event) {
        this.props.actions.setToQuery(event.target.value);
    }

    render() {
        const submitFailed = this.props.meta.submitFailed;
        const touched = this.props.meta.touched;
        const valid = this.props.meta.valid;
        const toFieldSearchWrapperClassName = (submitFailed && !valid) || (touched && !valid)
            ? 'to-field__search-wrapper to-field__search-wrapper--error'
            : 'to-field__search-wrapper';
        return (
            <div className='to-field'>
                <div className={toFieldSearchWrapperClassName}>
                    <Search
                        value={this.props.query}
                        list={
                            this.props.users
                                .filter(this.searchFilter)
                                .filter(user => renderName(user).toLowerCase()
                                    .includes(this.props.query.toLowerCase()))
                                .map(user => ({ label: renderName(user), value: user }))
                        }
                        onBlur={() => this.props.input.onBlur(this.props.input.value)}
                        onChange={this.handleUpdateToQuery}
                        onSelect={this.handleSelect}
                    />
                    {
                        this.props.meta.touched && this.props.meta.error
                    }
                </div>
                {
                    this.props.input.value !== ''
                    && this.props.input.value.map(email => (
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
