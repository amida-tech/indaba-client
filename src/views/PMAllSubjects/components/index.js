import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';
import PMAllSubjects from './PMAllSubjects';

class PMAllSubjectsContainer extends Component {
    componentWillMount() {
        if (this.props.profile.roleID === 3) {
            this.props.router.push('/task');
        } else {
            this.props.actions.pmAllSubjectsGetSubjects();
        }
    }

    componentWillReceiveProps() {
        if (this.props.profile.roleID === 3) {
            this.props.router.push('/task');
        }
    }

    render() {
        return (
            <PMAllSubjects {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    subjects: state.pmallsubjects.subjects,
    ui: state.pmallsubjects.ui,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMAllSubjectsContainer);
