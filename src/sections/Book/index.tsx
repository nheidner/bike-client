import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const Book = () => {
    const location = useLocation();
    const params = useParams();
    return (
        <div>
            <h1>Book</h1>
        </div>
    );
};
