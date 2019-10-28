import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import SearchReducer from './searchReducer';
import {
    SEARCH_NODES,
    SET_LOADING_PAGE,
    SET_LOADING_COURSE,
    SEARCH_COURSES,
} from '../types';

const SearchState = (props: any) => {
    const initialState = {
        nodes: [],
        courses: [],
        loading: false
    }

    const [state, dispatch] = useReducer(SearchReducer, initialState);
    const setLoadingPage = () => dispatch({ type: SET_LOADING_PAGE });
    const setLoadingCourse = () => dispatch({ type: SET_LOADING_COURSE });

    const searchNodes = async (text: any) => {
        setLoadingPage();

        let data: any = {};
        data['query'] = "query{everyNode{ id createdAt depth name json keywords }}\n\n";
        
        const res = await axios.post("/graphql/", data)
            .then((res) => {
                if(text) {
                    return res.data.data.everyNode.filter((name: any) => {
                        return name.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
                    });
                } else {
                    return res.data.data.everyNode;
                }
            });

        dispatch({
            type: SEARCH_NODES,
            payload: res
        });
    }

    const searchCourses = async (text: any) => {
        setLoadingCourse();

        let data: any = {};
        data['query'] = "query{everyCourse{ id name nodes {id}}}\n\n";
        
        const res = await axios.post("/graphql/", data)
            .then((res) => {
                if(text) {
                    return res.data.data.everyCourse.filter((name: any) => {
                        return name.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
                    })
                } else {
                    return res.data.data.everyCourse;
                }
            });

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
            pageLoading: state.pageLoading,
            courseLoading: state.courseLoading,
            searchNodes,
            searchCourses,
        }}
    >
        {props.children}
    </SearchContext.Provider>
}

export default SearchState;