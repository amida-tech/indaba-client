import React, { Component } from 'react';

export class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.question}
            </div>
        )
    }
}
