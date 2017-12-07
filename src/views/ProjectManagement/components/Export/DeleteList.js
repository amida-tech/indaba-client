import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class DeleteList extends Component {
    render() {
        return (
            <div className='delete-list'>
                {
                    this.props.input.value.map(
                        entry =>
                        <div key={entry.key}
                            className='delete-list__entry'>
                            {entry.name}
                            <div className='delete-list__delete-button'
                                onClick={() => this.props.input.onChange(
                                    this.props.input.value.filter(
                                        valueIter => valueIter.key !== entry.key,
                                    ),
                                )}>
                                <IonIcon icon='ion-android-close'
                                    className='delete-list__delete-icon' />
                            </div>
                        </div>,
                    )
                }
            </div>
        );
    }
}

DeleteList.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            key: PropTypes.any.isRequired,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
    }),
};

export default DeleteList;
