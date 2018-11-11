// import { LOAD_LOGS_CLIENT, LOADED_LOGS_CLIENT } from 'src/actions';
// import * as request from 'superagent';
// import { ReduxState } from 'src/types';
import { ClientLogs } from '../types/ClientLogs.types';

export const LOAD_LOGS_CLIENT = 'LOAD_LOGS_CLIENT';
export const LOADED_LOGS_CLIENT = 'LOADED_LOGS_CLIENT';
export const LOADED_LOGS_MESSAGE_CLIENT = 'LOADED_LOGS_MESSAGE_CLIENT';

const initialState: ClientLogs.State = {
        isFetching: false,
        isFetched: false,
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
                calls: action.calls
            }
        case LOADED_LOGS_MESSAGE_CLIENT:
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                messages: action.messages
            }
        default: 
            return state;
    }
}




export function loadLogsClient() {
    return {
        type: LOAD_LOGS_CLIENT
    }
}

export function loadedLogsClient(calls: Array<ClientLogs.Call>) {
    console.log('loadedLogsClient', calls)
    return {
        type: LOADED_LOGS_CLIENT,
        calls
    }
}
export function loadedLogsMessageClient(messages: Array<ClientLogs.Message>) {
    console.log('loadedLogsMessageClient', messages)
    return {
        type: LOADED_LOGS_MESSAGE_CLIENT,
        messages
    }
}