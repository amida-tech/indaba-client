import React, { Component } from 'react';


class SecondaryNavContainer extends Component {
    render() {
        return (
            <nav className='secondary-nav'>
                <div className='secondary-nav__left'>
                    <img src="/src/assets/indaba-logo-white.svg"
                        className="secondary-nav__indaba-logo"/>
                </div>
            </nav>
        );
    }
}

export default SecondaryNavContainer;
