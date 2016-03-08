import {combineReducers} from 'redux';

import components from './components/reducers';
import common from './common/reducers';

const rootReducer = combineReducers({
    components,
    common,
});

export default rootReducer;
