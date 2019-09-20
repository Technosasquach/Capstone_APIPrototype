import React, {useContext} from 'react';
// import axios from 'axios';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import SearchContext from "../../../Context/Search/searchContext";




// const columns: ColumnProps<iNode>[] = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Depth',
//         dataIndex: 'depth',
//         width: '10%',
//         key: 'depth',
//     },
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//         width: '20%',
//     },
// ];


// interface iNode {
//     id: string,
//     createdAt: Date,
//     depth: Number,
//     name: string,
//     json: string,
//     keywords: string[],
// }


// interface iProps {
//     searchText: string;
// };

// interface iState {
//     searchText: string;
//     myNodes: iNode[];
//     loading: boolean;
// };

// export default class SearchResult extends React.Component<iProps, iState> {
//     constructor(props: iProps) {
//         super(props);
//         console.log("ctor SearchResult page");
//         console.log(props);
//         this.state = {
//             searchText: "A",
//             myNodes: [],
//             loading: true
//         }

//     }
//     public static defaultProps = {
//         searchText: "C"
//     }
    

//     componentDidMount() {
//         console.log("mounted: running GraphQL query");
//         this.loadNodeData();
//         this.setState({ loading: false });
//         console.log(this.state.myNodes);
        
//     }



//     loadNodeData = async () => {
//         console.log(this.state.searchText);
//         this.setState({ loading: true });

//         let data: any = {};
//         data['query'] = "query{everyNode{ id createdAt depth name json keywords }}\n\n";
//         // const res = await axios.post("http://localhost:3000/graphql/", data);
//         let result: any = [];
//         if (this.props.searchText != '') {
//             // reult = await axios.post("http://localhost:3000/graphql/", data).then(function (response) {
//             //     const res = response.data.data.everyNode.filter((name: any) => {
//             //         return name.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
//             //     })
//             result = await axios.post("http://localhost:3000/graphql/", data)
//                 .then((res) => res.data.data.everyNode.filter((name: any) => {
//                     return name.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) >= 0
//                 }));
//         } else {
//             result = await axios.post("http://localhost:3000/graphql/", data).then(res => this.setState({
//                 myNodes: res.data['data']['node']
//             }));
//             //setPosts(res.data.data.everyNode);

//             // console.log("res.data.data.everyNode");
//             // console.log(res.data.data.everyNode);
//             // console.log(posts);
//         }
//         this.setState({ myNodes: result });
//         //return
//     }


//     render() {
//         return (

//             <div className='container mt-5'>
//                 {this.state.loading ? (<p>Loading...</p>) : (
//                     <Table rowKey={record => record.id} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 600 }} dataSource={this.state.myNodes} />
//                 )}
//             </div>
//         )
//     }
// }
//----------------------------------------------------------------------------

const SearchResult = () => {
    const searchContext = useContext(SearchContext);
    const {loading, nodes} = searchContext;


    


    // useEffect(() => {

    //     const queryAllNodes = async (searchText: string) => {
    //         console.log(searchText);

    //         setLoading(true);
    //         let data: any = {};
    //         data['query'] = "query{everyNode{ id createdAt depth name json keywords }}\n\n";
    //         // const res = await axios.post("http://localhost:3000/graphql/", data);

    //         if (searchText != '') {
    //             await axios.post("http://localhost:3000/graphql/", data).then(function (response) {
    //                 const res = response.data.data.everyNode.filter((name: any) => {
    //                     return name.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    //                 })
    //                 setPosts(res);

    //                 console.log("res");
    //                 console.log(res);
    //                 console.log(posts);

    //             });
    //         } else {
    //             const res = await axios.post("http://localhost:3000/graphql/", data);
    //             setPosts(res.data.data.everyNode);

    //             console.log("res.data.data.everyNode");
    //             console.log(res.data.data.everyNode);
    //             console.log(posts);
    //         }



    //         //console.log(typeof (res.data.data.everyNode));

    //         //setPosts(res.data.data.everyNode);
    //         setLoading(false);
    //         console.log(posts);
    //     }
    //     setSearchText("D");
    //     queryAllNodes(searchText);


    // }, []);


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




    return (
        <div className='container mt-5'>
            {loading ? (<p>Loading...</p>) : (
                <Table rowKey={record => record.id} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 600 }} dataSource={nodes} />
            )}
        </div>
    );
};

export default SearchResult;


