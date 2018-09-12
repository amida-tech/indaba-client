import React from 'react';

export default ({ vocab, groups }) => (
    <div className='pm-user-list-header'>
        <div className='pm-user-list-header__cell'>
            {vocab.COMMON.NAME}
        </div>
        {
            groups
            && <div className='pm-user-list-header__cell'>
                {vocab.PROJECT.USER_GROUPS}
            </div>
        }
        <div className='pm-user-list-header__cell'>
            {vocab.PROJECT.USER_STATUS}
        </div>
        <div className='pm-user-list-header__cell'>
            {vocab.COMMON.ACTIONS}
        </div>
    </div>
);
