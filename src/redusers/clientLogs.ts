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
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr1'
            },
            {
                date: 2342432,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr2'
            },
            {
                date: 2342432,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr3'
            },
            {
                date: 2342432,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr4'
            },
            {
                date: 2342432,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr5'
            },
            {
                date: 2342432,
                abonentType: 'Client',
                abonentContract: 'test',
                callId: 'dsfsedf345erewfr6'
            }
        ]
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
            default: return state;
    }
}