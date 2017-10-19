import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'grommet';
import SubjectList from './SubjectList';
import AddSubject from '../Modals/AddSubject';
import SearchInput from '../../../../common/components/Dashboard/SearchInput';

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
                            this.props.actions.addSubject(
                                this.props.project,
                                [{ name: subject }],
                                false,
                                this.props.vocab.ERROR);
                        }}
                        onCancel={() => this.setState({ showAddSubjectModal: false })}
                        vocab={this.props.vocab}/>}
                <div className='subjects__action'>
                    <Button className='subjects__action-button'
                        label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        primary
                        onClick={() => this.setState({ showAddSubjectModal: true })}/>
                </div>
                <hr className='divider' />
                <div className='subjects__table'>
                    <div className='subjects__search-wrapper'>
                        <SearchInput className='subjects__search'
                            placeholder={this.props.vocab.PROJECT.SEARCH_FOR_SUBJECTS}
                            onChange={evt => this.setState({ query: evt.target.value })} />
                    </div>
                    <SubjectList
                        vocab={this.props.vocab}
                        subjects={this.props.subjects}
                        query={this.state.query}
                        onDeleteClick={subject =>
                            this.props.actions.deleteSubject(
                                this.props.project,
                                subject.id,
                                false,
                                this.props.vocab.ERROR)}/>
                </div>
            </div>);
    }
}

Subjects.propTypes = {
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired,
};

export default Subjects;
