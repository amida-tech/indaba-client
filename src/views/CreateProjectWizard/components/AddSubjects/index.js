import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'grommet';
import { addSubjectsToWizard, deleteSubjectFromWizard } from '../../actions';
import Summary from '../../../../common/components/Summary';
import AddSubjectControl from './AddSubjectControl';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';

class AddSubjects extends Component {
    render() {
        return (
            <div className='add-subjects'>
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider'/>
                <div className='add-subjects__import-row'>
                    <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
                </div>
                <hr className='divider'/>
                <p className='add-subjects__instructions'>
                {this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}</p>
                <AddSubjectControl
                    onAddSubjects={this.props.onAddSubjects}
                    vocab={this.props.vocab}/>
                {this.props.subjects && this.props.subjects.map(subject =>
                    <div className='add-subjects__subject' key={subject}>
                        {subject}
                        <DeleteIconButton onClick={() => this.props.onDeleteSubject(subject)} />
                    </div>,
                )}
            </div>
        );
    }
}

AddSubjects.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    onAddSubjects: PropTypes.func.isRequired,
    onDeleteSubject: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
    subjects: state.projectwizard.project.subjects,
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
});
const mapDispatchToProps = dispatch => ({
    onAddSubjects: subjects => dispatch(addSubjectsToWizard(subjects)),
    onDeleteSubject: subject => dispatch(deleteSubjectFromWizard(subject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjects);
