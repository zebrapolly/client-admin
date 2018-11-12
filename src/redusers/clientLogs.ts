// import { LOAD_LOGS_CLIENT, LOADED_LOGS_CLIENT } from 'src/actions';
// import * as request from 'superagent';
// import { ReduxState } from 'src/types';
import { ClientLogs } from '../types/ClientLogs.types';

export const LOAD_LOGS_CLIENT = 'LOAD_LOGS_CLIENT';
export const LOADED_LOGS_CLIENT = 'LOADED_LOGS_CLIENT';
export const LOADED_LOGS_CALL_CLIENT = 'LOADED_LOGS_CALL_CLIENT';
export const LOADED_LOGS_MESSAGE_CLIENT = 'LOADED_LOGS_MESSAGE_CLIENT';
export const TOGGLE_SEPARATE_CLIENT = 'TOGGLE_SEPARATE_CLIENT';
export const MESSAGE_DISABLE = 'MESSAGE_DISABLE';

const initialState: ClientLogs.State = {
        isFetching: false,
        isMessageVisible: false,
        isFetched: false,
        separateHeight: 200,
        tableHeight: 200,
        message: {},
        calls: [
            {
                date: 2342432,
                logSeq: 3434,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr1',
                messageList: [
                    {
                        direction: 'tete',
                        payload: {
                            
                        },
                        traceType: 'dfsfsf',
                        logSeq: 5435,
                        date: 2342432,
                        abonentType: 'Client',
                        abonentContract: 'test',
                        callId: 'dsfsedf345erewfr1',
                    }
                ]
            }
        ],
        messages: []
};

export default function clientLogs(state: ClientLogs.State = initialState, action: any) {
    console.log('reduser', action)
    switch (action.type) {
        case LOAD_LOGS_CLIENT: 
            return {
                ...state,
                isFetching: true
            }
        case LOADED_LOGS_CLIENT:
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                isMessageVisible: false,
                calls: action.calls
            }
        case LOADED_LOGS_CALL_CLIENT:
            return {
                ...state,
                isMessageVisible: false,
                messages: action.messages
            }
        case LOADED_LOGS_MESSAGE_CLIENT:
            return {
                ...state,
                isMessageVisible: true,
                message: action.message
            }
        case TOGGLE_SEPARATE_CLIENT:{
            return {
                ...state,
                separateHeight: action.separateHeight,
                tableHeight: action.tableHeight
            }
        }
        case MESSAGE_DISABLE:{
            return {
                ...state,
                isMessageVisible: false
            }
        }
        default: 
            return state;
    }
}




export function loadLogsClient(value: string) {
    return {
        type: LOAD_LOGS_CLIENT,
        value
    }
}

export function loadedLogsClient(calls: Array<ClientLogs.Call>) {
    console.log('loadedLogsClient', calls)
    return {
        type: LOADED_LOGS_CLIENT,
        calls
    }
}
export function loadedLogsCallClient(messages: Array<ClientLogs.Message>) {
    console.log('loadedLogsCallClient', messages)
    return {
        type: LOADED_LOGS_CALL_CLIENT,
        messages
    }
}
export function loadedLogsMessageClient(message: ClientLogs.Message) {
    console.log('loadedLogsMessageClient', message)
    return {
        type: LOADED_LOGS_MESSAGE_CLIENT,
        message: message.payload
    }
}
export function messageDisable() {
    console.log('messageDisable')
    return {
        type: MESSAGE_DISABLE,
    }
}
export function toggleSeparate(separateHeight: number, tableHeight: number) {
    console.log('toggleSeparate', tableHeight)
    return {
        type: TOGGLE_SEPARATE_CLIENT,
        separateHeight,
        tableHeight
    }
}