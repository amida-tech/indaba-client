import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';
import { addSubjects, deleteSubject } from '../actions';
import Summary from '../../../common/components/Summary';

class AddSubjectControl extends Component {
    constructor(props) {
        super(props);
        this.state = { userInput: '' };

        this.handleUserTextInput = this.handleUserTextInput.bind(this);
        this.handlePlusClick = this.handlePlusClick.bind(this);
    }
    handleUserTextInput(evt) {
        this.setState({ userInput: evt.target.value });
    }
    handlePlusClick() {
        const splitUsers = this.state.userInput.split(/\s*,\s*/)
            .filter(user => user !== '');
        this.props.onAddSubjects(splitUsers);
        this.setState({ userInput: '' });
    }
    render() {
        return <div>
            <Box direction='row' justify='between'>
                <div>{this.props.vocab.PROJECT.ADD_SUBJECT_CLARIFICATION}</div>
                <div>{this.props.vocab.COMMON.ACTIONS}</div>
            </Box>
            <Box direction='row'>
                <TextInput value={this.state.userInput}
                    onDOMChange={this.handleUserTextInput}/>
                <span onClick={this.handlePlusClick}>
                    <IonIcon icon='ion-ios-plus'/>
                </span>
            </Box>
            {this.props.subjects && this.props.subjects.map(subject =>
                <Box direction='row' key={subject}>
                    {subject}
                    <span onClick={() => this.props.onDeleteSubject(subject)}>
                        <IonIcon icon='ion-android-delete'/>
                    </span>
                </Box>,
            )}
        </div>;
    }
}

class AddSubjects extends Component {
    render() {
        return (<div>
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
                subjects={this.props.subjects}
                vocab={this.props.vocab}/>
        </div>);
    }
}

const mapStateToProps = state => ({
    subjects: state.projectwizard.subjects,
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
});
const mapDispatchToProps = dispatch => ({
    onAddSubjects: subjects => dispatch(addSubjects(subjects)),
    onDeleteSubject: subject => dispatch(deleteSubject(subject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjects);
