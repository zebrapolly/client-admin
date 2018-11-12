import * as React from 'react';
import { Table } from 'antd';
import { ClientLogs } from '../../types/ClientLogs.types';

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  width: 150,
  render: (date: number) =>  new Date(date).toISOString(),
}, {
  title: 'Abonent Type',
  dataIndex: 'abonentType',
  key: 'abonentType',
  width: 100
}, {
  title: 'Abonent Contact',
  dataIndex: 'abonentContact',
  key: 'abonentContact',
  width: 100
},
{
  title: 'Call Id',
  dataIndex: 'callId',
  key: 'callId',
  width: 150
}
];


interface Props {
  loadedLogsCallClient: (record: Array<ClientLogs.Message>) => {}
  logs: Array<ClientLogs.Call>
  tableHeight: number
}


export class ClientCallsTable extends React.Component<Props> {

  onRow = (record: ClientLogs.Call) => {
    return {
      onClick: () => {
        this.props.loadedLogsCallClient(record.messageList)
        console.log(record)
      },       // click row
    };
  }

  render() {
    return (
        <Table size="small" pagination={false} scroll={{y: this.props.tableHeight- 40}} dataSource={this.props.logs} onRow={this.onRow} rowKey={'callId'} columns={columns} />
    )
  }
}