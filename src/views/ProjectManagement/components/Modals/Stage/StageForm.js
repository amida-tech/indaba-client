import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, form, formValueSelector } from 'redux-form';

import StageDateTime from './StageDateTime';
import StageSelect from './StageSelect';

class StageForm extends Component {
    render() {
        return (
            <form className='add-stage-form' onSubmit={this.props.handleSubmit}>
                <div>
                    <div className='add-stage-form__header'>
                        <label className='add-stage-form__header-label'>
                        {this.props.vocab.PROJECT.STAGE_TITLE}
                         </label>
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
                        <label className='add-stage-form__header-label'>
                        {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                        </label>
                        <div>
                            <Field
                                className='add-stage-form__input-field'
                                name='userGroups'
                                groups={this.props.groups}
                                component={StageSelect}
                                assignGroups={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} />
                        </div>
                    </div>
                    <div className='add-stage-form__header'>
                           <label className='add-stage-form__header-label'>
                           {this.props.vocab.PROJECT.PERMISSIONS}
                           </label>
                       <div className='add-stage-form__radio-control'>
                           {this.props.vocab.PROJECT.PERM_ARRAY.map((permission, index) =>
                               <label className='add-stage-form__radio-button' key={index}>
                                   <Field
                                       name='permissions'
                                       component='input'
                                       type='radio'
                                       value={`${index}`} />
                                   <span
                                       className='add-stage-form__permission-label-text'>
                                       {permission}
                                   </span>
                               </label>,
                           )}
                       </div>
                    </div>
                    <div className='add-stage-form__text-description'>
                        {this.props.vocab.PROJECT.DESC_ARRAY[this.props.permissions]}
                    </div>
                    <hr className='add-stage-form__divider'/>
                    <div className='add-stage-form__header'>
                            <label className='add-stage-form__header-label'>
                            {this.props.vocab.PROJECT.DATE_RANGE}
                            </label>
                    </div>
                    <div className='add-stage-form__select'>
                        <div className='add-stage-form__select-start'>
                            <label className='add-stage-form__select-start-label'>
                            {this.props.vocab.PROJECT.START_DATE}</label>
                            <div className='add-stage-form__date-input-div'>
                                <Field
                                  id='StartDate'
                                  name='startDate'
                                  component={StageDateTime} />
                            </div>
                        </div>
                        <div className='add-stage-form__select-end'>
                            <label className='add-stage-form__select-end-label'>
                                {this.props.vocab.PROJECT.END_DATE}</label>
                            <div className='add-stage-form__date-input-div'>
                                <Field
                                 id='endDate'
                                 name='endDate'
                                 component={StageDateTime} />
                            </div>
                        </div>
                        <div className='add-stage-form__clear'></div>
                    </div>
                </div>
            </form>
        );
    }
}

StageForm.propTypes = {
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
)(StageForm);
