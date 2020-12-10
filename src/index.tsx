import React, { FC, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, AppHeader, Home, Register, NotFound } from './sections';
import { Services } from './sections/Service';
import { useViewer } from './lib/utils';
import { useMutation } from '@apollo/client';
import { LOG_IN_USER } from './lib/graphql/mutations/LogIn';
import { LOG_IN_USER as LOG_IN_USERData } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { LOG_IN_USERVariables } from './lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { NewBooking } from './sections/NewBooking';
import { PrivateRoute, ViewerProvider } from './lib/components';
import { client } from './lib/graphql/apollo';

const App = () => {
    const { setViewer } = useViewer();
    const [logIn] = useMutation<LOG_IN_USERData, LOG_IN_USERVariables>(
        LOG_IN_USER,
        {
            onCompleted: (data) => {
                if (data.logInUser) {
                    // must be before setViewer() so PrivateRoutes mount only after the right token is set
                    if (data.logInUser.token) {
                        sessionStorage.setItem('token', data.logInUser.token);
                    } else {
                        sessionStorage.removeItem('token');
                    }
                    setViewer(data.logInUser);
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
                    <PrivateRoute path='/newBooking/:serviceId'>
                        <NewBooking />
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
