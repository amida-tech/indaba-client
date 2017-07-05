import React, { Component } from 'react';
import PrimaryNavContainer from './PrimaryNav';

class App extends Component {
    render() {
        return (
            <div>
                <PrimaryNavContainer />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
