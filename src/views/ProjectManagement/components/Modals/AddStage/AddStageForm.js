import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTime from 'grommet/components/DateTime';
import { Field, reduxForm, form } from 'redux-form';
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
                                placeholder={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} />

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
                                       value={this.props.vocab.PROJECT.PERM_ARRAY[index]} />
                                   <span>{permission}</span>
                               </label>,
                           )}
                       </div>
                    </div>
                    <div className='add-stage-form__text-description'>
                        {this.props.description}
                    </div>
                    <hr className='add-stage-form__divider'/>
                    <div className='add-stage-form__header'>
                        <label> {this.props.vocab.PROJECT.DATE_RANGE} </label>
                            <div className='add-stage-form__start-label-and-input'>
                                <span> {this.props.vocab.PROJECT.START_DATE}</span>
                                <div className='add-stage-form__start-date-input-div'>
                                    <Field
                                      className='add-stage-form__date-input-field'
                                      name='startStage'
                                      component={DateTime} />
                                </div>
                            </div>
                            <div className='add-stage-form__end-label-and-input'>
                                <span> {this.props.vocab.PROJECT.END_DATE}</span>
                                <div>
                                    <Field
                                     className='add-stage-form__date-input-field'
                                     name='endStage'
                                     component={DateTime} />
                                </div>
                            </div>
                    </div>
                </div>
            </form>
        );
    }
}

AddStageForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'add-stage-form' })(AddStageForm);

