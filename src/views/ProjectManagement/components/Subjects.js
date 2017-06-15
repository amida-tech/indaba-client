import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, SearchInput } from 'grommet';
import IonIcon from 'react-ionicons';
import AddSubject from './Modals/AddSubject';

class SubjectList extends Component {
    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
    }
    filter(subject) {
        return subject.toLowerCase().includes(this.props.query.toLowerCase());
    }
    render() {
        return (
            <div>
                {this.props.subjects.filter(this.filter).map(subject =>
                    <div className='subject-list-entry'
                        key={subject}>
                        <div className='subject-list-entry__name'>
                            {subject}
                        </div>
                        <div className='subject-list-entry__delete'
                            onClick={() => this.props.onDeleteClick(subject)}>
                            <IonIcon icon='ion-android-delete'/>
                        </div>
                    </div>)
                }
            </div>);
    }
}

SubjectList.propTypes = {
    query: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            showAddSubjectModal: false,
        };
    }
    render() {
        return (
            <div className='subjects-tab'>
                {this.state.showAddSubjectModal &&
                    <AddSubject
                        onAddSubject={(subject) => {
                            this.setState({ showAddSubjectModal: false });
                            this.props.onAddSubject(subject);
                        }}
                        onCancel={() => this.setState({ showAddSubjectModal: false })}
                        vocab={this.props.vocab}/>}
                <Button
                    label={this.props.vocab.PROJECT.ADD_SUBJECT}
                    primary
                    onClick={() => this.setState({ showAddSubjectModal: true })}/>
                <hr className='divider' />
                <SearchInput onDOMChange={evt => this.setState({ query: evt.target.value })}/>
                <SubjectList
                    subjects={this.props.subjects}
                    query={this.state.query}
                    onDeleteClick={this.props.onDeleteSubject}/>
            </div>);
    }
}

Subjects.propTypes = {
    vocab: PropTypes.object.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteSubject: PropTypes.func.isRequired,
    onAddSubject: PropTypes.func.isRequired,
};

export default Subjects;
