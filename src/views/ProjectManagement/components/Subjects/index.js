import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, SearchInput } from 'grommet';
import SubjectList from './SubjectList';
import AddSubject from '../Modals/AddSubject';

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
            <div className='subjects'>
                {this.state.showAddSubjectModal &&
                    <AddSubject
                        onAddSubject={(subject) => {
                            this.setState({ showAddSubjectModal: false });
                            this.props.onAddSubject(subject);
                        }}
                        onCancel={() => this.setState({ showAddSubjectModal: false })}
                        vocab={this.props.vocab}/>}
                <div className='subjects__button-row'>
                    <Button
                        label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        primary
                        onClick={() => this.setState({ showAddSubjectModal: true })}/>
                </div>
                <hr className='divider' />
                <SearchInput className='subjects__search-input'
                    onDOMChange={evt => this.setState({ query: evt.target.value })}/>
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
