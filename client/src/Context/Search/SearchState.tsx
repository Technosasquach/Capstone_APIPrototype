import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import SearchReducer from './searchReducer';
import {
    SEARCH_NODES,
    SET_LOADING,
    SEARCH_COURSES,
} from '../types';

const SearchState = (props: any) => {
    const initialState = {
        nodes: [],
        courses: [],
        loading: false
    }

    const [state, dispatch] = useReducer(SearchReducer, initialState);
    const setLoading = () => dispatch({ type: SET_LOADING });

    const searchNodes = async (text: any) => {
        setLoading();

        let data: any = {};
        data['query'] = "query{everyNode{ id createdAt depth name json keywords }}\n\n";
        
        const res = await axios.post("http://localhost:3000/graphql/", data)
            .then((res) => res.data.data.everyNode.filter((name: any) => {
                return name.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }));
        //console.log("Sending search to reducer from SearchState");
        dispatch({
            type: SEARCH_NODES,
            payload: res
        });
    }

    const searchCourses = async (text: any) => {
        setLoading();

        let data: any = {};
        data['query'] = "query{everyCourse{ id name nodes {id}}}\n\n";
        
        const res = await axios.post("http://localhost:3000/graphql/", data)
            .then((res) => res.data.data.everyCourse.filter((name: any) => {
                return name.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }));
        //console.log("Sending search to reducer from SearchState");
        dispatch({
            type: SEARCH_COURSES,
            payload: res
        });
    }

    return <SearchContext.Provider
        //makes it available to components below this in index.tsx
        value={{
            nodes: state.nodes,
            courses: state.courses,
            loading: state.loading,
            searchNodes,
            searchCourses,
        }}
    >
        {props.children}
    </SearchContext.Provider>
}

export default SearchState;