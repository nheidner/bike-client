import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, AppHeader, Home, Register, NotFound } from './sections';
import * as serviceWorker from './serviceWorker';
import { LOG_IN_USER } from './lib/graphql/mutations/LogIn';
import { LOG_IN_USER as LOG_IN_USERData } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { LOG_IN_USERVariables } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { Viewer } from './lib/types';

const client = new ApolloClient({
    uri: '/api',
    cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    didRequest: false,
};

const App = () => {
    const [viewer, setViewer] = useState(initialViewer);

    const [logIn, { data, loading, error }] = useMutation<
        LOG_IN_USERData,
        LOG_IN_USERVariables
    >(LOG_IN_USER, {
        onCompleted: (data) => {
            if (data.logInUser) setViewer(data.logInUser);
        },
    });
    const logInRef = useRef(logIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    console.log('viewer: ', viewer);
    return (
        <Router>
            <div>
                <AppHeader viewer={viewer} setViewer={setViewer} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route
                        exact
                        path='/login'
                        render={() => <Login setViewer={setViewer} />}
                    />
                    <Route exact path='/register' render={() => <Register />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
