import * as React from 'react';

import { connect } from 'react-redux';

import { Spin, Table } from 'antd';
import { loadLogsClient, loadedLogsMessageClient } from 'src/actions';
import { ClientLogs } from '../types/ClientLogs.types';
import { ClientTable } from '../ClientTable/ClientTable';
interface Props {
    logs: Array<ClientLogs.Message>
    message: Array<ClientLogs.Record>
    isFetching: boolean
    loadLogsClient: () => any
    loadedLogsMessageClient: (record: Array<ClientLogs.Record>) => {}
}

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
class ClientTab extends React.Component<Props> {
    componentDidMount() {
      this.props.loadLogsClient();
      // console.log(this.props)
    }
    render() {
      if (this.props.isFetching) {
        return <Spin className="spin"/>
      }
      console.log(this.props)
        return (
          <React.Fragment>

            <ClientTable logs={this.props.logs} loadedLogsMessageClient={this.props.loadedLogsMessageClient}/>
            <Table size="small" dataSource={this.props.message} columns={columns}/>
          </React.Fragment>
      )
    }
}


export default connect((state: ClientLogs.State) => state, {loadLogsClient, loadedLogsMessageClient})(ClientTab);