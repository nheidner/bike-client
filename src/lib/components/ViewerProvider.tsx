import React, { useState, FC } from 'react';
import { viewerContext, initialViewer } from '../utils';

export const ViewerProvider: FC = ({ children }) => {
    const [viewer, setViewer] = useState(initialViewer);

    return (
        <viewerContext.Provider value={{ viewer, setViewer }}>
            {children}
        </viewerContext.Provider>
    );
};
