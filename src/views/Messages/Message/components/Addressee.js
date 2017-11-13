import React from 'react';
import { renderName } from '../../../../utils/User';

export const Addressee = ({ users, email }) => (
    <div className='addressee'>
        {renderName(users.find(user => user.email === email))}
    </div>
);
