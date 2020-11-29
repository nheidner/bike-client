import React, { FC, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
    from,
} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, AppHeader, Home, Register, NotFound } from './sections';
import { Services } from './sections/Service';
import { useViewer } from './lib/utils';
import { useMutation } from '@apollo/client';
import { LOG_IN_USER } from './lib/graphql/mutations/LogIn';
import { LOG_IN_USER as LOG_IN_USERData } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { LOG_IN_USERVariables } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { Book } from './sections/Book';
import { PrivateRoute, ViewerProvider } from './lib/components';

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

const client = new ApolloClient({
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

const App = () => {
    const { setViewer } = useViewer();
    const [logIn] = useMutation<LOG_IN_USERData, LOG_IN_USERVariables>(
        LOG_IN_USER,
        {
            onCompleted: (data) => {
                if (data.logInUser) {
                    setViewer(data.logInUser);
                    if (data.logInUser.token) {
                        sessionStorage.setItem('token', data.logInUser.token);
                    } else {
                        sessionStorage.removeItem('token');
                    }
                }
            },
        }
    );
    const logInRef = useRef(logIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    return (
        <Router>
            <div>
                <AppHeader />
                <Switch>
                    <Route exact path='/' render={() => <Home />} />
                    <Route
                        exact
                        path='/services/:id'
                        render={() => <Services />}
                    />

                    <Route exact path='/login' render={() => <Login />} />
                    <Route exact path='/register' render={() => <Register />} />
                    <PrivateRoute path='/book/:id'>
                        <Book />
                    </PrivateRoute>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <ViewerProvider>
            <App />
        </ViewerProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
