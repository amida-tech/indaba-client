import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as userActions from '../../../common/actions/userActions';
import PMAllUsers from './PMAllUsers';

class PMAllUsersContainer extends Component {
    render() {
        return (
            <PMAllUsers {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    users: state.user.users,
    ui: state.pmallusers.ui,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMAllUsersContainer);
