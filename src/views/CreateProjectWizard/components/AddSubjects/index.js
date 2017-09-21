import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'grommet';
import Summary from '../../../../common/components/Summary';
import AddSubjectControl from './AddSubjectControl';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';

class AddSubjects extends Component {
    render() {
        return (
            <div className='add-subjects'>
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider'/>
                <div className='add-subjects__import-row'>
                    <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
                </div>
                <hr className='divider'/>
                <p className='add-subjects__instructions'>
                    {this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}
                </p>
                <AddSubjectControl
                    project={this.props.project}
                    addSubject={this.props.actions.addSubject}
                    vocab={this.props.vocab} />
                {this.props.project.subjects &&
                    this.props.project.subjects.map(subject =>
                    <div className='add-subjects__table-row'
                        key={`subject${subject.name}${subject.id}`}>
                        {subject.name}
                        <DeleteIconButton onClick={() =>
                            this.props.actions.deleteSubject(
                                this.props.project,
                                subject.id,
                                true,
                            this.props.vocab.ERROR)} />
                    </div>,
                )}
            </div>
        );
    }
}

AddSubjects.propTypes = {
    project: PropTypes.shape({
        subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default AddSubjects;
