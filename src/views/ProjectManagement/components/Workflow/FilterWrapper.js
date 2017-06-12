import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import { toggleFilter } from '../../actions';

class FilterBar extends Component {
    render() {
        return (
      <div className='filter-bar'>
        {this.props.options.map(option => (
          <div
            key={option.key}
            className={`filter ${(this.props.filter === option.key) ? ' filter-checked' : ''}`}
            onClick={() => this.props.onToggleFilter(option.key)}>
            {option.label}
          </div>
        ))}
      </div>
        );
    }
}

class FilterWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = { showModalId: false };
    }
    makeModal(id) {
        if (id === 'add_stage') {
            return <AddStage />;
        } else if (id === 'add_subject') {
            return <AddSubject />;
        }
        return null;
    }
    render() {
        const Filters = [{
            label: this.props.vocab.PROJECT.FILTER_UNASSIGNED,
            key: 'unassigned',
        }, {
            label: this.props.vocab.PROJECT.FILTER_LATE,
            key: 'late',
        }, {
            label: this.props.vocab.PROJECT.FILTER_IN_PROGRESS,
            key: 'inprogress',
        }, {
            label: this.props.vocab.PROJECT.FILTER_NOT_STARTED,
            key: 'notstarted',
        }, {
            label: this.props.vocab.PROJECT.FILTER_FLAGGED,
            key: 'flagged',
        }];

        return (
            <div className='filter-wrapper'>
                {this.makeModal(this.state.showModalId)}
                <FilterBar options={Filters}
                    filter={this.props.filter}
                    onToggleFilter={this.props.onToggleFilter}/>
                <div className='add-button-panel'>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={this.props.onAddStageClick}/>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={this.props.onAddSubjectClick}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.project.workflow.filter,
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = dispatch => ({
    onToggleFilter: filter => dispatch(toggleFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);
