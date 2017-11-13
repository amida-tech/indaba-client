import React from 'react';
import { renderName } from '../../../../utils/User';

const Addressee = ({ users, email, onRemove }) => (
    <div className='addressee'
        onClick={() => onRemove(email)}>
        {renderName(users.find(user => user.email === email))}
    </div>
);

export default Addressee;
