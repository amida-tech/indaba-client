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
                    project={this.props.wizard.project}
                    survey={this.props.wizard.survey}
                    vocab={this.props.vocab} />
                <hr className='divider'/>
                <div className='add-subjects__import-row'>
                    <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
                </div>
                <hr className='divider'/>
                <p>{this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}</p>
                <AddSubjectControl
                    onAddSubjects={this.props.actions.addSubjectsToWizard}
                    vocab={this.props.vocab}/>
                {this.props.subjects && this.props.subjects.map(subject =>
                    <div className='add-subjects__subject' key={subject}>
                        {subject}
                        <DeleteIconButton onClick={() =>
                            this.props.actions.deleteSubjectFromWizard(subject)} />
                    </div>,
                )}
            </div>
        );
    }
}

AddSubjects.propTypes = {
    wizard: PropTypes.shape({
        project: PropTypes.shape({
            subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        survey: PropTypes.object.isRequired,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default AddSubjects;
