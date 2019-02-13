import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import FooterButton from './FooterButton';

class Modal extends Component {
    render() {
        return (
            <div className='modal-c' id='modal-c'>
                <div className={`modal-c__container modal-c--${this.props.class || ''}`}>
                    {
                        this.props.title
                        && <div className='modal-c__title'>{this.props.title}</div>
                    }
                    <div className='modal-c__contents'>
                        {
                            this.props.bodyText
                            && <div className='modal-c__body-text'>{this.props.bodyText}</div>
                        }
                        {this.props.children}
                    </div>
                    <div className='modal-c__footer'>
                        <div>
                            {(this.props.buttons || []).map(button => <FooterButton {...button} key={button.key}/>)}
                        </div>
                        <div>
                            {this.props.onCancel
                                && <FooterButton
                                    label={this.props.vocab.COMMON.CANCEL}
                                    primary={false}
                                    onClick={this.props.onCancel}/>
                            }
                            {this.props.onSave
                                && <FooterButton
                                    label={this.props.saveLabel || this.props.vocab.COMMON.SAVE}
                                    primary={true}
                                    onClick={this.props.onSave}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    saveLabel: PropTypes.string,
    vocab: PropTypes.object.isRequired,
    title: PropTypes.string,
    bodyText: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
        primary: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
    })),
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = (dispatch, ownProps) => {
    return ownProps.form
        ? { onSave: () => dispatch(submit(ownProps.form)) }
        : {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
