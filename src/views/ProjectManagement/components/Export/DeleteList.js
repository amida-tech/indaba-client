import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

class DeleteList extends Component {
    render() {
        return (
            <div className='delete-list'>
                {
                    this.props.entries.map(
                        entry =>
                        <div key={entry.key}
                            className='delete-list__entry'>
                            {entry.name}
                            <div className='delete-list__delete-button'
                                onClick={() => this.props.onDelete(entry)}>
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
    entries: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        key: PropTypes.any.isRequired,
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteList;
