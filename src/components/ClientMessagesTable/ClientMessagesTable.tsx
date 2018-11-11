import * as React from 'react';
import { Table, Icon } from 'antd';
import { ClientLogs } from '../../types/ClientLogs.types';

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  render: (date: number) =>  new Date(date).toISOString(),
}, {
  title: 'Direction',
  dataIndex: 'direction',
  key: 'direction',
}, {
  title: 'Request',
  dataIndex: 'request',
  key: 'request',
},
{
  title: 'State Id',
  dataIndex: 'stateId',
  key: 'stateId'
},
{
  title: 'IC',
  dataIndex: 'ic',
  key: 'ic',
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
}


export class ClientMessagesTable extends React.Component<Props> {

  render() {
    return (
      <Table size="small" dataSource={this.props.messages} rowKey={'date'} columns={columns} />
    )
  }
}