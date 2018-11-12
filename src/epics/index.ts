import { ajax } from 'rxjs/ajax';
import { map, flatMap, switchMap, toArray, filter, groupBy } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { loadedLogsClient } from 'src/redusers/clientLogs';
import { ClientLogs, Direction } from '../types/ClientLogs.types'


const loadClientLogsEpic = (action$: any): any => {
    console.log('action$', action$);

    return action$
    .pipe(
        ofType('LOAD_LOGS_CLIENT'),
        switchMap(({value}) => {
            console.log(action$);
            let url = 'http://127.0.0.1:8084/admin/api/log/client';
            if (value) {
                url += `?payload=${value}`
            }
            console.log('url', url)
            return ajax.getJSON(url).pipe(
            flatMap((list: ClientLogs.Raw[]) => list),
            map((item: ClientLogs.Raw) => {
                // console.log('i   tem', item)
                let payload;
                if (item.message) {
                    payload = JSON.parse(item.message);
                }
                return {
                    ...item,
                    callId: payload.callId,
                    request: payload.request,
                    payload,
                }
            }),
            filter((item: ClientLogs.Message) => item.callId !== undefined),
            groupBy((item: ClientLogs.Message) => item.callId),
            flatMap(messageList => messageList.pipe(
                map((model: ClientLogs.Message)=> {
                    const direction = (model.direction === Direction.INBOUND )? "Client" : "Server";
                    const iceCount = model.payload.ice ? model.payload.ice.length == 0 ? null : model.payload.ice.length : null;
                    return {
                        ...model,
                        direction,
                        stateId: model.payload.stateId,
                        ic: model.direction == Direction.INBOUND ? iceCount : null,
                        is: model.direction == Direction.OUTBOUND  ? iceCount : null,
                        newInstanceId : false,
                        newPeerConnectionId : false,
                        newSdpId : false,
                    }
                }),
                toArray(),
                map(list => {
                    const res: Array<ClientLogs.Message> = [];
                    let newInstanceId = false;
                    let newPeerConnectionId = false;
                    let newSdpId = false;
                    list.sort((a ,b) => +a.logSeq - +b.logSeq)
                    for (let i = 0; i < list.length; i++) {
                        const newItem: any = {};
                        if ((list[i].newInstanceId !== undefined) && (list[i].newInstanceId !== newInstanceId)) {
                            newItem.newTransaction = true;
                        }
                        if ((list[i].newInstanceId !== undefined) && list[i].newInstanceId !== newInstanceId) {
                            newInstanceId = list[i].newInstanceId;
                        }

                        if ((list[i].newPeerConnectionId !== undefined) && (list[i].newPeerConnectionId !== newPeerConnectionId)) {
                            newItem.newPeerConnectionId = true;
                        }
                        if ((list[i].newPeerConnectionId !== undefined) && list[i].newPeerConnectionId !== newPeerConnectionId) {
                            newPeerConnectionId = list[i].newPeerConnectionId;
                        }

                        if ((list[i].newSdpId !== undefined) && (list[i].newSdpId !== newSdpId)) {
                            newItem.newSdpId = true;
                        }
                        if ((list[i].newSdpId !== undefined) && list[i].newSdpId !== newSdpId) {
                            newSdpId = list[i].newSdpId;
                        }
                        res.push({...list[i], ...newItem});
                    }
                    return res;
                }),
                map (messageListModel => {
                    let abonentContact = null;
                    let abonentType = null
                    for (let i = 0; i< messageListModel.length; i++) {
                        if (messageListModel[i].payload.abonent) {
                            abonentContact = messageListModel[i].payload.abonent.contact;
                            abonentType = messageListModel[i].payload.abonent.type;
                            break;
                        }
                    }
                    return {
                        callId: messageList.key,
                        date: messageListModel[0].date,
                        abonentContact,
                        abonentType,
                        messageList: messageListModel
                    }
                })
            )),
            toArray(),
            map((list: Array<any>) => loadedLogsClient(list))

            // map((list: ClientLogs.Message[]) => loadedLogsClient(list))


                    // flatMap((list: Observable<ClientLogs.ClientLog[]>) => list.pipe(
                    //         map(model => {
                    //             console.log('model', model)
                    //             return {
                                    
                    //             }
                    //         })
                    //     )
                    // map((list: ClientLogs.ClientLog[]) => {
                    //     console.log('item', list)
                    //     // return loadedLogsClient(list)
                    // }),
                    
                    )
        })
        // ignoreElements()
        // )
    )
    // .subscribe((item:any) => console.log(item));

}

export const rootEpic = combineEpics(loadClientLogsEpic)