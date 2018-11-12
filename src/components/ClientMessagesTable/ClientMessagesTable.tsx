import * as React from 'react';
import { Table, Icon } from 'antd';
import { ClientLogs } from '../../types/ClientLogs.types';

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  width: 150,
  sorter: (a: ClientLogs.Message, b: ClientLogs.Message ) => {
    console.log('sorter', a ,b)
    if (a.date === b.date) {
      return b.logSeq - a.logSeq;
    }
    return b.date-a.date;
  },
  render: (date: number) =>  new Date(date).toISOString(),
}, {
  title: 'Direction',
  dataIndex: 'direction',
  key: 'direction',

  width: 70,
}, {
  title: 'Request',
  dataIndex: 'request',
  key: 'request',

  width: 70,
},
{
  title: 'IC',
  dataIndex: 'ic',
  key: 'ic',
  width: 40,
  render: (value: boolean) => {
    if (value) {
      return (<Icon type="info-circle" style={{ color:'red' }} theme="outlined"/>)
    }
    else 
      return;
  } 
},
{
  title: 'IS',
  dataIndex: 'is',
  key: 'os',
  width: 40,
  render: (value: boolean) => {
    if (value) {
      return (<Icon type="info-circle" style={{ color:'red' }} theme="outlined"/>)
    }
    else 
      return;
  } 
},
{
  title: 'I',
  dataIndex: 'newInstanceId',
  key: 'newInstanceId',
  width: 40,
  render: (value: boolean) => {
    if (value) {
      return (<Icon type="info-circle" style={{ color:'red' }} theme="outlined"/>)
    }
    else 
      return;
  } 
}
];


interface Props {
  messages: Array<ClientLogs.Message>
  separateHeight: number
  loadedLogsMessageClient: (record: ClientLogs.Message) => {}
}


export class ClientMessagesTable extends React.Component<Props> {

  onRow = (record: ClientLogs.Message) => {
    return {
      onClick: () => {
        this.props.loadedLogsMessageClient(record)
      },       // click row
    };
  }
  loadMore = () => {}
  render() {
    return (
        <Table bordered={true} useFixedHeader={true} pagination={false} onRow={this.onRow} scroll={{y: this.props.separateHeight - 45}} size="small" dataSource={this.props.messages} rowKey={'logSeq'} columns={columns} />
    )
  }
}