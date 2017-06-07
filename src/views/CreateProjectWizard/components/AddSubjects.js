import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';
import { addSubject } from '../actions';

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
        this.props.onAddSubject(this.state.userInput);
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
                    <IonIcon icon='ion-android-delete'/>
                </Box>,
            )}
        </div>;
    }
}

class AddSubjects extends Component {
    render() {
        return <div>
            &lt;Summary /&gt;
            <hr className='divider'/>
            <Box direction='row' justify='end'
                pad={{ vertical: 'small', horizontal: 'medium' }}>
                <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
            </Box>
            <hr className='divider'/>
            <p>{this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}</p>
            <AddSubjectControl
                onAddSubject={this.props.onAddSubject}
                subjects={this.props.subjects}
                vocab={this.props.vocab}/>
        </div>;
    }
}

const mapStateToProps = state => ({
    subjects: state.projectwizard.subjects,
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = dispatch => ({
    onAddSubject: subject => dispatch(addSubject(subject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjects);
