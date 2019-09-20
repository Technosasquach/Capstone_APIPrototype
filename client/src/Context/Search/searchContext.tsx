import { createContext } from 'react';

const initialState = {
    nodes: [],
    loading: false,
    searchNodes(text: any): any {},
};

// const searchConext = createContext();
const searchConext = createContext(initialState);

export default searchConext;