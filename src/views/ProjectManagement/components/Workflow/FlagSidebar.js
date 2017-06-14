import React, { Component } from 'react';
import { List, ListItem, Box, Button } from 'grommet';

class FlagSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flags: props.survey.filter(question => question.flag === true)
        }
        this.handleFlagSelect = this.handleFlagSelect.bind(this);
    }

    handleFlagSelect(event){
        console.log(event);
    }

    render() {
        return (
            <Box className='flag-sidebar'>
                <span className='flag-sidebar__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-sidebar__head-row'>
                    {this.state.flags.length}{this.props.vocab.PROJECT.FLAGS_REPORTED}
                    <Button className='flag-sidebar__head-row--button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE} />
                </div>
                <div className='flag-sidebar__review-container'>
                    <List>
                        {this.props.survey.map((q, i) => {
                            return (this.state.flags.includes(q)) ?
                                <ListItem key={'listitem'+q+i}
                                    onClick={this.handleFlagSelect.bind(this, i)}>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem> :
                                <ListItem key={'listitem'+q+i}
                                    className='flag-sidebar__questions--inactive'>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem>
                        })}
                    </List>
                </div>
            </Box>
        )
    }
}

export default FlagSidebar;
