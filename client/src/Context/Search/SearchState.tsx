import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import SearchReducer from './searchReducer';
import {
    SEARCH_NODES,
    SET_LOADING,
    // CLEAR_USERS,
    // GET_USER,
    // GET_REPOS
} from '../types';

const SearchState = (props: any) => {
    const initialState = {
        nodes: [],
        // user: {},
        // repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(SearchReducer, initialState);

    //Search users
    // Searches for a user on github
    const searchNodes = async (text: any) => {
        setLoading();

        let data: any = {};
        data['query'] = "query{everyNode{ id createdAt depth name json keywords }}\n\n";
        // const res = await axios.post("http://localhost:3000/graphql/", data);
        //let result: any = [];
        //const res = await axios.get(`https:/api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        const res = await axios.post("http://localhost:3000/graphql/", data)
            .then((res) => res.data.data.everyNode.filter((name: any) => {
                return name.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }));
        //setUsers(res.data.items)
        console.log("dispatching");
        console.log(res);
        // console.log(res.data.items);


        dispatch({
            type: SEARCH_NODES,
            payload: res
        });
    }

    //Get user
    // Searches for a siangle Github User
    // const getUser = async (username) =>{
    //   setLoading();

    //   const res = await axios.get(`https:/api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //   dispatch({
    //     type: GET_USER,
    //     payload: res.data
    //   });
    // }

    //Get repos
    // const getUserRepos = async (username) =>{
    //     setLoading();

    //     const res = await axios.get(`https:/api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //     dispatch({
    //         type: GET_REPOS,
    //         payload: res.data
    //     });
    //   }

    //Clear users
    // const clearUsers = () => dispatch({type: CLEAR_USERS});

    //Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <SearchContext.Provider
        //makes it available to the entire app
        value={{
            nodes: state.nodes,
            // user: state.user,
            // repos: state.repos,
            loading: state.loading,
            searchNodes,
            // clearUsers,
            // getUser,
            // getUserRepos
        }}
    >
        {props.children}
    </SearchContext.Provider>
}

export default SearchState;