import {UPDATE_LANGUAGE} from "../reducers/states.js";
import {Settings} from "../../util/Settings.js";

export function setLanguage(newLanguage) {
    return async function (dispatch) {
        await Settings.set('language', newLanguage);
        return dispatch({
            type: UPDATE_LANGUAGE,
            payload: newLanguage
        });
    };
}
