import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class UserStatus extends Component {
    render() {
        const color = this.props.user.activationDate ? '#4EB276' : '#A4AEBF';
        return (
            <div className='user-status'>
                {this.props.user.invited ?
                    this.props.vocab.COMMON.PENDING :
                    <IonIcon icon='ion-android-checkmark-circle' color={color}/>}
            </div>
        );
    }
}

UserStatus.propTypes = {
    user: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default UserStatus;
