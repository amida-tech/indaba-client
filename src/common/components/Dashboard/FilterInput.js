import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class FilterInput extends Component {
    render() {
        return (
            <div className='filter-input'>
                <input className='filter-input__input'
                    type='text'
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    value={this.props.value} />
                <IonIcon className='filter-input__icon'
                    icon='ion-android-search' />
            </div>
        );
    }
}

FilterInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default FilterInput;
