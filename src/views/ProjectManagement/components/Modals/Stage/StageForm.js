import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Field, Fields, reduxForm, form, formValueSelector,
} from 'redux-form';
// import Element from 'react-scroll/modules/components/Element';
import { animateScroll, Element } from 'react-scroll';
import MultiDateInput from '../../../../../common/components/Dates/MultiDateInput';
import StageSelect from './StageSelect';

class StageForm extends Component {
    constructor(props) {
        super(props);
        this.onDateClick = this.onDateClick.bind(this);
    }

    onDateClick() {
        animateScroll.scrollToBottom();
        // setTimeout(() => {
        //     console.log('Go!');
        //     scroll.scrollToBottom({
        //         smooth: true,
        //         containerId: 'stage-form',
        //     });
        // }, 1000);
    }

    render() {
        return (
            <form className='stage-form'
                onSubmit={this.props.handleSubmit}
                id='stage-form'>
                <div>
                    <div className='stage-form__title'>
                        <label className='stage-form__title-label'>
                            {this.props.vocab.PROJECT.STAGE_TITLE}
                        </label>
                        <div>
                            <Field
                                name='title'
                                component='input'
                                type='text'
                                className='form__input-field'
                                placeholder={this.props.vocab.PROJECT.STAGE_TITLE_INSTRUCTION} />
                        </div>
                    </div>
                    <div className='stage-form__group'>
                        <label className='stage-form__group-name'>
                            {this.props.vocab.PROJECT.ASSIGN_USER_GROUPS}
                        </label>
                        <div>
                            <Field
                                className='stage-form__input-field'
                                name='userGroups'
                                normalize={values => values.map(value => value.value)}
                                groups={this.props.groups}
                                component={StageSelect}
                                assignGroups={this.props.vocab.PROJECT.ASSIGN_USER_GROUPS} />
                        </div>
                    </div>

                    <div className='stage-form__activities'>
                        <label className='stage-form__activities-label'>
                            {this.props.vocab.PROJECT.PERMISSIONS}
                        </label>
                        <div className='stage-form__radio-control'>
                            {this.props.vocab.PROJECT.ACTIVITY_OPTIONS.map((permission, index) => <label className='stage-form__radio-button' key={index}>
                                <Field
                                    name='permissions'
                                    component='input'
                                    type='radio'
                                    value={`${index}`} />
                                <span
                                    className='stage-form__permission-label-text'>
                                    {permission}
                                </span>
                            </label>)}
                        </div>
                    </div>
                    <div className='stage-form__text-description'>
                        {this.props.vocab.PROJECT.ACTIVITY_DESC[this.props.permissions]}
                    </div>
                    <hr className='stage-form__divider'/>
                    <Element className='stage-form__date'
                        name='stage-form__date'
                        onClick={this.onDateClick}>
                        <label className='stage-form__date-label'>
                            {this.props.vocab.PROJECT.DATE_RANGE}
                        </label>
                        <div className='stage-form__date-input-div'>
                            <Fields
                                names={['startDate', 'endDate']}
                                component={MultiDateInput} />
                        </div>
                    </Element>
                    <div className='stage-form__clear'></div>
                </div>
            </form>
        );
    }
}

StageForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

const selector = formValueSelector('stage-form');

const mapStateToProps = state => ({
    permissions: selector(state, 'permissions'),
});

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'stage-form' }),
)(StageForm);
