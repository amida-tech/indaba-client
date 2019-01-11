import React, { Component } from 'react';
import CheckBox from 'grommet/components/CheckBox';

class TaskOptionsCheckbox extends Component {
    render() {
        console.log(this.props.input);
        return (
            <label
                htmlFor={this.props.input.name}
                className='task-options-form__check-container'
            >
                <input type={'checkbox'}
                    id={this.props.input.name}
                    checked={typeof this.props.input.value === 'boolean'
                        ? this.props.input.value : false}
                    onChange={this.props.input.onChange}
                    disabled={this.props.disabled}
                    className='task-options-form__checkbox--hidden'
                />
                <span
                    id={this.props.input.name}
                    className={`
                            far fa-${this.props.input.checked ? 'check-' : ''}square
                            task-options-form__checkbox${this.props.disabled ? '--disabled' : ''}
                        `}
                />
                {this.props.label}
            </label>
        );
    }
}

export default TaskOptionsCheckbox;
