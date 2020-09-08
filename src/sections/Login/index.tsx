import React, { useState, FC } from 'react';
import { useMutation } from '@apollo/client';
import { LOG_IN_USER } from '../../lib/graphql/mutations/LogIn/';
import { LOG_IN_USER as LOG_IN_USERData } from '../../lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { LOG_IN_USERVariables } from '../../lib/graphql/mutations/LogIn/__generated__/LOG_IN_USER';
import { Viewer } from '../../lib/types';

interface Props {
    setViewer: (viewer: Viewer) => void;
}

export const Login: FC<Props> = ({ setViewer }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logIn, { data, loading, error }] = useMutation<
        LOG_IN_USERData,
        LOG_IN_USERVariables
    >(LOG_IN_USER, {
        onCompleted: (data) => {
            if (data.logInUser) setViewer(data.logInUser);
        },
    });
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const data = await logIn({
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
