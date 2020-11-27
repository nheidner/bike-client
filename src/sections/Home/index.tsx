import React, { FC } from 'react';
import { Services } from './components';
import { Viewer } from '../../lib/types';

interface Props {
    viewer: Viewer;
}

export const Home: FC<Props> = ({ viewer }) => {
    return (
        <div>
            <div>Home</div>
            <div>
                <h1>Our Services</h1>
                <Services />
            </div>
        </div>
    );
};
