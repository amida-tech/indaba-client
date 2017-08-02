import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';

class NameChangeModal extends Component {
    render() {
        return (
            <Modal title={this.props.title}
                buttons={[{
                    key: this.props.vocab.COMMON.OK,
                    label: this.props.vocab.COMMON.OK,
                    primary: true,
                    onClick: this.props.onOk,
                }]}>
                <div className='name-change-modal'>
                    <div className='name-change-modal__label'>
                        {this.props.label}
                    </div>
                    <div className='name-change-modal__name'>
                        {this.props.name}
                    </div>
                </div>
            </Modal>
        );
    }
}

NameChangeModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onOk: PropTypes.func.isRequired,
};

export default NameChangeModal;
