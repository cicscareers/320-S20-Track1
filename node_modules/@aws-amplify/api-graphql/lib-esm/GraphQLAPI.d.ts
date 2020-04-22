import Observable from 'zen-observable-ts';
import { GraphQLOptions, GraphQLResult } from './types';
export declare const graphqlOperation: (query: any, variables?: {}) => {
    query: any;
    variables: {};
};
/**
 * Export Cloud Logic APIs
 */
export declare class GraphQLAPIClass {
    /**
     * @private
     */
    private _options;
    private _api;
    /**
     * Initialize GraphQL API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    constructor(options: any);
    getModuleName(): string;
    /**
     * Configure API
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    configure(options: any): any;
    /**
     * Create an instance of API for the library
     * @return - A promise of true if Success
     */
    createInstance(): true | Promise<never>;
    private _headerBasedAuth;
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation: any): any;
    /**
     * Executes a GraphQL operation
     *
     * @param {GraphQLOptions} GraphQL Options
     * @param {object} additionalHeaders headers to merge in after any `graphql_headers` set in the config
     * @returns {Promise<GraphQLResult> | Observable<object>}
     */
    graphql({ query: paramQuery, variables, authMode }: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }): Observable<any> | Promise<GraphQLResult<object>>;
    private _graphql;
    private _graphqlSubscribe;
    /**
     * @private
     */
    _ensureCredentials(): any;
}
export declare const GraphQLAPI: GraphQLAPIClass;
