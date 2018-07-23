import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { listOpen: false };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside() {
        this.setState(() => ({ listOpen: false }));
    }
    render() {
        return <div onBlur={() => this.handleClickOutside()}>
            <div className='search-input'>
                <input className='search-input__input'
                       type='text'
                       placeholder={this.props.placeholder}
                       value={this.props.value}
                       onChange={this.props.onChange}
                       onClick={() => { this.setState(prev => ({ listOpen: !prev.listOpen })); }}
                />
                <IonIcon className='search-input__icon' icon='ion-android-search'/>
            </div>
            { this.state.listOpen && <ul className='subject-list'>
                {this.props.list.map(item => (
                    <li className='subject-list__entry'
                        onMouseDown={() => { this.props.onSelect(item); }}
                        key={item.value.id}>
                        {item.label}</li>
                ))} </ul>}
        </div>;
    }
}

Search.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    list: PropTypes.array,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
};

export default Search;
