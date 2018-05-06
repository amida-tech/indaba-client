import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteIconButton from './DeleteIconButton';

class SubjectList extends Component {
    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
    }
    filter(subject) {
        return subject.name.toLowerCase().includes(this.props.query.toLowerCase());
    }
    render() {
        const caretUp = (<span className='fa fa-sort-up' />);
        const caretDown = (<span className='fa fa-sort-down' />);
        return (
            <div className='subject-list'>
                <div className='subject-list__header'>
                    <div
                        className='subject-list__header-title subject-list__header-title--name'
                        onClick={
                            !this.props.isOrderedByNameAscending
                                ? this.props.sortNamesAsc
                                : this.props.sortNamesDesc
                        }
                    >
                        <span>
                            {`${this.props.vocab.COMMON.SUBJECTS} `}
                            {this.props.isOrderedByNameAscending ? caretUp : caretDown}
                        </span>
                    </div>
                    <div className='subject-list__header-title subject-list__header-title--actions'>
                        {this.props.vocab.COMMON.ACTIONS}
                    </div>
                </div>
                {this.props.subjects.filter(this.filter).map(subject =>
                    <div className='subject-list__entry'
                        key={subject.id}>
                        <div className='subject-list__entry-name'>
                            {subject.name}
                        </div>
                        <DeleteIconButton onClick={() => this.props.onDeleteClick(subject)} />
                    </div>)
                }
            </div>);
    }
}

SubjectList.propTypes = {
    vocab: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default SubjectList;
