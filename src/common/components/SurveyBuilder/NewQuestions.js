import React, { Component } from 'react';

class NewQuestions extends Component {

    render() {
        return (
            <div className='new-questions'>
                {this.props.vocab.SURVEY.QUESTIONS_TYPES.map((type) => {
                    return (
                        <div className='new-questions__types'
                            key={`question-type${type}`}>
                            {type}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default NewQuestions;
