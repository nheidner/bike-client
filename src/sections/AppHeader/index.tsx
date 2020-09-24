import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Viewer } from '../../lib/types';
import { useMutation } from '@apollo/client';
import { LOG_OUT_USER } from '../../lib/graphql/mutations/LogOut';
import { LOG_OUT_USER as LOG_OUT_USERDAta } from '../../lib/graphql/mutations/LogOut/__generated__/LOG_OUT_USER';

interface Props {
    setViewer: (viewer: Viewer) => void;
    viewer: Viewer;
}

export const AppHeader: FC<Props> = ({ viewer, setViewer }) => {
    const [logOut, { data, loading, error }] = useMutation<LOG_OUT_USERDAta>(
        LOG_OUT_USER,
        {
            onCompleted: (data) => {
                if (data && data.logOutUser) {
                    setViewer(data.logOutUser);
                    sessionStorage.removeItem('token');
                }
            },
        }
    );

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
