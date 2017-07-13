import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectFilter from './ProjectFilter';

class ProjectListControls extends Component {
    render() {
        return (
            <div className='project-list-controls'>
                <input className='project-list-controls__search'
                    type='text'
                    placeholder={this.props.vocab.COMMON.SEARCH}
                    onChange={evt => this.props.actions.setSearchQuery(evt.target.value)}/>
                <ProjectFilter active={this.props.filter}
                    vocab={this.props.vocab}
                    onSetFilter={this.props.actions.setFilter} />
            </div>
        );
    }
}

ProjectListControls.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
};

export default ProjectListControls;
