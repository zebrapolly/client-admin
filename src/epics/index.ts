import { ajax } from 'rxjs/ajax';
import { mergeMap, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { loadedLogsClient } from 'src/actions';
import { ClientLogs } from 'src/components/types/ClientLogs.types';
// import reduser from 'src/redusers/ClientLogs';

const loadClientLogsEpic = (action$: any): any => {
    console.log('action', action$);
    return action$
    .pipe(
        ofType('LOAD_LOGS_CLIENT'),
        mergeMap(() => ajax.getJSON('http://127.0.0.1:8084/admin/api/log/client').pipe(
                    map((item: ClientLogs.ClientLog[]) => {
                        console.log('item', item)
                        return loadedLogsClient(item)
                    }),
            )
        ),
        // ignoreElements()
    )
    // .subscribe((item:any) => console.log(item));

}

export const rootEpic = combineEpics(loadClientLogsEpic)