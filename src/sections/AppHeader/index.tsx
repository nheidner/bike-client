import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useViewer } from '../../lib/utils';
import { useMutation } from '@apollo/client';
import { LOG_OUT_USER } from '../../lib/graphql/mutations/LogOut';
import { LOG_OUT_USER as LOG_OUT_USERDAta } from '../../lib/graphql/mutations/LogOut/__generated__/LOG_OUT_USER';

export const AppHeader: FC = () => {
    const { viewer, setViewer } = useViewer();
    const [logOut] = useMutation<LOG_OUT_USERDAta>(LOG_OUT_USER, {
        onCompleted: (data) => {
            if (data && data.logOutUser) {
                setViewer(data.logOutUser);
                sessionStorage.removeItem('token');
            }
        },
    });

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div>
            <div>
                <Link to='/'>Home</Link>

                <Link to='/register'>Register</Link>
            </div>
            <span>
                {viewer.firstName && viewer.lastName ? (
                    `Welcome ${viewer.firstName} ${viewer.lastName}`
                ) : (
                    <Link to='/login'>Login</Link>
                )}
                {viewer.id && <button onClick={handleLogOut}>Log Out</button>}
            </span>
        </div>
    );
};
