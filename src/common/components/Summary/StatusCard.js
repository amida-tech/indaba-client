import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StatusCard extends Component {
    render() {
        return (
            <div className='status-card'>
                <div className='status-card__name'>
                    {this.props.children}
                    <div className='status-card__name-label'>
                        {this.props.label}
                    </div>
                    <div className='status-card__name-value'>
                        {this.props.name}
                    </div>
                </div>
                <div className='status-card__status'
                    onClick={this.props.onStatusChangeClick}>
                    {this.props.status}
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
};

export default StatusCard;
