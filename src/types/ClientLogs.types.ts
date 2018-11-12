import { Timestamp } from 'src/types';

// enum AbonentType {
//     CLIENT = 'Client',
//     SERVER = 'Server'
// }

export enum RequestType {
    JOIN = 'JOIN',
    DISPOSE = 'DISPOSE',
    ACK = 'ACK'
}
export enum Direction {
    OUTBOUND = 'OUTBOUND',
    INBOUND = 'INBOUND'
}


export namespace ClientLogs {
    export type State = {
        isFetched: boolean;
        isFetching: boolean;
        separateHeight: number;
        tableHeight: number
        calls: Array<Call>
        messages: Array<Message>
        message: any
    }
    export type Raw = {
        date: Timestamp
        direction: Direction,
        traceType: string
        message: string
        logSeq: number
        payload: any
    }
    export type Call = {
        date: Timestamp
        logSeq: number
        abonentType: string,
        abonentContract?: string,
        callId: string
        messageList: Array<Message>
    }
    export type Message = {
        date: Timestamp
        logSeq: number
        direction?: string
        traceType?: string
        payload: any
        request?: RequestType
        abonentType?: string,
        abonentContract?: string,
        callId: string
    }
}