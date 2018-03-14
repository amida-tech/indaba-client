import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class DeleteIconButton extends Component {
    render() {
        return (
            <div className='delete-icon-button' onClick={this.props.onClick}>
                <IonIcon icon='ion-android-delete' className='delete-icon-button__icon'/>
            </div>
        );
    }
}

DeleteIconButton.propTypes = {
    onClick: PropTypes.func,
};

export default DeleteIconButton;
