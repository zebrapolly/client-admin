import { combineReducers } from 'redux';

import clientLogs from './clientLogs';

const appReducer = combineReducers({
  clientLogs
});

export default appReducer;