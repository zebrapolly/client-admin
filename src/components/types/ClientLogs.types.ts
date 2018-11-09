import { Timestamp } from 'src/types';

// enum AbonentType {
//     CLIENT = 'Client',
//     SERVER = 'Server'
// }

export namespace ClientLogs {
    export type State = {
        isFetched: boolean;
        isFetching: boolean;
        logs: Array<ClientLog>
    }
    export type ClientLog = {
        date: Timestamp
        abonentType: string,
        abonentContract: string,
        callId: string
    }
}