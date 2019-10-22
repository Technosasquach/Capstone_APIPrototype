import * as React from "react";
import "./Nod.less";
import 'antd/dist/antd.css';
import axios from 'axios'
import { useState, useEffect } from "react";
import { Typography, Button } from "antd";
import Loader from './../../Utility/Loader';
const ReactMarkdown = require('react-markdown')
// import { Anchor } from 'antd';

// const { Link } = Anchor;

interface iContent {
    id: string;
    nodeID: string;
    data: string;
}

const Nod = () => {
    const [Content, setContent] = useState({ id: "", nodeID: "", data: "" } as iContent);
    const [Loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getData();
    }, [])


    const getData = async () => {
        return await axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                query { informationRandom {
                        id
                        nodeId
                        data
                    }
                  }`
            }
        }).then(res => {
            const nod: iContent = res.data.data.informationRandom;
            if (nod) {
                nod.data = nod.data.substring(0, 1000);
                setContent(nod);
            }
            setLoading(false);
        })
    }

    return (
        Loading ?
            <Loader />
            : <div className="Nod">
                <Typography.Title level={4}>Asset of the day!</Typography.Title>
                <ReactMarkdown source={Content.data} />
                <Button type="link" title="Read more..."/>
            </div>
    )
}

export default Nod