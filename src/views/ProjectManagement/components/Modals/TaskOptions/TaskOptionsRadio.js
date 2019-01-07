import React, { Component } from 'react';
import RadioButton from 'grommet/components/RadioButton';

class TaskOptionsRadio extends Component {
    render() {
        const checkedRadioButton = (
            <span
                id={this.props.input.value}
                className={'far fa-dot-circle task-options-form__radio-button task-options-form__radio-button--checked'}
            />
        );

        const uncheckedRadioButton = (
            <span
                id={this.props.input.value}
                className={'far fa-circle task-options-form__radio-button task-options-form__radio-button--unchecked'}
            />
        );

        return (
            <label for={this.props.input.value}>
                <div>
                    <input
                        type={'radio'}
                        checked={this.props.input.value}
                        id={this.props.input.value}
                        className='task-options-form__header task-options-form__header--hidden'
                        label={this.props.label}
                        {...this.props.input}
                    />
                    {
                        this.props.input.checked
                            ? checkedRadioButton
                            : uncheckedRadioButton
                    }
                    {this.props.label}
                </div>
            </label>
        );
    }
}

export default TaskOptionsRadio;
