import React, { Component } from 'react';
import PropTypes from 'prop-types';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import ProjectListHeader from './ProjectListHeader';
import ProjectListEntry from './ProjectListEntry';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        fontSize: 14,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ProjectListTable extends Component {
    render() {
        return (
            <Paper>
                <Table>
                    <ProjectListHeader vocab={this.props.vocab}/>
                    <TableBody>
                        { this.props.ui.noData
                            ? <TableRow>{this.props.vocab.PROJECTS.NO_PROJECTS}</TableRow>
                            : this.props.rows.map(row => <ProjectListEntry key={`proj${row.project.id}`} {...row}
                                vocab={this.props.vocab}
                            />)
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

ProjectListTable.propTypes = {
    vocab: PropTypes.object.isRequired,
    rows: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectListTable);
