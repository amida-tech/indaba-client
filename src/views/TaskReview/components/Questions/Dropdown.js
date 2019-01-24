import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Select from 'react-select';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: this.props.choices.map((entry) => {
                return { label: entry.text, value: entry.id };
            })
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.props.upsertAnswer({ choice: evt.value });
    }

    render() {
        let currentValue = get(this.props, 'answer', undefined);
        if (currentValue) {
            currentValue = {
                value: currentValue,
                label: this.props.choices.find(choice => choice.id === currentValue.choice).text,
            }
        };
        return (
            <div className='dropdown'>
                {
                    this.props.displayMode
                        ? <select className='dropdown__field-disabled'
                            value={currentValue.label}
                            placeholder={this.props.vocab.PROJECT.SELECT_OPTION}
                            disabled={true}>
                            <option className='dropdown__option'
                                label={currentValue.label} />
                        </select>
                        : <Select className='dropdown__field'
                            value={currentValue}
                            placeHolder={this.props.vocab.PROJECT.SELECT_OPTION}
                            readOnly={this.props.displayMode}
                            options={this.state.options}
                            clearable={false}
                            onChange={this.handleChange} />
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
