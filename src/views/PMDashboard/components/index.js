import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

import ProjectListControls from './ProjectListControls';
import ProjectListHeader from './ProjectListHeader';

class PMDashboard extends Component {
    render() {
        return (
            <div className='pm-dashboard'>
                <ProjectListControls vocab={this.props.vocab}
                    actions={this.props.actions}
                    filter={this.props.ui.filter} />
                <ProjectListHeader vocab={this.props.vocab} />
            </div>
        );
    }
}

PMDashboard.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    ui: state.pmdashboard.ui,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
