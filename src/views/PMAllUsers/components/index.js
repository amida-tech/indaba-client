import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as userActions from '../../../common/actions/userActions';
import PMUserList from '../../../common/components/PMUserList';
import { UserProfileContainer } from '../../../views/UserProfile';

class PMAllUsersContainer extends Component {
    render() {
        return (
            <div className='pm-all-users-container'>
                <PMUserList {...this.props}
                    onUserNameClick={this.props.actions.pmAllUsersShowProfile}
                    onUserDeleteClick={id =>
                        this.props.actions.deleteUser(id, this.props.vocab.ERROR)}/>
                {
                    this.props.ui.showProfile !== false &&
                    <UserProfileContainer userId={this.props.ui.showProfile}
                        onCancel={() => this.props.actions.pmAllUsersShowProfile(false)}
                        onSave={() => this.props.actions.pmAllUsersShowProfile(false)}/>
                }
            </div>
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
