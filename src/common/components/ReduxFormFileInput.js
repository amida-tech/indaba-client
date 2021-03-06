import React, { Component } from 'react';

class ReduxFormFileInput extends Component {
    render() {
        return (
            <input name={this.props.input.name}
                className={this.props.className}
                type='file'
                disabled={this.props.disabled}
                onChange={(event) => {
                    event.preventDefault();
                    this.props.input.onChange(event);
                }} />
        );
    }
}

export default ReduxFormFileInput;
