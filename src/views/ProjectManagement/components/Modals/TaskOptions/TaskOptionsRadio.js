import React, { Component } from 'react';

class TaskOptionsRadio extends Component {
    render() {
        return (
            <label htmlFor={this.props.input.value}>
                <input
                    name={this.props.name}
                    disabled={this.props.disabled}
                    type={'radio'}
                    checked={this.props.input.value}
                    id={this.props.input.value}
                    className='task-options-form__header task-options-form__header--hidden'
                    label={this.props.label}
                    {...this.props.input}
                />
                <span
                    id={this.props.input.value}
                    className={`
                        far fa-${this.props.input.checked ? 'dot-' : ''}circle
                        task-options-form__radio-button
                        task-options-form__radio-button--${this.props.input.checked ? 'checked' : 'unchecked'}
                    `}
                />
                {this.props.label}
            </label>
        );
    }
}

export default TaskOptionsRadio;
