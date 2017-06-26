import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';
import UserStatus from './UserStatus';

import { renderName } from '../../../../../utils/User';

class PMUserListRow extends Component {
    render() {
        const groups = this.props.groups.filter(g => g.users.includes(this.props.user.id))
            .map(g => g.name).join(', ');
        const subjects = this.props.tasks.filter(task =>
            task.id === this.props.user.id)
            .map(task => this.props.subjects[task.subject])
            .join(', ');
        return (
            <div className='pm-user-list-row'>
                <div className='pm-user-list-row__cell'
                    onClick={this.props.onNameClick}>
                    {renderName(this.props.user)}
                </div>
                <div className='pm-user-list-row__cell'>
                    {groups}
                </div>
                <div className='pm-user-list-row__cell'>
                    {subjects}
                </div>
                <div className='pm-user-list-row__cell'>
                    <UserStatus user={this.props.user} vocab={this.props.vocab}/>
                </div>
                <div className='pm-user-list-row__cell'>
                    <IonIcon icon='ion-android-delete' color='#A4AEBF'/>
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
    }).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNameClick: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default PMUserListRow;
