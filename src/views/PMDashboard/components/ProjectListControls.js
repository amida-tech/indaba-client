import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectListControls extends Component {
    render() {
        return (
            <div className='project-list-controls'>
                <input className='project-list-controls__search'
                    type='text'
                    placeholder={this.props.vocab.COMMON.SEARCH}
                    onChange={evt => this.props.actions.setSearchQuery(evt.target.value)}/>
            </div>
        );
    }
}

ProjectListControls.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default ProjectListControls;
