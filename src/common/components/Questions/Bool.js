import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bool extends Component {
    render() {
        return (
            <div className='bool' >
                <div className='bool__label'>
                    {this.props.text}
                </div>
                <input className={`bool__field${this.props.displayMode ? '--disabled' : ''}`}
                    type='checkbox'
                    disabled={this.props.displayMode}
                    onClick={() => {
                        this.props.actions.upsertAnswer(
                            this.props.id,
                            { boolValue: !this.props.answer },
                    );
                    }} />
            </div>
        );
    }
}

Bool.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Bool;
