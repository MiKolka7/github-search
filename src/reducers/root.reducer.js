import { combineReducers } from 'redux';

import app from './app.reducer';
import user from './user.reducer';
import github from './github.reducer';

const rootReducer = combineReducers({
    app,
    user,
    github
});

export default rootReducer;
