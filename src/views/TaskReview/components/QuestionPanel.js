import React, { Component } from 'react';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Element from 'react-scroll/modules/components/Element';

import ReviewPane from '../../../common/ReviewPane';

class QuestionPanel extends Component {
    render() {
        return (
            <Element name={`question${this.props.index}`}>
                <AccordionPanel
                    heading={this.props.vocab.PROJECT.QUESTION_ + (this.props.index + 1)}
                    {...this.props}>
                        <ReviewPane {...this.props.question}/>
                </AccordionPanel>
            </Element>
        );
    }
}

export default QuestionPanel;
