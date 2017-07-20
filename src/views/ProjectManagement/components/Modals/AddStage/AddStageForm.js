import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, form, formValueSelector } from 'redux-form';

import AddStageDateTime from './AddStageDateTime';
import AddStageSelect from './AddStageSelect';

class AddStageForm extends Component {
    render() {
        return (
            <form className='add-stage-form' onSubmit={this.props.handleSubmit}>
                <div>
                    <div className='add-stage-form__header'>
                        <label> {this.props.vocab.PROJECT.STAGE_TITLE} </label>
                        <div>
                            <Field
                                name='title'
                                component='input'
                                type='text'
                                className='add-stage-form__input-field'
                                placeholder={this.props.vocab.PROJECT.STAGE_TITLE_INSTRUCTION} />
                        </div>
                    </div>
                    <div className='add-stage-form__header'>
                        <label> {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} </label>
                        <div>
                            <Field
                                className='add-stage-form__input-field'
                                name='userGroups'
                                groups={this.props.groups}
                                component={AddStageSelect}
                                assignGroups={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} />
                        </div>
                    </div>
                    <div className='add-stage-form__header'>
                       <label> {this.props.vocab.PROJECT.PERMISSIONS} </label>
                       <div className='add-stage-form__radio-buttons'>
                           {this.props.vocab.PROJECT.PERM_ARRAY.map((permission, index) =>
                               <label className='radio-inline' key={index}>
                                   <Field
                                       name='permissions'
                                       component='input'
                                       type='radio'
                                       value={`${index}`} />
                                   <span>{permission}</span>
                               </label>,
                           )}
                       </div>
                    </div>
                    <div className='add-stage-form__text-description'>
                        {this.props.vocab.PROJECT.DESC_ARRAY[this.props.permissions]}
                    </div>
                    <hr className='add-stage-form__divider'/>
                    <div className='add-stage-form__header'>
                        <label> {this.props.vocab.PROJECT.DATE_RANGE} </label>
                    </div>
                    <div className='add-stage-form__header add-stage-form__date-inputs-container'>
                        <div className='add-stage-form__start-label-and-input'>
                            <span> {this.props.vocab.PROJECT.START_DATE}</span>
                            <div className='add-stage-form__date-input-div'>
                                <Field
                                  id='StartStage'
                                  name='startStage'
                                  component={AddStageDateTime} />
                            </div>
                        </div>
                        <div className='add-stage-form__end-label-and-input'>
                            <span> {this.props.vocab.PROJECT.END_DATE}</span>
                            <div className='add-stage-form__date-input-div'>
                                <Field
                                 id='endStage'
                                 name='endStage'
                                 component={AddStageDateTime} />
                            </div>
                        </div>
                        <div className='add-stage-form__clear'></div>
                    </div>
                </div>
            </form>
        );
    }
}

AddStageForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

const selector = formValueSelector('add-stage-form');

const mapStateToProps = state => ({
    permissions: selector(state, 'permissions'),
});

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'add-stage-form' }),
)(AddStageForm);
