import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            showMenu: false,
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    openMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    handleClick(event) {
        if (this.props.type) { // To allow the handleClick to be agnostic to its use.
            this.props.handleOptionSelection(this.props.type, event.target.value);
        } else {
            this.props.handleOptionSelection(event.target.value);
        }
    }

    render() {
        return (
            <div className='menu'
                onClick={this.openMenu}>
                <IonIcon icon='ion-ios-plus'
                    className='menu__icon'/>
                { this.state.showMenu ? (
                    <div className='menu__dropdown'>
                        <span className='menu__insert-label'>
                            {this.props.vocab.SURVEY.INSERT_INTO}
                        </span>
                        <div className='menu__options'>
                            {this.props.options.map(option => <button className='menu__button'
                                key={`question-menu${this.props.type}${option.value}`}
                                value={option.value}
                                onClick={this.handleClick}>
                                {option.label}
                            </button>)}
                        </div>
                    </div>
                ) : (null)
                }
            </div>
        );
    }
}

Menu.propTypes = {
    vocab: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string,
    handleOptionSelection: PropTypes.func.isRequired,
};

export default Menu;
