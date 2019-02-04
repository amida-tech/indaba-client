import React from 'react';
import PropTypes from 'prop-types';

// material ui
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ProjectListHeader = ({ vocab }) => <TableHead>
    <TableRow>
        <TableCell>
            {vocab.PROJECT.PROJECT}
        </TableCell>
        <TableCell>
            {vocab.PROJECT.STATUS}
        </TableCell>
        <TableCell>
            {vocab.PROJECT.SURVEY}
        </TableCell>
        <TableCell>
            {vocab.PROJECT.FLAGS}
        </TableCell>
        <TableCell>
            {vocab.PROJECT.LAST_UPDATED}
        </TableCell>
    </TableRow>
</TableHead>;

ProjectListHeader.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default ProjectListHeader;
