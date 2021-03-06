import * as React from 'react';
import { Table, Icon } from 'antd';
import { ClientLogs } from '../../types/ClientLogs.types';
import { Resizable } from 'react-resizable';
import './ClientMessagesTable.css'

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  width: 250,
  sorter: (a: ClientLogs.Message, b: ClientLogs.Message ) => {
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
  minConstraints: [40,40],
  width: 80,
}, {
  title: 'Request',
  dataIndex: 'request',
  key: 'request',
  minConstraints: [35,35],
  width: 80,
},
{
  title: 'IC',
  dataIndex: 'ic',
  key: 'ic',
  width: 40,
  minConstraints: [30, 20],
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
  minConstraints: [30, 20],
  render: (value: boolean) => {
    if (value) {
      return (<Icon type="info-circle" style={{ color:'red', textAlign: 'center' }} theme="outlined"/>)
    }
    else 
      return;
  } 
},
{
  title: 'I',
  dataIndex: 'newInstanceId',
  key: 'newInstanceId',
  // width: 40,
  minConstraints: [30, 20],
  render: (value: boolean) => {
    if (value) {
      return (<Icon type="info-circle" style={{ color:'red' }} theme="outlined"/>)
    }
    else 
      return;
  } 
}
];

const ResizeableTitle = (props: any) => {
  const { onResizeStop, width, minConstraints, ...restProps } = props;
  console.log('minConstraints', minConstraints)
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} minConstraints={minConstraints} height={0} onResize={onResizeStop}>
      <th {...restProps} />
    </Resizable>
  );
};
interface Props {
  messages: Array<ClientLogs.Message>
  separateHeight: number
  loadedLogsMessageClient: (record: ClientLogs.Message) => {}
}


export class ClientMessagesTable extends React.Component<Props> {
  state = {
    columns,
    width: 530
  }
  handleResize = (index: number) => (e:any, p:any) => {
    this.setState((state: any) => {
      console.log(p);
      
      
      const nextColumns = [...state.columns];
      state.width = state.width + p.size.width - nextColumns[index].width
      nextColumns[index] = {
        ...nextColumns[index],
        width: p.size.width,
      };
      return { columns: nextColumns };
    });
  };
  onRow = (record: ClientLogs.Message) => {
    return {
      onClick: () => {
        this.props.loadedLogsMessageClient(record)
      },       // click row
    };
  }
  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  onResizeTable = (e:any, p:any) => {
    this.setState((state: any) => {
      return {
        ...state,
        width: p.size.width,
      }
    })
  }
  render() {
    const cols = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResizeStop: this.handleResize(index),
        minConstraints: column.minConstraints
      }),
    }));

    return (
      <Resizable width={this.state.width} height={this.props.separateHeight} onResize={this.onResizeTable}>
        <div style={{width: this.state.width}}>
          <Table  bordered={true} useFixedHeader={true} style={{width: this.state.width}} pagination={false} onRow={this.onRow} scroll={{x: this.state.width, y: this.props.separateHeight - 45}} size="small" dataSource={this.props.messages} rowKey={'logSeq'} columns={cols} components={this.components}/>          
        </div>
      </Resizable>
    )
  }
}


