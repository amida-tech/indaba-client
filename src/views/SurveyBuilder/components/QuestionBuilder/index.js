import React, { Component } from 'react';
import LongText from './LongText';
// import PropTypes from 'prop-types';

class QuestionBuilder extends Component {
    render() {
        console.log(this.props);
        return (
            <LongText />
        );
    }
}

export default QuestionBuilder;
