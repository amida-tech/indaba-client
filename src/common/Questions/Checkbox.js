import React, { Component } from 'react';
import { Box, CheckBox } from 'grommet';

export class Checkbox extends Component {
    render() { // This should be a yes/no or multi checkbox. For now, y/n.
        return (
            <Box>
                {this.props.question}
                <CheckBox
                    checked={this.props.value}
                    label={this.props.value ?
                        this.props.vocab.YES :
                        this.props.vocab.NO}
                    toggle={true}/>
            </Box>
        )
    }
}
