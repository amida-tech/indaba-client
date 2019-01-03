import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            showMenu: false,
        }
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    openMenu(event) {
        event.preventDefault();
        this.setState({
            showMenu: true,
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            console.log('replication?');
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div className='menu'>
                <IonIcon icon='ion-ios-plus'
                    className='menu__icon'
                    onClick={this.openMenu}/>
                { this.state.showMenu ? (
                    <div className='menu__dropdown'>
                        <span className='menu__insert-label'>
                            {this.props.vocab.SURVEY.INSERT_INTO}
                        </span>
                        <div className='menu__options'>
                            {this.props.options.map(option => <div className='menu__button'
                                key={`question-menu${this.props.type}${option.value}`}
                                onClick={this.props.handleInsert(this.props.type, option.value)}>
                                {option.label}
                            </div>)}
                        </div>
                    </div>
                    ) : (null)
                }
            </div>
        )
    }
}

Menu.propTypes = {
    vocab: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string.isRequired,
    handleInsert: PropTypes.func.isRequired,
};

export default Menu;
