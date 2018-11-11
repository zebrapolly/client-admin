import * as React from 'react';

import { connect } from 'react-redux';

import { Spin } from 'antd';
import { loadLogsClient, loadedLogsMessageClient } from 'src/redusers/clientLogs';
import { ClientLogs } from '../../types/ClientLogs.types';
import { ClientCallsTable } from '../ClientCallsTable/ClientCallsTable';
import { ClientMessagesTable } from '../ClientMessagesTable/ClientMessagesTable';
interface Props {
    calls: Array<ClientLogs.Call>
    messages: Array<ClientLogs.Message>
    isFetching: boolean
    loadLogsClient: () => any
    loadedLogsMessageClient: (record: Array<ClientLogs.Message>) => {}
}
class ClientTab extends React.Component<Props> {
    componentDidMount() {
      this.props.loadLogsClient();
      console.log('this.props.messages', this.props.messages)
    }
    render() {
      if (this.props.isFetching) {
        return <Spin className="spin"/>
      }
      console.log(this.props)
        return (
          <React.Fragment>

            <ClientCallsTable logs={this.props.calls} loadedLogsMessageClient={this.props.loadedLogsMessageClient}/>
            <ClientMessagesTable messages={this.props.messages} />
          </React.Fragment>
      )
    }
}


export default connect((state: ClientLogs.State) => state, {loadLogsClient, loadedLogsMessageClient})(ClientTab);