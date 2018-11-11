import { ClientLogs } from './types/ClientLogs.types';

export type Timestamp = number;

export interface ReduxState {
    type: string
    clientLogs: ClientLogs.State;
}

export interface Action {
    type: string;
    payload?: {};
    params?: {};
  }