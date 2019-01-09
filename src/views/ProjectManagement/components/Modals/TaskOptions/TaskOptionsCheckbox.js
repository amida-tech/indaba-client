import React, { Component } from 'react';
import CheckBox from 'grommet/components/CheckBox';

class TaskOptionsCheckbox extends Component {
    render() {
        return (
            // <CheckBox
            //     checked={!!this.props.input.value}
            //     onChange={this.props.input.onChange}
            //     className='task-options-form__header'
            //     label={this.props.label}
            //     disabled={this.props.disabled}
            // />
            <label htmlFor={this.props.input.value}>
                <input type={'checkbox'}
                    id={this.props.input.value}
                    checked={typeof this.props.input.value === 'boolean'
                        ? this.props.input.value : false}
                    label= {this.props.label}
                    onChange={this.props.input.onChange}
                    disabled={this.props.disabled}
                    className='task-options-form__checkbox-hidden'
                />
                <span
                    id={this.props.input.value}
                    className={`
                            far fa-${this.props.input.checked ? 'check-' : ''}square
                            task-options-form__checkbox
                            task-options-form__checkbox-${this.props.input.checked ? 'checked' : 'unchecked'}
                        `}
                />
                {this.props.label}
            </label>
        );
    }
}

export default TaskOptionsCheckbox;
