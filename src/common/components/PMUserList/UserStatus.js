import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class UserStatus extends Component {
    render() {
        return (
            <div className='user-status'>
                {this.props.user.lastActive === null && !this.props.user.isActive ?
                    this.props.vocab.COMMON.PENDING :
                    <IonIcon icon='ion-android-checkmark-circle'
                        className={`user-status__icon${this.props.user.isActive ? '' : '--inactive'}`} />}
            </div>
        );
    }
}

UserStatus.propTypes = {
    user: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default UserStatus;
