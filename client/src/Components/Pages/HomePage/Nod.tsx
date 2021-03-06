import * as React from "react";
import "./Nod.less";
import 'antd/dist/antd.css';
import axios from 'axios'
import { useState, useEffect } from "react";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import Loader from './../../Utility/Loader';
const ReactMarkdown = require('react-markdown')
// import { Anchor } from 'antd';

// const { Link } = Anchor;

interface iContent {
    id: string;
    nodeId: string;
    data: string;
    type: string;
}

const Nod = () => {
    const [Content, setContent] = useState({ id: "", nodeId: "", data: "", type: "" } as iContent);
    const [Loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getData();
        setLoading(false);
        console.log(Content);
    }, [])


    const getData = async () => {
        return await axios({
            url: '/graphql/',
            method: 'post',
            data: {
                query: `
                query { informationRandom {
                        id
                        nodeId
                        data
                        type
                    }
                }`
            }
        }).then(res => {
            const nod: iContent = res.data.data.informationRandom;
            if (nod) {
                nod.data = nod.data.substring(0, 1000);
                setContent(nod);
            }
                        
            // setLoading(false);
        })
    }

    return (
        Loading ?
            <Loader />
            : <div className="Nod">
                <Typography.Title level={4}>Asset of the day!</Typography.Title>
                <hr/>
                <ReactMarkdown source={Content.data} />
                <Button type="primary"><Link to={"/learning/"+Content.nodeId}>Read more...</Link></Button>
            </div>
    )
}

export default Nod