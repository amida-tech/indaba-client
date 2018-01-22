import React, { Component } from 'react';

import IndabaLogoWhite from '../../assets/indaba-logo-white.svg';

class SecondaryNavContainer extends Component {
    render() {
        return (
            <nav className='secondary-nav'>
                <div className='secondary-nav__left'>
                    <img src={IndabaLogoWhite}
                        className="secondary-nav__indaba-logo"/>
                </div>
            </nav>
        );
    }
}

export default SecondaryNavContainer;
