import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteIconButton from '../../../../common/components/DeleteIconButton';

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
            <div className='subject-list'>
                <div className='subject-list__header'>
                    <div className='subject-list__header-title subject-list__header-title--name'>
                        {this.props.vocab.PROJECT.SUBJECT_NAME}
                    </div>
                    <div className='subject-list__header-title subject-list__header-title--actions'>
                        {this.props.vocab.COMMON.ACTIONS}
                    </div>
                </div>
                {this.props.subjects.filter(this.filter).map(subject =>
                    <div className='subject-list__entry'
                        key={subject}>
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
    query: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default SubjectList;
