import React, { Component } from 'react';

import SearchInput from '../../../common/components/Dashboard/SearchInput';
import SubjectList from '../../../common/components/SubjectList';

class PMAllSubjects extends Component {
    render() {
        return (
            <div className='pm-all-subjects'>
                <div className='pm-all-subjects__search-wrapper'>
                    <SearchInput className='pm-all-subjects__search'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_SUBJECTS}
                        onChange={evt =>
                            this.props.actions.pmAllSubjectsSetQuery(evt.target.value)} />
                </div>
                <SubjectList subjects={this.props.subjects}
                    query={this.props.ui.query}
                    onDeleteClick={() => {}}
                    vocab={this.props.vocab}/>
            </div>
        );
    }
}

export default PMAllSubjects;
