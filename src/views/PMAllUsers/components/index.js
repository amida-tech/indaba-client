import React, { Component } from 'react';
import { connect } from 'react-redux';

import PMUserList from '../../../common/components/PMUserList';

class PMAllUsersContainer extends Component {
    render() {
        return (
            <div className='pm-all-users-container'>
                <PMUserList {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    users: state.user.users,
});

export default connect(mapStateToProps)(PMAllUsersContainer);
