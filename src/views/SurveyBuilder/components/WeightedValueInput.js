import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeightedValueInput extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleKeyDown(evt) {
        if (evt.key === 'e' || evt.key === '.') {
            evt.preventDefault();
        }
    }

    handleChange(evt) {
        this.props.upsertWeight(
            this.props.sectionIndex,
            this.props.questionIndex,
            this.props.index,
            evt.target.value,
        );
    }

    render() {
        return (
            <input className='weighted-value-input'
                type='number'
                placeholder={0}
                value={this.props.weight || ''}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange} />
        );
    }
}

WeightedValueInput.propTypes = {
    index: PropTypes.number.isRequired,
    weight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    upsertWeight: PropTypes.func.isRequired,
};

export default WeightedValueInput;
