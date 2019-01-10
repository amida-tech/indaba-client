import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import IonIcon from 'react-ionicons';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { listOpen: false };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    // TODO: Moving away from letting Redux control every UI element.
    // In future, stop feeding value and onChange, let Search state handle it.
    // Move filtering functionality here but allow prop overrides.

    handleClick() {
        this.setState({ listOpen: !this.state.listOpen });
    }

    handleClickOutside() {
        this.setState({ listOpen: false });
    }

    handleSelect(evt) {
        this.props.onSelect(find(this.props.list, (group) => group.value.id === evt.target.value));
    }

    render() {
        return <div onBlur={this.handleClickOutside}>
            <div className='search'>
                <input className='search__input'
                    type='text'
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onClick={this.handleClick}
                />
                <IonIcon className='search__icon' icon='ion-android-search'/>
            </div>
            { this.state.listOpen && <ul className='search__list'>
                {this.props.list.map(item => (
                    <li className='search__entry'
                        onMouseDown={this.handleSelect}
                        value={item.value.id}
                        key={item.value.id}>
                        {item.label}{item.hint ?
                            <span className = 'search__hint'>{item.hint}</span> :''}
                        </li>
                ))} </ul>}
        </div>;
    }
}

Search.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
        hint: PropTypes.string,
    })).isRequired,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
};

export default Search;
