import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer } from 'grommet';

import FooterButton from './FooterButton';

class Modal extends Component {
    render() {
        return (
            <Layer align='top'
                closer={false}
                flush={true}
                onClose={this.props.onCancel}>
                <div className={`modal-c ${this.props.class || ''}`}>
                    {this.props.title && <div className='modal-c__title'>{this.props.title}</div>}
                    <div className='modal-c__container'>
                        {this.props.children}
                    </div>
                    <div className='modal-c__footer'>
                        <div className='modal-c__button-wrapper'>
                            {this.props.onCancel &&
                                <FooterButton
                                    label={this.props.vocab.COMMON.CANCEL}
                                    onClick={this.props.onCancel}/>
                            }
                            {this.props.onSave &&
                                <FooterButton
                                    label={this.props.vocab.COMMON.SAVE}
                                    primary={true}
                                    onClick={this.props.onSave}/>
                            }
                            {(this.props.buttons || []).map(button =>
                                <FooterButton {...button} />,
                            )}
                        </div>
                    </div>
                </div>
            </Layer>
        );
    }
}

Modal.propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    vocab: PropTypes.object.isRequired,
    title: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        primary: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    })),
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(Modal);
