import { ClientLogs } from 'src/components/types/ClientLogs.types';

export const LOAD_LOGS_CLIENT = 'LOAD_LOGS_CLIENT';
export const LOADED_LOGS_CLIENT = 'LOADED_LOGS_CLIENT';
export const LOADED_LOGS_MESSAGE_CLIENT = 'LOADED_LOGS_MESSAGE_CLIENT';

export function loadLogsClient() {
    return {
        type: LOAD_LOGS_CLIENT
    }
}

export function loadedLogsClient(logs: Array<ClientLogs.Message>) {
    console.log('loadedLogsClient', logs)
    return {
        type: LOADED_LOGS_CLIENT,
        payload: logs
    }
}
export function loadedLogsMessageClient(logs: Array<ClientLogs.Record>) {
    console.log('loadedLogsMessageClient', logs)
    return {
        type: LOADED_LOGS_MESSAGE_CLIENT,
        message: logs
    }
}