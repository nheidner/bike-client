import React, { FC } from 'react';
import { useViewer } from '../utils';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute: FC<{ [rest: string]: any }> = ({
    children,
    ...rest
}) => {
    const { viewer } = useViewer();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!viewer.token && viewer.didRequest) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />
                    );
                }
                if (!viewer.token) {
                    return <div></div>;
                }
                return children;
            }}
        />
    );
};
