import React from 'react';
import IonIcon from 'react-ionicons';
import { renderName } from '../../../../utils/User';

const Addressee = ({ users, email, onRemove }) => (
    <div className='addressee'>
        {renderName(users.find(user => user.email === email))}
        <div className='addressee__delete'
            onClick={() => onRemove(email)}>
            <IonIcon className='addressee__delete-icon'
                icon='ion-backspace-outline'/>
        </div>
    </div>
);

export default Addressee;
