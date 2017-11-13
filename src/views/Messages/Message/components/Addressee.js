import React from 'react';
import { renderName } from '../../../../utils/User';

const Addressee = ({ users, email }) => (
    <div className='addressee'>
        {renderName(users.find(user => user.email === email))}
    </div>
);

export default Addressee;
