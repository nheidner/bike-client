import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
    from,
} from '@apollo/client';

const httpLink = new HttpLink({ uri: '/api' });

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            'X-CSRF-TOKEN': sessionStorage.getItem('token'),
        },
    }));

    return forward(operation);
});

export const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    services: {
                        keyArgs: false,
                        merge(existing, incoming, { args }) {
                            // Slicing is necessary because the existing data is
                            // immutable, and frozen in development.
                            let merged;
                            if (existing) {
                                let newResult = existing.result.slice(0);
                                for (
                                    let i = 0;
                                    i < incoming.result.length;
                                    i++
                                ) {
                                    if (args)
                                        newResult[args.offset + i] =
                                            incoming.result[i];
                                }
                                merged = { ...existing, result: newResult };
                            }
                            if (!existing) {
                                merged = incoming;
                            }

                            return merged;
                        },
                    },
                },
            },
        },
    }),
    link: from([authMiddleware, httpLink]),
});
