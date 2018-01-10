import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clone, get } from 'lodash';

class Bullet extends Component {
    upsertBullet(value, index, currentAnswer) {
        const tempAnswer = clone(currentAnswer);
        if (value === '') {
            tempAnswer.splice(index);
        } else {
            tempAnswer[index] = value;
        }
        return tempAnswer.join('‣');
    }
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
                {currentAnswer.map((answer, index) =>
                    <input className={`bullet__field${this.props.displayMode ? '--disabled' : ''}`}
                        key={`bullet-${this.props.id}-${index}`}
                        placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                        type='text'
                        disabled={this.props.displayMode}
                        defaultValue={currentAnswer[index]}
                        onBlur={(event) => {
                            this.props.upsertAnswer({ textValue:
                                this.upsertBullet(event.target.value, index, currentAnswer) });
                        }} />,
                )}
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
