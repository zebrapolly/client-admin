import * as go from 'gojs';
import * as React from 'react';
import { GojsDiagram, ModelChangeEvent } from 'react-gojs';
import { Diagram } from 'gojs';
import './ClientSeqenceDiagram.css'
// const Diagram = go.GojsDiagram;

const model = {
    nodeDataArray: [
        { key: 'Alpha', color: 'lightblue' },
        { key: 'Beta', color: 'orange' },
        { key: 'Gamma', color: 'lightgreen' },
        { key: 'Delta', color: 'pink' },
        { key: 'Omega', color: 'grey' }
    ],
    linkDataArray: [
        { from: 'Alpha', to: 'Beta' },
        { from: 'Alpha', to: 'Gamma' },
        { from: 'Beta', to: 'Delta' },
        { from: 'Gamma', to: 'Omega' }
    ]
};

// interface Props {
//     model: {
//         [key: string]: {

//         } 
//     }
// }

// const model ={ 
//     "class": "go.GraphLinksModel",
//     "nodeDataArray": [
//         {"key":"Fred", "text":"Fred1: Patron", "isGroup":true, "loc":"0 0", "duration":9},
//         {"key":"Bob", "text":"Bob: Waiter", "isGroup":true, "loc":"100 0", "duration":9},
//         {"key":"Hank", "text":"Hank: Cook", "isGroup":true, "loc":"200 0", "duration":9},
//         {"key":"Renee", "text":"Renee: Cashier", "isGroup":true, "loc":"300 0", "duration":9},
//         {"group":"Bob", "start":1, "duration":2},
//         {"group":"Hank", "start":2, "duration":3},
//         {"group":"Fred", "start":3, "duration":1},
//         {"group":"Bob", "start":5, "duration":1},
//         {"group":"Fred", "start":6, "duration":2},
//         {"group":"Renee", "start":8, "duration":1}
//     ],
// "linkDataArray": [
// {"from":"Fred", "to":"Bob", "text":"order", "time":1},
// {"from":"Bob", "to":"Hank", "text":"order food", "time":2},
// {"from":"Bob", "to":"Fred", "text":"serve drinks", "time":3},
// {"from":"Hank", "to":"Bob", "text":"finish cooking", "time":5},
// {"from":"Bob", "to":"Fred", "text":"serve food", "time":6},
// {"from":"Fred", "to":"Renee", "text":"pay", "time":8}
// ]}

export class ClientSeqenceDiagram extends React.Component {
    createDiagram = (diagramId: string): Diagram => {
        const $ = go.GraphObject.make;
    
        const myDiagram: go.Diagram = $(Diagram, diagramId, {
            initialContentAlignment: go.Spot.Center
        });
    
        myDiagram.addChangedListener((e) => {
            console.log(e)
        })
        myDiagram.commandHandler.archetypeGroupData =
        { key: "Group", isGroup: true, color: "blue" };

        myDiagram.undoManager.isEnabled = true;
        myDiagram.model = $(
            go.Node,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
        );
        myDiagram.model.isReadOnly = true;
        myDiagram.nodeTemplate.isEnabled = false;
        myDiagram.nodeTemplate.canEdit = () => false;
        return myDiagram;
    };
    modelChangeHandler = (e: ModelChangeEvent<{ key: string; color: string;}, { from: string; to: string; }>) => {
        console.log(e)
    }
    render() {
        return <GojsDiagram model={model}  createDiagram={this.createDiagram} diagramId="myDiagramDiv" className="myDiagram" onModelChange={this.modelChangeHandler}/>
    }
}

