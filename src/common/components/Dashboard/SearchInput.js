import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class SearchInput extends Component {
    render() {
        return (
            <div className='search-input'>
                <input className='search-input__input'
                    type='text'
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    value={this.props.value} />
                <IonIcon className='search-input__icon'
                    icon='ion-android-search' />
            </div>
        );
    }
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default SearchInput;
