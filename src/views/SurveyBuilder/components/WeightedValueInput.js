import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeightedValueInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        console.log(evt.target.value);
        this.props.upsertWeight(
            this.props.sectionIndex,
            this.props.questionIndex,
            this.props.index,
            event.target.value,
        )
    }

    render() {
        return (
            <input className='weighted-value-input'
                type='number'
                placeholder={0}
                value={this.props.weight || ''}
                onChange={this.handleChange} />
        );
    }
}

WeightedValueInput.propTypes = {
    index: PropTypes.number.isRequired,
    weight: PropTypes.number,
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    upsertWeight: PropTypes.func.isRequired,
};

export default WeightedValueInput;
