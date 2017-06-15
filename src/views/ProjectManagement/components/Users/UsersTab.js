import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UsersTab extends Component {
    render() {
        return (
            <div className='pm-users-tab'>
                <div className='pm-users-list-row'>
                    <div className='pm-users-list-row__cell'>
                        {this.props.vocab.COMMON.FIRST_NAME}
                    </div>
                    <div className='pm-users-list-row__cell'>
                        {this.props.vocab.COMMON.LAST_NAME}
                    </div>
                    <div className='pm-user-list-row__cell'>
                        {this.props.vocab.PROJECT.USER_GROUPS}
                    </div>
                    <div className='pm-user-list-row__cell'>
                        {this.props.vocab.PROJECT.SUBJECT}
                    </div>
                    <div className='pm-user-list-row__cell'>
                        {this.props.vocab.COMMON.ACTIONS}
                    </div>
                </div>
            </div>
        );
    }
}

UsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default UsersTab;
