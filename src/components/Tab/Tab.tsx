import * as React from 'react';
//@ts-ignore
import { Tabs } from 'antd';
import ClientTab from '../ClientTab/ClientTab';
import './Tab.css';
 
// import { ClientLogs } from '../types/ClientLogs.types';

// interface Props {
//     children: React.ReactNode;
//     clientsLogs: any,
//     loadLogsClient: any
//   }
// interface Props {
//     children?: React.ReactElement<any>;
//     clientLogs: Array<ClientLogs.ClientLog>
// }

const TabPane = Tabs.TabPane;

class Tab extends React.Component<any, any>  {
    render(): JSX.Element {
        return (
            <Tabs defaultActiveKey="1" className="clientTab">
                <TabPane tab="Client" key="1"><ClientTab {...this.props} /></TabPane>
                {/* <TabPane tab="Client" key="1"><SplitterLayout vertical="true" primaryIndex={1} secondaryInitialSize={250}><ClientTab {...this.props} /><ClientTab {...this.props} /></SplitterLayout></TabPane> */}
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
      )

    }
}

export default Tab;