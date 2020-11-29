import { useContext, createContext } from 'react';
import { Viewer } from '../types';

export const initialViewer: Viewer = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    didRequest: false,
};

export const viewerContext = createContext<{
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}>({ viewer: initialViewer, setViewer: () => {} });

export const useViewer = () => useContext(viewerContext);
