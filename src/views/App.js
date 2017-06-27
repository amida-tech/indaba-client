import React, { Component } from 'react';
import PrimaryNavContainer from './PrimaryNav';

class App extends Component {
    render() {
        return (
            <div>
                <PrimaryNavContainer />
                {this.props.children}
            </div>
        );
    }
}

export default App;
