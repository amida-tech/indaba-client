import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MultiDateInput from '../../../../../common/components/Dates/MultiDateInput';

class StageForm extends Component {
    render() {
        console.log('STageForm Props');
        console.log(this.props);
        return (
            <form className='stage-form'>
                <div className='stage-form__title'>
                    <label className='stage-form__title-label'>
                        {this.props.vocab.PROJECT.STAGE_TITLE}
                    </label>
                    <div>
                        <input className='stage-form__input-field'
                            placeholder={this.props.vocab.PROJECT.STAGE_TITLE_INSTRUCTION}
                            type='text'
                            value={this.props.title}
                            onChange={this.props.handleTitle} />
                    </div>
                </div>
                <div className='stage-form__group'>
                    <label className='stage-form__group-name'>
                        {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                    </label>
                    <div>
                    <Select className='stage-form__input-field'
                        value={this.props.userGroups.map(group => group.value)}
                        options={this.props.groups}
                        placeholder={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                        clearable={true}
                        multi />
                    </div>
                </div>
                <div className='stage-form__activities'>
                    <label className='stage-form__activities-label'>
                        {this.props.vocab.PROJECT.PERMISSIONS}
                    </label>
                    <div className='stage-form__radio-control'>
                        {this.props.vocab.PROJECT.ACTIVITY_OPTIONS.map((permission, index) =>
                            <label className='stage-form__radio-button' key={index}>
                            <input name='permissions'
                                type='radio'
                                value={`${index}`}
                                onChange={this.props.handlePermissions}
                                checked={index === parseInt(this.props.permissions, 10)} />
                            <span className='stage-form__permission-label-text'>
                                {permission}
                            </span>
                        </label>)}
                    </div>
                </div>
                <div className='stage-form__text-description'>
                    {this.props.vocab.PROJECT.ACTIVITY_DESC[this.props.permissions]}
                </div>
                <hr className='stage-form__divider'/>
                <div className='stage-form__date'
                    name='stage-form__date'>
                    <label className='stage-form__date-label'>
                        {this.props.vocab.PROJECT.DATE_RANGE}
                    </label>
                    <div className='stage-form__date-input-div'>
                        <MultiDateInput
                            startDate={this.props.startDate}
                            endDate={this.props.endDate} />
                    </div>
                </div>
                <div className='stage-form__clear'></div>
            </form>
        );
    }
}

StageForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    title: PropTypes.string,
    permissions: PropTypes.string,
    userGroups: PropTypes.array,
    groups: PropTypes.array,
    startDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    endDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    handleTitle: PropTypes.func,
    handlePermissions: PropTypes.func,
};

export default StageForm;
