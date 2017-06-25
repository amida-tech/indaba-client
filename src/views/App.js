import React, { Component } from 'react';
import NavContainer from './PrimaryNav';

class App extends Component {
    render() {
        return (
            <div>
                <NavContainer />
                {this.props.children}
            </div>
        );
    }
}

export default App;
