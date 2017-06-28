import React, { Component } from 'react';

// If no answer are provided, assume it is a yes or no question.
export class Date extends Component {
    render() {
        return (
            <div>
                {this.props.question}
            </div>
        );
    }
}
