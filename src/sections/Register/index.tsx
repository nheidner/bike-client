import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../lib/graphql/mutations/Register';
import {
    REGISTER_USER as REGISTER_USER_DATA,
    REGISTER_USERVariables,
} from '../../lib/graphql/mutations/Register/__generated__/REGISTER_USER';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [register, { data, loading, error }] = useMutation<
        REGISTER_USER_DATA,
        REGISTER_USERVariables
    >(REGISTER_USER);

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const res = await register({
                            variables: {
                                input: { email, password, firstName, lastName },
                            },
                        });
                    } catch (error) {
                        console.log('error: ', error);
                    }
                }}>
                <input
                    value={email}
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    type='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    value={firstName}
                    placeholder='firstName'
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    value={lastName}
                    placeholder='lastName'
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type='submit'>register</button>
            </form>
        </div>
    );
};
