import React, { Component } from 'react';
import PrimaryNavContainer from './PrimaryNav';

class App extends Component {
    render() {
        return (
            <div>
                <PrimaryNavContainer />
                <div className="main-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
