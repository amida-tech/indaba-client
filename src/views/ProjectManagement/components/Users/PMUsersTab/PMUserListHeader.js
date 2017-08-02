import React from 'react';

export default props => (
    <div className='pm-user-list-header'>
        <div className='pm-user-list-header__cell'>
            {props.vocab.COMMON.NAME}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.PROJECT.USER_GROUPS}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.PROJECT.USER_STATUS}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.COMMON.ACTIONS}
        </div>
    </div>
);
