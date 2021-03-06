import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class StatusCard extends Component {
    render() {
        return (
            <div className={`status-card ${this.props.children ? 'status-card--icon' : ''}`}>
                <div className='status-card__left'>
                    {this.props.children}
                    <div className='status-card__name'>
                        <div className='status-card__name-label'>
                            {this.props.label}
                        </div>
                        <div className='status-card__name-value'
                            onClick={this.props.onEditClick}>
                            { this.props.name }
                            {this.props.onEditClick
                                && <div className='status-card__edit-icon'
                                    onClick={this.props.onEditClick}>
                                    <IonIcon icon='ion-android-create'
                                        className='status-card__edit-icon'/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={`status-card__status ${this.props.onStatusChangeClick ? 'status-card__status--editable' : ''}`}
                    onClick={this.props.onStatusChangeClick}>
                    {this.props.status}
                    {this.props.onStatusChangeClick
                        && <IonIcon icon='ion-android-create' className='status-card__create-icon'/>}
                </div>
            </div>
        );
    }
}

StatusCard.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onStatusChangeClick: PropTypes.func,
    onEditClick: PropTypes.func,
};

export default StatusCard;
