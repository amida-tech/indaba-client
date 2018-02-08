import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Select } from 'grommet';

class Dropdown extends Component {
    render() {
        let currentValue = get(this.props, 'answer', undefined);
        if (currentValue) {
            currentValue = this.props.choices.find(choice =>
                choice.id === currentValue.choice).text;
        }
        return (
            <div className='dropdown'>
                {
                    this.props.displayMode ?

                    <select className='dropdown__field'
                        value={currentValue}
                        placeholder={this.props.vocab.PROJECT.SELECT_OPTION}
                        disabled={true}>
                        <option className='dropdown__option'
                            label={currentValue} />
                    </select> :

                    <Select className='dropdown__field'
                        value={currentValue}
                        placeHolder={this.props.vocab.PROJECT.SELECT_OPTION}
                        readonly={this.props.displayMode}
                        options={this.props.choices.map((entry) => {
                            return { label: entry.text, value: entry.id };
                        })}
                        onChange={(event) => {
                            this.props.upsertAnswer({ choice: event.option.value });
                        }} />
                }
            </div>
        );
    }
}

Dropdown.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Dropdown;
