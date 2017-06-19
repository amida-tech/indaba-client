import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import { toggleFilter, addSubject, addStage } from '../../actions';
import AddSubject from '../Modals/AddSubject';
import AddStage from '../Modals/AddStage';

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
            return <AddStage
                vocab={this.props.vocab}
                onCancel={() => this.setState({ showModalId: false })}
                onAddStage={(stage) => {
                    this.setState({ showModalId: false });
                    this.props.onAddStage(stage);
                }}
                userGroups={this.props.project.userGroups} />;
        } else if (id === 'add_subject') {
            return <AddSubject
                vocab={this.props.vocab}
                onCancel={() => this.setState({ showModalId: false })}
                onAddSubject={(subject) => {
                    this.setState({ showModalId: false });
                    this.props.onAddSubject(subject);
                }} />;
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
                    filter={this.props.project.filter}
                    onToggleFilter={this.props.onToggleFilter}/>
                <div className='add-button-panel'>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={() => this.setState({ showModalId: 'add_stage' })}/>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={() => this.setState({ showModalId: 'add_subject' })}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onToggleFilter: filter => dispatch(toggleFilter(filter, ownProps.project.id)),
    onAddSubject: subject => dispatch(addSubject(subject, ownProps.project.id)),
    onAddStage: stage => dispatch(addStage(stage, ownProps.project.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);
