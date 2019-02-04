import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Time from '../../../utils/Time';
import FlagCount from '../../../common/components/Dashboard/FlagCount';

class ProjectListEntry extends Component {
    render() {
        return (
            <TableRow
                onClick={() => this.props.router.push(`/project/${this.props.project.id}`)}>
                <TableCell>
                    {this.props.project.name}
                </TableCell>
                <TableCell>
                    { this.props.project.status
                        ? this.props.vocab.PROJECT.STATUS_ACTIVE
                        : this.props.vocab.PROJECT.STATUS_INACTIVE}
                </TableCell>
                <TableCell>
                    {this.props.survey.name}
                </TableCell>
                <TableCell>
                    {this.props.survey.status === 'published'
                        ? this.props.vocab.SURVEY.STATUS_PUBLISHED
                        : this.props.vocab.SURVEY.STATUS_DRAFT}
                </TableCell>
                <TableCell>
                    {this.props.flagHistory && <FlagCount value={this.props.flags}/>}
                </TableCell>
                <TableCell>
                    {Time.renderCommon(this.props.project.lastUpdated)}
                </TableCell>
            </TableRow>
        );
    }
}

ProjectListEntry.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        lastUpdated: PropTypes.string,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    }),
    flags: PropTypes.number.isRequired,
    flagHistory: PropTypes.bool.isRequired,
};

export default withRouter(ProjectListEntry);
