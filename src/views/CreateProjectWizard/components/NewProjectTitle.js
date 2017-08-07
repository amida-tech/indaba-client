import React, { Component } from 'react';
import { TextInput } from 'grommet';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';

class NewProjectTitle extends Component {
    constructor(props) {
        super(props);
        this.handleTitleEntry = this.handleTitleEntry.bind(this);
        this.handleSummaryEntry = this.handleSummaryEntry.bind(this);
    }

    handleTitleEntry(event) {
        this.props.updateTitle(event.target.value);
    }

    handleSummaryEntry(event) {
        this.props.updateSummary(event.target.value);
    }

    render() {
        return <Modal
            title={this.props.vocab.PROJECT.PROJECT_TITLE}
            class='new-project-title-layer'
            onSave={() => this.props.onSave(
                {
                    user: {
                        realmUserId: this.props.profile.id,
                        organizationId: this.props.profile.organizationId,
                    },
                    codeName: this.props.title,
                    description: this.props.summary,
                    langId: 1,
                },
                this.props.vocab.ERROR,
            )}>
            <div className='new-project-title'>
                <TextInput className='new-project-title__name'
                    placeHolder={this.props.vocab.PROJECT.TITLE}
                    onDOMChange={this.handleTitleEntry} />
                <div className='new-project-title__summary-container'>
                    <textarea className='new-project-title__summary'
                        placeholder={this.props.vocab.PROJECT.SUMMARY}
                        onChange={this.handleSummaryEntry} />
                </div>
                {this.props.errorMessage &&
                    <div className='new-project-title__error'>
                        {this.props.errorMessage}
                    </div>
                }
            </div>
        </Modal>;
    }
}

NewProjectTitle.propTypes = {
    vocab: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateSummary: PropTypes.func.isRequired,
};

export default NewProjectTitle;
