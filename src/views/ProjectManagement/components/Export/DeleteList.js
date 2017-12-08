import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class DeleteList extends Component {
    render() {
        return (
            <div className='delete-list'>
                {
                    this.props.input.value.length > 0 ?
                    this.props.input.value.map(
                        entry => (
                        <div key={entry.id}
                            className='delete-list__entry'>
                            {entry.name}
                            <div className='delete-list__delete-button'
                                onClick={!this.props.disabled &&
                                    (() => this.props.input.onChange(
                                    this.props.input.value.filter(
                                        valueIter => valueIter.id !== entry.id,
                                    ),
                                ))}>
                                <IonIcon icon='ion-android-close'
                                    className='delete-list__delete-icon' />
                            </div>
                        </div>)) :
                    <div className='delete-list__empty'>
                        {this.props.vocab.EXPORT.NONE_SELECTED}
                    </div>
                }
            </div>
        );
    }
}

DeleteList.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.any.isRequired,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
    }),
    disabled: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default DeleteList;
