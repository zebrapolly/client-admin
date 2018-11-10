// import { LOAD_LOGS_CLIENT, LOADED_LOGS_CLIENT } from 'src/actions';
// import * as request from 'superagent';
// import { ReduxState } from 'src/types';
import { ClientLogs } from 'src/components/types/ClientLogs.types';

const initialState: ClientLogs.State = {
        isFetching: false,
        isFetched: false,
        logs: [
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
        message: []
};

export default function reduser(state: ClientLogs.State = initialState, action: any) {
    console.log('reduser', action)
    switch (action.type) {
        case "LOAD_LOGS_CLIENT": 
            return {
                ...state,
                isFetching: true
            }
        case "LOADED_LOGS_CLIENT":
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                logs: action.payload
            }
        case "LOADED_LOGS_MESSAGE_CLIENT":
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                message: action.message
            }
            default: return state;
    }
}