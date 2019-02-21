import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserStatus from './UserStatus';

import { renderName } from '../../../utils/User';

class PMUserListRow extends Component {
    render() {
        return (
            <div className='pm-user-list-row'>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--hover'
                    onClick={this.props.onNameClick}>
                    {renderName(this.props.user)}
                </div>
                {
                    this.props.groups !== undefined
                    && <div className='pm-user-list-row__cell pm-user-list-row__cell--non-cursor'>
                        {
                            this.props.groups
                                .filter(g => g.users.includes(this.props.user.id))
                                .map(g => g.title).join(', ')
                        }
                    </div>
                }
                <div className='pm-user-list-row__cell pm-user-list-row__cell--non-cursor'>
                    <UserStatus user={this.props.user} vocab={this.props.vocab}/>
                </div>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--hover'>
                    <div className='pm-user-list-row__icon'>
                        <i className='far fa-envelope fa-lg' onClick={this.props.onMailClick}/>
                    </div>
                    <div className='pm-user-list-row__icon'>
                        <i className='far fa-trash-alt fa-lg' onClick={this.props.onDeleteClick}/>
                    </div>
                </div>
            </div>
        );
    }
}

PMUserListRow.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    onNameClick: PropTypes.func.isRequired,
    vocab: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onMailClick: PropTypes.func.isRequired,

    groups: PropTypes.arrayOf(PropTypes.object),
};

export default PMUserListRow;
