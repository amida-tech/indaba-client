import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer } from 'grommet';

class LayerFooterButton extends Component {
    render() {
        return (
      <div
        className={`layer-footer-button ${this.props.primary ? 'layer-footer-button-primary' : ''}`}
        onClick={this.props.onClick}>{this.props.label}</div>
        );
    }
}

class Modal extends Component {
    render() {
        const vocab = this.props.vocab;
        return (
            <Layer align='top'
                closer={false}
                flush={true}
                onClose={this.props.onCancel}>
                <div className={`layer-content ${this.props.class || ''}`}>
                    {this.props.title && <div className='layer-title'>{this.props.title}</div>}
                    <div className='layer-body-container'>
                        {this.props.children}
                    </div>
                    <div className='layer-footer'>
                        <div className='layer-footer-button-wrapper'>
                            {this.props.onCancel &&
                                <LayerFooterButton
                                    label={vocab.COMMON.CANCEL}
                                    onClick={this.props.onCancel}/>
                            }
                            {this.props.onSave &&
                                <LayerFooterButton
                                    label={vocab.COMMON.SAVE}
                                    primary={true}
                                    onClick={this.props.onSave}/>
                            }
                            {(this.props.buttons || []).map(button =>
                                <LayerFooterButton {...button} />,
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
