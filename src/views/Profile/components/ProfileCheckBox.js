import React, { Component } from 'react';

class ProfileCheckBox extends Component {
    render() {
        return (
            // <CheckBox
            //     checked={typeof this.props.input.value === 'boolean'
            //         ? this.props.input.value : false }
            //     value={this.props.input.value}
            //     onChange={this.props.input.onChange}
            //     disabled={true}
            //     className='update-profile-form__checkbox' />
            <div>
                <form>
                    <input type="checkbox"
                        id={this.props.input.value}
                        checked={typeof this.props.input.value === 'boolean'
                            ? this.props.input.value : false}
                        value={this.props.input.value}
                        name={this.props.input.value}
                        onChange={this.props.input.onChange}
                        disabled={true}
                        // className={`
                        //     far fa-${this.props.input.checked ? 'check-' : ''}square
                        //     profile-form__checkbox
                        //     profile-form__checkbox-${this.props.input.checked ? 'checked' : 'unchecked'}
                        //     `}
                        className='profile-form__checkbox-hidden'
                    />
                    <label
                    for={this.props.input.value}
                    className={`
                            far fa-${this.props.input.checked ? 'check-' : ''}square
                            profile-form__checkbox
                            profile-form__checkbox-${this.props.input.checked ? 'checked' : 'unchecked'}
                        `}
                    />
                </form>
            </div>
        );
    }
}

export default ProfileCheckBox;
