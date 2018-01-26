import React, { Component } from 'react';
import GraphiQL from 'graphiql';

import apiService from '../../../services/api';

export default class GraphQLContainer extends Component {
    render() {
        return (
            <GraphiQL fetcher={apiService.messaging.graphqlFetcher} />
        );
    }
}
