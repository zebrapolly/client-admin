import * as React from 'react';
import { Table } from 'antd';
import { ClientLogs } from '../../types/ClientLogs.types';

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  render: (date: number) =>  new Date(date).toISOString(),
}, {
  title: 'Abonent Type',
  dataIndex: 'abonentType',
  key: 'abonentType',
}, {
  title: 'Abonent Contact',
  dataIndex: 'abonentContact',
  key: 'abonentContact',
},
{
  title: 'Call Id',
  dataIndex: 'callId',
  key: 'callId'
}
];


interface Props {
  loadedLogsMessageClient: (record: Array<ClientLogs.Record>) => {}
  logs: Array<ClientLogs.Message>
}


export class ClientTable extends React.Component<Props> {
  onRow = (record: ClientLogs.Message) => {
    return {
      onClick: () => {
        this.props.loadedLogsMessageClient(record.messageList)
        console.log(record)
      },       // click row
    };
  }

  render() {
    return (
      <Table dataSource={this.props.logs} onRow={this.onRow} rowKey={'callId'} columns={columns} />
    )
  }
}