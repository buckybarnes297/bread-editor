import { combineReducers } from "redux";
import FAQ_Reducer from "./reducers/faqred";
import PAGE_Reducer from "./reducers/pagered";
import COUNTRY_Reducer from "./reducers/countryred"
const rootReducer=combineReducers({
    FAQ_Reducer,
    PAGE_Reducer,
    COUNTRY_Reducer
})
export default rootReducer;