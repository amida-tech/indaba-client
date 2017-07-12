import React, { Component } from 'react';
import { Box, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';

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
        return (
            <div className='add-subject-control'>
                <div className='add-subject-control__header'>
                    <div>{this.props.vocab.PROJECT.ADD_SUBJECT_CLARIFICATION}</div>
                    <div>{this.props.vocab.COMMON.ACTIONS}</div>
                </div>
                <div className='add-subject-control__fields'>
                    <TextInput value={this.state.userInput}
                        onDOMChange={this.handleUserTextInput}/>
                    <span onClick={this.handlePlusClick}>
                        <IonIcon icon='ion-ios-plus'/>
                    </span>
                </div>
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

export default AddSubjectControl;
