import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { renderName } from '../../../utils/User';

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
    organizationId: state.user.profile.organizationId,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions,
        { sendMessage: user => dispatch(push(
            {
                pathname: '/messages/new',
                state: { message: { to: renderName(user) } },
            },
        )) },
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMAllUsersContainer);
