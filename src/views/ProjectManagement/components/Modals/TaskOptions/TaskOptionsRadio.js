import React, { Component } from 'react';

class TaskOptionsRadio extends Component {
    render() {
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
                    <span
                        id={this.props.input.value}
                        className={`
                            far fa-${this.props.input.checked ? 'dot-' : ''}circle
                            task-options-form__radio-button
                            task-options-form__radio-button--${this.props.input.checked ? 'checked' : 'unchecked'}
                        `}
                    />
                    {this.props.label}
                </div>
            </label>
        );
    }
}

export default TaskOptionsRadio;
