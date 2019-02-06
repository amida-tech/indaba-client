import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import MultiDateInput from '../../../../../common/components/Dates/MultiDateInput';

class StageForm extends Component {
    render() {
        return (
            <form className='stage-form'>
                <div className='stage-form__title'>
                    <label className={`stage-form__title-label ${this.props.titleFlag
                        ? 'stage-form__title-label--flag' : ''}`}>
                        {this.props.vocab.PROJECT.STAGE_TITLE_}
                        {this.props.titleFlag
                            && <span>
                                {this.props.vocab.PROJECT.STAGE_TITLE_REQUIRED}
                            </span>
                        }
                    </label>
                    <div>
                        <input className={`stage-form__input-field ${this.props.titleFlag
                            ? 'stage-form__input-field--flag' : ''}`}
                        placeholder={this.props.vocab.PROJECT.STAGE_TITLE_INSTRUCTION}
                        type='text'
                        value={this.props.title}
                        onChange={this.props.handleTitle}
                        onBlur={this.props.handleValidate} />
                    </div>
                </div>
                <div className='stage-form__group'>
                    <label className='stage-form__group-name'>
                        {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                    </label>
                    <div>
                        <Select className='stage-form__input-field'
                            value={this.props.userGroups}
                            onChange={this.props.handleUserGroups}
                            options={this.props.displayGroups}
                            placeholder={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                            clearable={true}
                            multi />
                    </div>
                </div>
                <div className='stage-form__activities'>
                    <label className='stage-form__activities-label'>
                        {this.props.vocab.PROJECT.PERMISSION.TITLE}
                        {this.props.permissionsFlag
                            ? <span>{this.props.vocab.PROJECT.PERMISSION.DENIED}</span>
                            : <span>{this.props.vocab.PROJECT.PERMISSION.EXPLANATION}</span>
                        }
                    </label>
                    <div className='stage-form__activities-control'>
                        {this.props.vocab.PROJECT.ACTIVITY_OPTIONS.map((permission, index) => <label className='stage-form__activities-button' key={index}>
                            <input name='permissions'
                                disabled={this.props.permissionsFlag}
                                type='radio'
                                value={index}
                                onChange={this.props.handlePermissions}
                                checked={index === parseInt(this.props.permissions, 10)} />
                            <span className={`stage-form__permission-label-text ${this.props.permissionsFlag ? 'stage-form__activities-label-text--disabled' : ''}`}>
                                {permission}
                            </span>
                        </label>)}
                    </div>
                        <div className='stage-form__text-description'>
                        {this.props.vocab.PROJECT.ACTIVITY_DESC[this.props.permissions]}
                        </div>
                </div>
                <hr className='stage-form__divider'/>
                <div className='stage-form__date'>
                    <label className={`stage-form__date-label ${this.props.dateFlag
                        ? 'stage-form__date-label--flag' : ''}`}>
                        {this.props.vocab.PROJECT.DATE_RANGE_}
                        {this.props.dateFlag
                            ? this.props.vocab.PROJECT.DATE_REQUIRED
                            : this.props.vocab.PROJECT.DATE_INSTRUCTIONS
                        }
                    </label>
                    <div className={`stage-form__date-input-div ${this.props.dateFlag
                        ? 'stage-form__date-input-div--flag' : ''}`}>
                        <MultiDateInput
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            handleDates={this.props.handleDates}
                            handleValidate={this.props.handleValidate} />
                    </div>
                </div>
                <div className='stage-form__clear'/>
            </form>
        );
    }
}

StageForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    titleFlag: PropTypes.bool,
    dateFlag: PropTypes.bool,
    permissionsFlag: PropTypes.bool,
    title: PropTypes.string,
    permissions: PropTypes.string,
    userGroups: PropTypes.array,
    displayGroups: PropTypes.array,
    startDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    endDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    handleTitle: PropTypes.func,
    handleUserGroups: PropTypes.func,
    handlePermissions: PropTypes.func,
    handleDates: PropTypes.func,
    handleValidate: PropTypes.func,
};

export default StageForm;
