import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class FlagCount extends Component {
    render() {
        return (
            <div className='flag-count'>
                <IonIcon icon='ion-ios-flag'
                    className='flag-count__icon'/>
                <div className='flag-count__value'>
                    {this.props.value}
                </div>
            </div>
        );
    }
}

FlagCount.propTypes = {
    value: PropTypes.number.isRequired,
};

export default FlagCount;
