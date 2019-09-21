import React, { useContext } from 'react';
// import axios from 'axios';
import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/es/table';
import SearchContext from "../../../Context/Search/searchContext";
import "./SearchResults.less";
import { Link } from 'react-router-dom';

const SearchResult = () => {
    const searchContext = useContext(SearchContext);
    const { loading, nodes } = searchContext;

    interface iNode {
        id: string,
        // parent: string[];
        // child: string[];
        depth: number;
        name: string;
        json: string;
        createdAt: Date;
    }

    const columns: ColumnProps<iNode>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={{
                pathname: 'learning',
                state: {
                    nodeID : record.id
                }
            }}>{text}</Link>
            // render: (text, record) => <Link to={'learning/' + record.id}>{text}</Link>
        },
        {
            title: 'Depth',
            dataIndex: 'depth',
            width: '10%',
            key: 'depth',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
    ];
    
    if (loading) {
        return (
            <div className='loading'>
                <Spin tip="Conducting node search..."  size="large" />
            </div>);
    } else {
        return (
            <div>
                <Table
                    rowKey={record => record.id} 
                    columns={columns} 
                    pagination={{ pageSize: 50 }} 
                    scroll={{ y: 600 }} 
                    dataSource={nodes} 
                />
            </div>
        );
    }


};

export default SearchResult;
