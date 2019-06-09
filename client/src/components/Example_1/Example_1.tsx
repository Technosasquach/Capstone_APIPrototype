
import * as React from "react";
import 'antd/dist/antd.css';
import { Table } from 'antd';
import "./Example_1.less";


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'cate',
        key: 'cate',
        width: '15%',
    },
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        width:'60%',
    }
  ];
  
  const data = [
    {
      key: 1,
      name: 'Field 1',
      cate: 'Geographical',
      data: 'Longitude, Latitude',
      children: [
        {
          key: 11,
          name: 'Well 1',
          cate: 'Geographical',
          data: 'Longitude, Latitude',
        },
        {
          key: 12,
          name: 'Well 2',
          cate: 'Parameter',
          data: 'Initial Drill Date',
          children: [
            {
              key: 121,
              name: 'Downhole Equipment',
              cate: 'Parameter',
              data: 'Sensor Depth',
            },
          ],
        },
        {
          key: 13,
          name: 'Well 3',
          cate: 'Identification',
          data: 'Longitude, Latitude',
          children: [
            {
              key: 131,
              name: 'Surface Equipment',
              cate: 'Sensor data',
              data: 'RTU Comm Status',
              children: [
                {
                  key: 1311,
                  name: 'PCP',
                  cate: 'Sensor data',
                  data: 'Serial Number',
                },
                {
                  key: 1312,
                  name: 'PCP',
                  cate: 'Parameter',
                  data: 'Installation Date',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Field 2',
      cate: 'Identification',
      data: 'Field ID',
    },
  ];

export default class Dashboard extends React.Component<{},{resp: any}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="dashboardContainer">
                <h1 style={{textAlign: 'center'}}>PI Directory</h1>
                <hr/>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}