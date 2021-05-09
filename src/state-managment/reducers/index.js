import {combineReducers} from "redux";
import languageReducer from "./languageReducer.js";
import loanReducer from "./loanReducer.js";
import inputReducer from "./inputReducer.js";

export default combineReducers({
    language: languageReducer,
    loan: loanReducer,
    input: inputReducer,
});
