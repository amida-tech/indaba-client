import React from 'react';
import PropTypes from 'prop-types';

const ProjectListHeader = ({ vocab }) =>
    <div className='project-list-header'>
        {[
            vocab.PROJECT.PROJECT,
            vocab.PROJECT.SURVEY,
            vocab.PROJECT.FLAGS,
            vocab.PROJECT.LAST_UPDATED,
        ].map(title =>
            <div className='project-list-header__title' key={title}>{title}</div>,
        )}
    </div>;

ProjectListHeader.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default ProjectListHeader;
