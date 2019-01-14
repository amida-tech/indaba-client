import React, { Component } from 'react';

class ProfileCheckBox extends Component {
    render() {
        return (
            <label
                htmlFor={this.props.input.name}
            >
                <input type={'checkbox'}
                    id={this.props.input.name}
                    checked={typeof this.props.input.value === 'boolean'
                        ? this.props.input.value : false}
                    onChange={this.props.input.onChange}
                    disabled={true}
                    className='profile-form__checkbox--hidden'
                />
                <span
                    id={this.props.input.name}
                    className={`
                        far fa-${this.props.input.checked ? 'check-' : ''}square
                        profile-form__checkbox--disabled
                    `}
                />
            </label>
        );
    }
}

export default ProfileCheckBox;
