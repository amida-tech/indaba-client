import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from 'grommet';
import { addSubjectsToWizard, deleteSubjectFromWizard } from '../../actions';
import Summary from '../../../../common/components/Summary';
import AddSubjectControl from './AddSubjectControl';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';

class AddSubjects extends Component {
    render() {
        return (
            <div>
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider'/>
                <Box direction='row' justify='end'
                    pad={{ vertical: 'small', horizontal: 'medium' }}>
                    <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
                </Box>
                <hr className='divider'/>
                <p>{this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}</p>
                <AddSubjectControl
                    onAddSubjects={this.props.onAddSubjects}
                    onDeleteSubject={this.props.onDeleteSubject}
                    vocab={this.props.vocab}/>
                {this.props.subjects && this.props.subjects.map(subject =>
                    <Box direction='row' key={subject}>
                        {subject}
                        <DeleteIconButton onClick={() => this.props.onDeleteSubject(subject)} />
                    </Box>,
                )}
            </div>
        );
    }
}

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
