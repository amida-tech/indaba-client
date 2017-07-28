import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stamp from '../../../common/components/Dashboard/Stamp';

class ProjectGlance extends Component {
    render() {
        return (
            <div className='project-glance'>
                <Stamp label={this.props.vocab.PROJECT.PROJECTS}
                    value={this.props.projects} />
                <Stamp label={this.props.vocab.PROJECT.STATUS_ACTIVE}
                    value={this.props.active} />
                <Stamp label={this.props.vocab.PROJECT.STATUS_INACTIVE}
                    value={this.props.inactive} />
                <Stamp label={this.props.vocab.PROJECT.FLAGS}
                    value={this.props.flags} />
            </div>
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
