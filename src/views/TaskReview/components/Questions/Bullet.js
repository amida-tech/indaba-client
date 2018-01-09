import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clone, get } from 'lodash';

class Bullet extends Component {
    addBullet(value, currentAnswer) {
        return currentAnswer !== [] ? `${currentAnswer.join('‣')}‣${value}` : value;
    }
    editBullet(value, index, currentAnswer) {
        const tempAnswer = clone(currentAnswer);
        if (currentAnswer === '') {
            return tempAnswer.splice(index);
        }
        tempAnswer[index] = value;
        return tempAnswer.join('‣');
    }
    render() {
        console.log(this.props);
        let currentAnswer = get(this.props.answer, 'textValue', undefined);
        if (currentAnswer) {
            currentAnswer = currentAnswer.split('‣');
        } else {
            currentAnswer = [];
        }
        console.log(currentAnswer);
        return (
            <div className='bullet'>
                {currentAnswer.map((answer, index) =>
                    <input className={`bullet__field${this.props.displayMode ? '--disabled' : ''}`}
                        key={`bullet-${this.props.id}-${index}`}
                        placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                        type='text'
                        disabled={this.props.displayMode}
                        defaultValue={currentAnswer}
                        onBlur={(event) => {
                            this.props.upsertAnswer({ textValue:
                                this.editBullet(event.target.value, index, currentAnswer) });
                        }} />,
                )}
                <input className={`bullet__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    disabled={this.props.displayMode}
                    defaultValue={''}
                    onBlur={(event) => {
                        this.props.upsertAnswer(
                            { textValue: this.addBullet(event.target.value, currentAnswer) });
                    }} />
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
