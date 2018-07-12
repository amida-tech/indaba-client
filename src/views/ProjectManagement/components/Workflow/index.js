import React, { Component } from 'react';
import FilterWrapper from './FilterWrapper';
import MatrixContainer from './MatrixContainer';


class WorkflowContainer extends Component {
    render() {
        return (
                <div>
                <FilterWrapper project={this.props.project}
                    vocab={this.props.vocab}
                    actions={this.props.actions}
                    ui={this.props.ui} />
                <MatrixContainer {...this.props}/>
                </div>
        );
    }
}

export default WorkflowContainer;
