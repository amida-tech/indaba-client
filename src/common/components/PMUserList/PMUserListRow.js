import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';
import UserStatus from './UserStatus';
import DeleteIconButton from '../../../common/components/DeleteIconButton';

import { renderName } from '../../../utils/User';

class PMUserListRow extends Component {
    render() {
        const groups = this.props.groups.filter(g => g.users.includes(this.props.user.id))
            .map(g => g.title).join(', ');
        return (
            <div className='pm-user-list-row'>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--hover'
                    onClick={this.props.onNameClick}>
                    {renderName(this.props.user)}
                </div>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--non-cursor'>
                    {groups}
                </div>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--non-cursor'>
                    <UserStatus user={this.props.user} vocab={this.props.vocab}/>
                </div>
                <div className='pm-user-list-row__cell pm-user-list-row__cell--hover'>
                    <DeleteIconButton onClick={this.props.onDeleteClick}/>
                    <IonIcon icon='ion-android-mail' color='#A4AEBF' />
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
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNameClick: PropTypes.func.isRequired,
    vocab: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default PMUserListRow;
