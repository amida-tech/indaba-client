import React, { Component } from 'react';
import { Box, NumberInput } from 'grommet';

export class Number extends Component {
    render() {
        return (
            <Box>
                {this.props.question}
                <NumberInput defaultValue={this.props.value}
                    disabled={true}
                    min={0} />
            </Box>
        );
    }
}
