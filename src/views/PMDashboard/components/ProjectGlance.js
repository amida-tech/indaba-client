import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectGlance extends Component {
    render() {
        return (
            <div className='project-glance'>Circle summary</div>
        );
    }
}

ProjectGlance.propTypes = {
    vocab: PropTypes.object.isRequired,
    projects: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    inactive: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
};

export default ProjectGlance;
