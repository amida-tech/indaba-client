import React, { Component } from 'react';
import PrimaryNavContainer from './PrimaryNav';
import SecondaryNavContainer from './SecondaryNav';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.location.pathname === '/login' ?
                    <SecondaryNavContainer /> :
                    <PrimaryNavContainer /> }
                <div className='main-body'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
