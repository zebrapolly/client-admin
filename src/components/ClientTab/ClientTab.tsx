import * as React from 'react';

import { connect } from 'react-redux';

import { Spin, Input } from 'antd';
const Search = Input.Search;
//@ts-ignore
import SplitterLayout from 'react-splitter-layout';

import { loadLogsClient, loadedLogsCallClient, toggleSeparate, loadedLogsMessageClient, messageDisable } from 'src/redusers/clientLogs';
import { ClientLogs } from '../../types/ClientLogs.types';
import { ClientCallsTable } from '../ClientCallsTable/ClientCallsTable';
import { ClientMessagesTable } from '../ClientMessagesTable/ClientMessagesTable';
import { ClientSeqenceDiagram } from '../ClientSeqenceDiagram/ClientSeqenceDiagram';
// import { ClientSeqenceDiagram } from '../ClientSeqenceDiagram/ClientSeqenceDiagram';
interface Props {
    calls: Array<ClientLogs.Call>
    messages: Array<ClientLogs.Message>
    message: any
    isFetching: boolean
    separateHeight: number
    tableHeight: number
    isMessageVisible: boolean
    toggleSeparate: (separateHeight: number, tableHeight: number) => {} 
    loadLogsClient: (value?: string) => any
    loadedLogsCallClient: (record: Array<ClientLogs.Message>) => {}
    loadedLogsMessageClient: (record: ClientLogs.Message) => {}
    messageDisable: () => {}
}
class ClientTab extends React.Component<Props> {
  separateHeight:number
  componentDidMount() {
    //@ts-ignore
    this.props.toggleSeparate(this.separateHeight, window.innerHeight - this.separateHeight);
    this.props.loadLogsClient();
  }
  onDragEnd = () => this.props.toggleSeparate(this.separateHeight, window.innerHeight - this.separateHeight);
  onSecondaryPaneSizeChange = (event: number) => this.separateHeight = event;
  onSearch = (value: string) => this.props.loadLogsClient(value);
  messageDisableHandle = () => this.props.messageDisable();
  render() {
  
    if (this.props.isFetching) {
      return <Spin className="spin"/>
    }

      return (
        <React.Fragment>
          <Search
            placeholder=""
            onSearch={this.onSearch}
            style={{ width: 200, paddingLeft: 15, marginBottom: 15 }}
          />
        <SplitterLayout 
          vertical={true} 
          primaryIndex={1}
          // percentage={true}
          // onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onSecondaryPaneSizeChange={this.onSecondaryPaneSizeChange}
        > 
          <ClientCallsTable 
            tableHeight={this.props.separateHeight}
            logs={this.props.calls}
            loadedLogsCallClient={this.props.loadedLogsCallClient}
          />
          <SplitterLayout>            
            <ClientMessagesTable loadedLogsMessageClient={this.props.loadedLogsMessageClient} separateHeight={this.props.tableHeight} messages={this.props.messages} />
            <ClientSeqenceDiagram/>

            {/* {this.props.isMessageVisible && <div><Button icon="caret-right" onClick={this.messageDisableHandle}/>>{JSON.stringify(this.props.message, null, 4)}</div>} */}
          </SplitterLayout>
        </SplitterLayout>
        </React.Fragment>
    )
  }
}


export default connect((state: ClientLogs.State) => state, {loadLogsClient, loadedLogsMessageClient, loadedLogsCallClient, toggleSeparate, messageDisable})(ClientTab);