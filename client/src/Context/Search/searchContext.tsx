import { createContext } from 'react';

const initialState = {
    nodes: [],
    courses: [],
    loading: false,
    searchNodes(text: any): any {},
    searchCourses(text: any): any {},
};

// const searchConext = createContext();
const searchConext = createContext(initialState);

export default searchConext;