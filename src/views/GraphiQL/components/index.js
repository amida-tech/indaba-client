import React, { Component } from 'react';
import GraphiQL from 'graphiql';

import apiService from '../../../services/api';

export default class GraphQLContainer extends Component {
    render() {
        return (
            <div style={{ height: '800px' }}>
                <GraphiQL fetcher={apiService.messaging.graphql} />
            </div>
        );
    }
}
