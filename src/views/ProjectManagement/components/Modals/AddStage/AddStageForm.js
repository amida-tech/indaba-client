import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTime from 'grommet/components/DateTime';
// import Select from 'react-select';
import { Field, reduxForm, form } from 'redux-form';

class AddStageForm extends Component {
    render() {
        return (
            <form className='add-stage-form' onSubmit={this.props.handleSubmit}>
                <div>
                    {/* <input type='text' placeholder={this.props.vocab.PROJECT.STAGE_TITLE}*/}
                           {/* onChange={this.handleTitleChange}/>*/}
                    <div className='add-stage-form_header'>
                        <label> {this.props.vocab.PROJECT.STAGE_TITLE} </label>
                        <div>
                            <Field
                                name='title'
                                component='input'
                                type='text'
                                placeholder={this.props.vocab.PROJECT.STAGE_TITLE_INSTRUCTION} />
                        </div>
                    </div>

                    <div className='add-stage-form_header'>
                        <label> {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} </label>
                        <div>
                            <Field
                                name='userGroups'
                                component='select'
                                placeholder={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}>

                                <option />
                                <option value='researchers'> Researchers </option>
                                <option value='managers'> Managers </option>
                            </Field>
                        </div>
                    </div>

                    <div>
                        <label> {this.props.vocab.PROJECT.PERMISSIONS} </label>
                        <div>
                            <label>
                                <Field
                                    name="permissions"
                                    component="input"
                                    type="radio" />
                                {' '}
                                Complete Survey
                            </label>
                            <label>
                                <Field
                                    name="permissions"
                                    component="input"
                                    type="radio" />
                                {' '}
                                Review
                            </label>
                            <label>
                                <Field
                                    name="permissions"
                                    component="input"
                                    type="radio" />
                                {' '}
                                Review and Comment
                            </label>
                            <label>
                                <Field
                                    name="permissions"
                                    component="input"
                                    type="radio" />
                                {' '}
                                Review and Edit
                            </label>
                        </div>
                    </div>

                    <div className='add-stage-form__text-description'> Description goes here </div>

                    <hr className='add-stage-form__divider'/>

                    <div className='add-stage-form_header'>
                        <label> {this.props.vocab.PROJECT.DATE_RANGE} </label>
                        <div>
                            <Field
                            name='startStage'
                            component={DateTime}/>

                            <Field
                            name='endStage'
                            component={DateTime}/>

                        </div>
                    </div>


                    <Select
                          placeholder={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                          name='user-group-select'
                          value={this.state.userGroups}
                          options={this.props.groups}
                          clearable={true}
                          multi
                          onChange={this.handleSelectChange}
                    />
                    {this.props.vocab.PROJECT.PERMISSIONS}
                     <div className='container' onChange={this.handlePermissionsChange}>
                         {this.props.vocab.PROJECT.PERM_ARRAY.map((permission, index) =>
                             <label className='radio-inline' key={index}>
                                 <input type='radio'
                                        name='permissions'
                                        value={index}
                                        defaultChecked={!index} />
                                 <span>{permission}</span>
                             </label>,
                         )}
                     </div>
                     <div>
                         {this.props.description}
                     </div>
                     {this.props.vocab.PROJECT.DATE_RANGE}
                     <div className='container'>
                         <div className='row'>
                             <div className='col-md-6'>
                                {this.props.vocab.PROJECT.START_DATE}</div>*/}
                             <div className='col-md-6'>
                                {this.props.vocab.PROJECT.END_DATE}</div>*/}
                         </div>
                         <div className='row'>
                             <div className='col-md-6'>
                                 <DateTime id='StartStage'
                                           format='MM/DD/YYYY'
                                           value={this.state.startStage}
                                           onChange={this.handleStartStageChange}/>
                             </div>
                             <div className='col-md-6'>
                                 <DateTime id='endStage'
                                           format='MM/DD/YYYY'
                                           value={this.state.endStage}
                                           onChange={this.handleEndStageChange}/>
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
// export default AddStageForm;
