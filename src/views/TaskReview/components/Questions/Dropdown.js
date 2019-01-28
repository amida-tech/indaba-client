import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Select from 'react-select';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        let currentValue = get(this.props, 'answer', undefined);
        if (currentValue) {
            currentValue = {
                value: currentValue,
                label: this.props.choices.find(choice => choice.id === currentValue.choice).text,
            }
        };

        this.state = {
            options: this.props.choices.map((entry) => {
                return { label: entry.text, value: entry.id };
            }),
            currentValue,
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({currentValue: evt});
        this.props.upsertAnswer({ choice: evt.value });
    }

    render() {
        return (
            <div className='dropdown'>
                <Select className={`dropdown__field dropdown__field${this.props.displayMode ? '--disabled' : ''}`}
                    value={this.state.currentValue}
                    disabled={this.props.displayMode}
                    placeHolder={this.props.vocab.PROJECT.SELECT_OPTION}
                    readOnly={this.props.displayMode}
                    options={this.state.options}
                    clearable={false}
                    onChange={this.handleChange} />
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
