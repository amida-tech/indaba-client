import React, { Component } from 'react';
import { connect } from 'react-redux';

class PMAllUsersContainer extends Component {
    render() {
        return (
            <div className='pm-all-users-container'>
                PMAllUsersContainer
            </div>
        );
    }
}

export default connect()(PMAllUsersContainer);
