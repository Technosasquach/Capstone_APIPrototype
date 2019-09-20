import React, { useState, useContext } from 'react';
import SearchContext from "../../../Context/Search/searchContext";
import "./SearchBar.less";
import { Input, Button, Form } from 'antd';
// import { Redirect } from 'react-router-dom';

const SearchBar = () => {
    const searchContext = useContext(SearchContext);

    const [text, setText] = useState('');
    //const [redirect, setRedirect] = useState(false);

    const onSubmit = (e: any) => {
        //stops it from submitting to a file                    
        e.preventDefault();

        // prevents null search
        if (text === '') {
            // alertContext.setAlert('Please enter something...', 'light');
        } else {
            //passes the text up to the app level
            searchContext.searchNodes(text);

            setText('');
            //setRedirect(true);
        }

    };

    //Since its only one expression the function can be simplified
    const onChange = (e: any) => setText(e.target.value);


        return (

            <div className="searcharea">
                <Form layout="inline" className="form" onSubmit={onSubmit}>
    
                    <Input placeholder="Search" value={text} onChange={onChange} />
                    <Button type="primary" shape="circle" icon="search" onClick={onSubmit} />
    
                </Form>
            </div>
    
        )
      
    
}


export default SearchBar