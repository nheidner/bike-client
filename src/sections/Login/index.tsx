import React, { useState, FC } from 'react';
import { useMutation } from '@apollo/client';
import { LOG_IN_USER } from '../../lib/graphql/mutations/LogIn/';
import { LOG_IN_USER as LOG_IN_USERData } from '../../lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { LOG_IN_USERVariables } from '../../lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { useViewer } from '../../lib/utils';
import { useHistory, useLocation } from 'react-router-dom';

export const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setViewer } = useViewer();

    let history = useHistory();
    let location = useLocation<{
        from: { pathname: string; state: undefined | any; [more: string]: any };
    }>();

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
                    let { from } = location.state || {
                        from: { pathname: '/' },
                    };

                    history.push(from);
                }
            },
        }
    );
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const _ = await logIn({
                    variables: { input: { email, password, service: 'EMAIL' } },
                });
            }}>
            <input
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Log In</button>
        </form>
    );
};
