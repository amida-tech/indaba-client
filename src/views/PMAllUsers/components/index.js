import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actions from '../actions';
import * as userActions from '../../../common/actions/userActions';
import { checkProtection } from '../../../common/actions/navActions';
import PMAllUsers from './PMAllUsers';

class PMAllUsersContainer extends Component {
    componentWillMount() {
        this.props.actions.checkProtect(this.props.profile);
    }

    render() {
        return (
            <PMAllUsers {...this.props} />
        );
    }
}

const mapStateToProps = store => ({
    vocab: store.settings.language.vocabulary,
    users: store.user.users,
    ui: store.pmallusers.ui,
    organizationId: store.user.profile.organizationId,
    profile: store.user.profile,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions, { checkProtection },
        { sendMessage: user => dispatch(push(
            {
                pathname: '/messages/new',
                state: { message: { to: [user.email] } },
            },
        )) },
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMAllUsersContainer);
