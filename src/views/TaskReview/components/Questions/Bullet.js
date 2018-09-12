import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

class Bullet extends Component {
    render() {
        let currentAnswer = get(this.props.answer, 'textValue', undefined);
        if (currentAnswer) {
            currentAnswer = currentAnswer.split('‣');
            currentAnswer.push('');
        } else {
            currentAnswer = [''];
        }
        return (
            <div className='bullet'>
                {currentAnswer.map((answer, index) => <input className={`bullet__field bullet__field${this.props.displayMode ? '--disabled' : ''}`}
                    key={`bullet-${this.props.id}-${index}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    disabled={this.props.displayMode}
                    value={currentAnswer[index]}
                    onChange={(event) => {
                        currentAnswer[index] = event.target.value;
                        if (index !== currentAnswer.length - 1) {
                            currentAnswer.splice(currentAnswer.length - 1, 1);
                        }
                        if (event.target.value.match(/^\s*$/)) {
                            currentAnswer.splice(index, 1);
                        }
                        this.props.holdAnswer(this.props.id,
                            { textValue: currentAnswer.join('‣') });
                    }}
                    onBlur={() => {
                        currentAnswer.splice(currentAnswer.length - 1, 1);
                        this.props.upsertAnswer({ textValue: currentAnswer.join('‣') });
                    }} />)}
            </div>
        );
    }
}

Bullet.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Bullet;
