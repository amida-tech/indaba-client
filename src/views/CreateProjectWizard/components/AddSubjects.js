import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';
import { addSubject } from '../actions';

class SubjectListEntry extends Component {

}

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
                <div>Subjects are units of analysis.
                    For example, cities, programs, or companies.
                    Separate subjects with a comma.</div>
                <div>Actions</div>
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
                <Button label='Import Subjects' />
            </Box>
            <hr className='divider'/>
            <p>Add survey subjects or use the import manager to add subjects
                from a previous project.</p>
            <AddSubjectControl
                onAddSubject={this.props.onAddSubject}
                subjects={this.props.subjects}/>
        </div>;
    }
}

const mapStateToProps = state => ({
    subjects: state.projectwizard.subjects,
});
const mapDispatchToProps = dispatch => ({
    onAddSubject: subject => dispatch(addSubject(subject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjects);
