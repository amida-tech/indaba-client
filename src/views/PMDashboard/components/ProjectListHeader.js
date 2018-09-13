import React from 'react';
import PropTypes from 'prop-types';

const ProjectListHeader = ({ vocab }) => <div className='project-list-header'>
    <div className='project-list-header__title project-list-header__title--project'>
        {vocab.PROJECT.PROJECT}
    </div>
    <div className='project-list-header__title project-list-header__title--survey'>
        {vocab.PROJECT.SURVEY}
    </div>
    <div className='project-list-header__title project-list-header__title--flags'>
        {vocab.PROJECT.FLAGS}
    </div>
    <div className='project-list-header__title project-list-header__title--last-updated'>
        {vocab.PROJECT.LAST_UPDATED}
    </div>
</div>;

ProjectListHeader.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default ProjectListHeader;
