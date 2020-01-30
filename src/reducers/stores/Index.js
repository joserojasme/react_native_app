import TermsAndConditionsStore from './TermsAndConditionsStore';
import Utils from './Utils';
import QuotesStore from './QuotesStore';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    TermsAndConditionsStore,
    Utils,
    QuotesStore
})

export default rootReducer;