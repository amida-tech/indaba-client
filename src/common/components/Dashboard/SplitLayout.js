import React from 'react';

export default ({ children }) => <div className='split-layout'>
    <div className='split-layout__child'>{children[0]}</div>
    <div className='split-layout__child'>{children[1]}</div>
</div>;
