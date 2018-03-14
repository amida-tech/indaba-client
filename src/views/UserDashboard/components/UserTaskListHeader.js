import React from 'react';
import PropTypes from 'prop-types';

const UserTaskListHeader = ({ vocab }) =>
    <div className='user-task-list-header'>
        <div className='user-task-list-header__title user-task-list-header__title--subject'>
            {vocab.PROJECT.SUBJECT}
        </div>
        <div className='user-task-list-header__title user-task-list-header__title--task'>
            {vocab.PROJECT.TASK}
        </div>
        <div className='user-task-list-header__title user-task-list-header__title--due'>
            {vocab.PROJECT.DUE}
        </div>
        <div className='user-task-list-header__title user-task-list-header__title--survey'>
            {vocab.PROJECT.SURVEY}
        </div>
        <div className='user-task-list-header__title user-task-list-header__title--flags'>
            {vocab.PROJECT.FLAGS}
        </div>
        <div className='user-task-list-header__title user-task-list-header__title--activity'>
            {vocab.PROJECT.ACTIVITY}
        </div>
    </div>;

UserTaskListHeader.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default UserTaskListHeader;
