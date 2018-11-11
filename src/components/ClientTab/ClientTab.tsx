import * as React from 'react';

import { connect } from 'react-redux';

import { Spin } from 'antd';
//@ts-ignore
import SplitterLayout from 'react-splitter-layout';

import { loadLogsClient, loadedLogsMessageClient, toggleSeparate } from 'src/redusers/clientLogs';
import { ClientLogs } from '../../types/ClientLogs.types';
import { ClientCallsTable } from '../ClientCallsTable/ClientCallsTable';
import { ClientMessagesTable } from '../ClientMessagesTable/ClientMessagesTable';
interface Props {
    calls: Array<ClientLogs.Call>
    messages: Array<ClientLogs.Message>
    isFetching: boolean
    separateHeight: number
    tableHeight: number
    toggleSeparate: (separateHeight: number, tableHeight: number) => {} 
    loadLogsClient: () => any
    loadedLogsMessageClient: (record: Array<ClientLogs.Message>) => {}
}
class ClientTab extends React.Component<Props> {
  separateHeight:number
  componentDidMount() {
    this.props.loadLogsClient();
    console.log('this.props', this.props)
  }
  // onDragStart = (event:any) => {console.log('onDragStart')};
  onDragEnd = () => this.props.toggleSeparate(this.separateHeight, window.innerHeight - this.separateHeight);
  onSecondaryPaneSizeChange = (event: number) => this.separateHeight = event;
  render() {

    if (this.props.isFetching) {
      return <Spin className="spin"/>
    }

      return (
        // <React.Fragment>
        <SplitterLayout 
          vertical={true} 
          // percentage={true}
          // onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onSecondaryPaneSizeChange={this.onSecondaryPaneSizeChange}
        > 
          <ClientCallsTable 
            tableHeight={this.props.tableHeight}
            logs={this.props.calls}
            loadedLogsMessageClient={this.props.loadedLogsMessageClient}
          />
          <ClientMessagesTable separateHeight={this.props.separateHeight} messages={this.props.messages} />
        </SplitterLayout>
        // </React.Fragment>
    )
  }
}


export default connect((state: ClientLogs.State) => state, {loadLogsClient, loadedLogsMessageClient, toggleSeparate})(ClientTab);