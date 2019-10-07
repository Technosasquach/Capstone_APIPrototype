import {
    SEARCH_NODES,
    SET_LOADING,
    SEARCH_COURSES,
    // CLEAR_USERS,
    // GET_USER,
    // GET_REPOS
} from '../types';

export default (state : any, action : any) => {
    switch(action.type){
        case SEARCH_NODES:
            return{
                ...state,
                nodes: action.payload,
            }
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case SEARCH_COURSES:
            return{
                ...state,
                courses: action.payload,
                loading: false
            }
        // case CLEAR_USERS:
        //     return{
        //         ...state,
        //         users: [],
        //         loading: false
        //     }
        // case GET_USER:
        //     return{
        //         ...state,
        //         user: action.payload,
        //         loading: false
        //     }
        // case GET_REPOS:
        //     return{
        //         ...state,
        //         repos: action.payload,
        //         loading: false
        //     }
        default:
            return state;
    }
}