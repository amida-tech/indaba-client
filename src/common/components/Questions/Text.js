import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { isValid } from '../../../utils/Validation';

class Text extends Component {
    render() {
        return (
            <div className='text' >
                <div className='text__label'>
                    {this.props.text}
                </div>
                <input className={`text__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    disabled={this.props.displayMode}
                    onBlur={(event) => {
                        this.props.actions.upsertAnswer(
                            this.props.id,
                            { textValue: event.target.value },
                            this.props.required,
                        );
                    }}
                />
            </div>
        );
    }
}
// let warn = '';
// onChange={(event) => {
//     warn = isValid(['letters'], event.target.value, this.props.vocab.VALIDATE);
// }}
// if (!warn) {
//     this.props.actions.postAnswer(
//         this.props.surveyId,
//         this.props.id,
//         'textValue',
//         event.target.value,
//         this.props.vocab.ERROR);
// }

Text.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Text;
