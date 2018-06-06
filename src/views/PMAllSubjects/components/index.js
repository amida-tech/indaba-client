import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkProtection } from '../../../common/actions/navActions';

import * as actions from '../actions';
import PMAllSubjects from './PMAllSubjects';

class PMAllSubjectsContainer extends Component {
    componentWillMount() {
        this.props.actions.checkProtection(this.props.profile)
          .then(this.props.actions.pmAllSubjectsGetSubjects());
    }
    render() {
        return (
            <PMAllSubjects {...this.props} />
        );
    }
}

const mapStateToProps = store => ({
    vocab: store.settings.language.vocabulary,
    subjects: store.pmallsubjects.subjects,
    ui: store.pmallsubjects.ui,
    profile: store.user.profile,
    formState: store.pmallsubjects.formState,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, { checkProtection }), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMAllSubjectsContainer);
