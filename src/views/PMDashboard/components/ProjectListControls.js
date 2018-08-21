import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectFilter from './ProjectFilter';
import FilterInput from '../../../common/components/Dashboard/FilterInput';

class ProjectListControls extends Component {
    render() {
        return (
            <div className='project-list-controls'>
                <div className='project-list-controls__search'>
                    <FilterInput
                        placeholder={this.props.vocab.PROJECT.SEARCH_PROJECT}
                        onChange={evt => this.props.actions.setSearchQuery(evt.target.value)} />
                </div>
                <div className='project-list-controls__filter'>
                    <ProjectFilter active={this.props.filter}
                        vocab={this.props.vocab}
                        onSetFilter={this.props.actions.setFilter} />
                </div>
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
