import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, get, unionBy } from 'lodash';

class Choices extends Component {
    render() {
        return (
            <div className='choices'>
                {this.props.choices.map((choice, index) => <div className='choices__row'
                    key={`choices-${this.props.id}-${index}`}>
                    <input className={`choices__field choices__field${this.props.displayMode ? '--disabled' : ''}`}
                        type='checkbox'
                        disabled={this.props.displayMode}
                        defaultChecked={get(find(this.props.answer.choices, item => item.id === choice.id), 'boolValue', false)}
                        onClick={(event) => {
                            this.props.upsertAnswer({
                                choices: unionBy([{
                                    id: choice.id,
                                    boolValue: event.target.checked,
                                }], this.props.answer.choices, 'id'),
                            });
                        }} />
                    <span className='choices__label'>
                        {` ${choice.text}`}
                    </span>
                </div>)}
            </div>
        );
    }
}

Choices.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Choices;
