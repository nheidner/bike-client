import React, { FC } from 'react';
import { Services } from './components';
import { Viewer } from '../../lib/types';

export const Home: FC = () => {
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
