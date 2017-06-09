import React, { Component } from 'react';

class UserBadge extends Component {
    render() {
        const initials = this.props.user.name.split(' ')
            .map(n => n.slice(0, 1)).join('');
        return (<div className='user-badge'>{initials}</div>);
    }
}

export default UserBadge;
