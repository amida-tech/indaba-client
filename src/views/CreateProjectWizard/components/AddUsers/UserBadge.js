import React from 'react';
import { renderInitials } from '../../../../utils/User';

const UserBadge = props => <div className='user-badge'>{renderInitials(props.user)}</div>;

export default UserBadge;
