import * as React from 'react';

import { connect } from 'react-redux';

import { Table } from 'antd';
import { Spin } from 'antd';
import { loadLogsClient } from 'src/actions';
// import { ReduxState } from 'src/types';
import { ClientLogs } from '../types/ClientLogs.types';

const columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'Abonent Type',
    dataIndex: 'abonentType',
    key: 'abonentType',
  }, {
    title: 'Abonent Contract',
    dataIndex: 'abonentContract',
    key: 'abonentContract',
  },
  {
    title: 'Call Id',
    dataIndex: 'callId',
    key: 'callId'
  }
];

interface Props {
    logs: Array<ClientLogs.ClientLog>
    isFetching: boolean
    loadLogsClient: () => any
}

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
            <Table dataSource={this.props.logs} rowKey={'callId'} columns={columns} />
      )
    }
}


export default connect((state: ClientLogs.State) => state, {loadLogsClient})(ClientTab);